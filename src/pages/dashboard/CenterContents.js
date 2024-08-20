import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import SalesChart from "../../components/dashboard/SalesChart";
import Feeds from "../../components/dashboard/Feeds";
import ProjectTables from "../../components/dashboard/ProjectTable";
import TopCards from "../../components/dashboard/TopCards";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { styled } from "styled-components";
import axios from "axios";
import PaginationFooter from "../../components/common/PaginationFooter";
import { useAtom } from "jotai";
import { PaginationData } from "../../data/atom";
import TableCell from "../../components/dashboard/TableCell";
import searchBtn from "../../assets/images/Component 110.png";
import closeBtn from "../../assets/images/close-fill@2x.png";
import excelSampleFile from "../../assets/sample/excel_sample.xlsx";
import UploadLoadModal from "../modal/UploadLoadModal";
import { useNavigate } from "react-router-dom";
import questionIcon from "../../assets/images/questionIcon.png";

const CenterContents = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const sessionStorage = window.sessionStorage;
  const [rankingList, setRankingList] = useState([]);
  const [countAll, setCountAll] = useState(0);
  const [pagination, setPagination] = useAtom(PaginationData);
  const [companyName, setCompanyName] = useState("");
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    lastPage: 0,
    firstPage: 1,
  });

  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const [searchMonth, setSearchMonth] = useState(null);
  const [searchYear, setSearchYear] = useState();
  const [listTotal, setListTotal] = useState(1);
  const [tooltipVisible, setTooltipVisible] = useState();
  const companyId = sessionStorage.getItem("companyId");
  const divisionId = sessionStorage.getItem("divisionId");
  const departmentId = sessionStorage.getItem("departmentId");
  const department = sessionStorage.getItem("department");
  const username = sessionStorage.getItem("username");
  const authority = sessionStorage.getItem("authority");
  const [popupVisible, setPopupVisible] = useState(false);

  // 엑셀 업로드 부분
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // 파일 상태 업데이트 또는 필요한 다른 작업 수행
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setShowModal(true); // 모달 창 열기

    try {
      // 파일 업로드 요청
      const res = await axios.post("/excel/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드 시 Content-Type 설정
        },
      });

      if (res.data.code === "0000") {
        setShowModal(false); // 모달 창 닫기
        console.log(res.data.result);
        alert(
          "업로드가 완료 되었습니다. \n업로드 성공: " +
            res.data.result.successCount +
            "건 \n업로드 실패: " +
            res.data.result.failureCount +
            "건"
        );
      } else {
        setShowModal(false); // 모달 창 닫기
        alert(res.data.msg);
      }
    } catch (error) {
      setShowModal(false); // 모달 창 닫기
      alert("업로드 실패 - 관리자 문의");
    } finally {
      window.location.reload();
    }
  };

  const handleCreateClick = () => {
    navigate("/matrixList/create", {
      state: {
        companyId: companyId,
        titleLabel: authority === "Y" ? "" : department,
        divisionId: divisionId,
        departmentId: departmentId,
        stateSort: "create",
        matrixFilter: filter,
      },
    });
  };

  const handleClose = () => {
    setTooltipVisible(false);
  };

  // 클릭 이벤트 핸들러
  const handleTextClick = () => {
    setTooltipVisible((prevVisible) => !prevVisible); // 가시성 토글
  };

  const handleExcelSampleDownload = () => {
    // 다운로드 링크 생성
    const downloadLink = document.createElement("a");
    downloadLink.href = excelSampleFile;
    downloadLink.download = "위험성평가표_샘플양식.xlsx";

    // 링크를 클릭하여 다운로드 시작
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 다운로드 후 링크 삭제
    document.body.removeChild(downloadLink);
  };

  const getRiskDateList = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

    const monthsByYear = years.map((year) => {
      return Array.from({ length: 12 }, (_, index) => index + 1);
    });

    // 현재 월의 마지막 날짜를 구하기 위한 함수
    const getLastDayOfMonth = (year, month) => {
      return new Date(year, month, 0).getDate();
    };

    // 현재 연도와 월에 대한 일(day) 배열 생성
    const currentMonth = new Date().getMonth() + 1; // 현재 월
    const daysInCurrentMonth = Array.from(
      { length: getLastDayOfMonth(currentYear, currentMonth) },
      (_, index) => index + 1
    );

    setYearList(years);
    setMonthList(monthsByYear[0]);
  };

  const getCompanyData = () => {
    axios
      .get("/admin/api/find_all_company")
      .then((res) => {
        if (res.data.code === "0000") {
          const matchingCompany = res.data.result.find(
            (company) => company.id === filter.companyId
          );
          if (matchingCompany) {
            // 찾은 객체의 name 값을 사용
            const companyName = matchingCompany.name;
            setCompanyName(companyName);
          }
        }
      })
      .catch(() => {});
  };

  const getRankingData = () => {
    axios
      .post("/admin/api/find_dashboard_data", filter)
      .then((res) => {
        if (res.data.code === "0000") {
          setRankingList(res.data.result.list);
          setCountAll(res.data.result.total);
          setPagination({
            ...pagination,
            countAll: res.data.result.total,
            setPage: (data) => {
              setFilter({ ...filter, pageNum: data });
            },
            deleteFunc: null,
            saveFunc: null,
          });
          setPageInfo({
            ...pageInfo,
            currentPage: res.data.result.currentPage,
            lastPage: res.data.result.lastPage,
          });
        }
      })
      .catch(() => {});
  };

  const handleExcelDownload = (companyName) => {
    axios
      .post("/excel/api/dashboard/download", filter, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "위험성평가통계_" + companyName;
        link.click();
      })
      .catch(() => {});
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getRankingData();
  //     await getRiskDateList();
  //   };

  //   fetchData();
  // }, [filter]);

  useEffect(() => {
    getRankingData();
    getRiskDateList();
    getCompanyData();
    // getDisasterTypeByDepartment();
    // getHarmfulClassificationByCompany();
    setSearchYear(filter.searchYear);
  }, [filter]);

  // 년도 선택 시에 호출되는 함수
  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    // setFilter({ ...filter, searchYear: selectedYear });
    setSearchYear(selectedYear);
  };

  // 월 선택 시에 호출되는 함수
  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value, 10);
    // setFilter({ ...filter, searchMonth: selectedMonth });
    setSearchMonth(selectedMonth);
  };

  // 검색 버튼 클릭 시에 호출되는 함수
  const handleSearch = () => {
    // filter를 사용하여 검색 로직 수행
    setFilter({ ...filter, searchMonth: searchMonth, searchYear: searchYear });
  };

  const handleinitSearch = () => {
    // filter를 사용하여 검색 로직 수행
    setFilter({
      ...filter,
      divisionId: 0,
      departmentId: 0,
      searchMonth: null,
      init: true,
    });
  };

  return (
    <div>
      {/***Table ***/}
      <div className="Dashboard_Component">
        <Row
          style={{ width: "103%", fontSize: "18px", fontFamily: "LGSmart_H" }}
        >
          <div
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between", // 컨테이너 내에서 공간을 최대한 나누어 정렬
              alignItems: "center",
            }}
          >
            <div
              className="Matrix_List_Title1"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <b style={{ marginRight: "5px" }}>{companyName} 위험성평가</b>
              {/* <StyledImage
                src={questionIcon}
                onMouseOver={() => setPopupVisible(true)}
                onMouseLeave={() => setPopupVisible(false)}
              ></StyledImage>
              {popupVisible && <Popup>내용 입력</Popup>} */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                color="secondary" // 기존에는 "success"였음
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#edeef2",
                  borderColor: "#edeef2",
                  color: "black",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                onClick={handleinitSearch}
              >
                검색 초기화
              </Button>
              <Button
                color="secondary" // 기존에는 "success"였음
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#747579",
                  borderColor: "#747579",
                  color: "white",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                onClick={handleExcelSampleDownload}
              >
                샘플파일 내려받기
              </Button>
              {tooltipVisible && (
                <div
                  style={{
                    position: "absolute",
                    transform: "translate(-32.5%, -240%)",
                    borderRadius: "3px",
                    padding: "10px",
                    backgroundColor: "rgba(255, 255, 255, 1.0)", // 반투명 흰색 배경
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    width: "500px",
                    top: "50%",
                    left: "50%",
                    fontFamily: "LGSmart_H",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      borderCollapse: "collapse",
                      height: "100px", // 최대 높이 설정
                      overflowY: "auto", // 세로 스크롤 추가
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ flex: 1 }}></div> {/* 왼쪽의 빈 칸 */}
                      <div
                        style={{
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        <span>
                          <b>위험성평가표 등록하기</b>
                        </span>
                      </div>{" "}
                      {/* 텍스트를 가운데 정렬하는 칸 */}
                      <div style={{ flex: 1, textAlign: "right" }}>
                        <button
                          onClick={handleClose}
                          style={{
                            background: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            border: "none",
                          }}
                        >
                          <img
                            src={closeBtn}
                            alt="Close"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                      </div>{" "}
                      {/* 이미지 버튼을 오른쪽에 위치시키는 칸 */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "37px",
                      }}
                    >
                      <form encType="multipart/form-data">
                        <input
                          type="file"
                          name="file"
                          accept=".xls,.xlsx"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <Button
                          color="secondary" // 기존에는 "success"였음
                          style={{
                            marginRight: "10px",
                            width: "200px",
                            height: "36px",
                            backgroundColor: "#747579",
                            borderColor: "#747579",
                            color: "white",
                            fontSize: "12px",
                            fontFamily: "LGSmart_H",
                          }}
                          onClick={handleUpload}
                        >
                          엑셀파일 업로드
                        </Button>
                      </form>
                      {/* 모달 컴포넌트 표시 */}
                      <Button
                        color="secondary" // 기존에는 "success"였음
                        style={{
                          marginRight: "10px",
                          width: "200px",
                          height: "36px",
                          backgroundColor: "#bb0841",
                          borderColor: "#bb0841",
                          color: "white",
                          fontSize: "12px",
                          fontFamily: "LGSmart_H",
                        }}
                        onClick={handleCreateClick}
                      >
                        신규 작성하기
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <Button
                color="secondary" // 기존에는 "success"였음
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#bb0841",
                  borderColor: "#bb0841",
                  color: "white",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                onClick={handleTextClick}
              >
                등록하기
              </Button>
              <Button
                color="secondary" // 기존에는 "success"였음
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#edeef2",
                  borderColor: "#edeef2",
                  color: "black",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                onClick={() => {
                  handleExcelDownload(companyName);
                }}
              >
                엑셀파일 다운로드
              </Button>
              <Input
                id="exampleSelectYear"
                name="selectYear"
                type="select"
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H-Regular",
                }}
                value={searchYear ? searchYear : filter.searchYear}
                onChange={handleYearChange}
              >
                {yearList.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </Input>
              {/* <Input
                id="exampleSelectMonth"
                name="selectMonth"
                type="select"
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H-Regular",
                }}
                onChange={handleMonthChange}
              >
                <option value={12}>전체</option>
                {monthList.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </Input> */}
              <img
                src={searchBtn}
                alt="Search"
                style={{
                  width: "36px",
                  height: "36px",
                  cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
                }}
                onClick={handleSearch}
              />
            </div>
          </div>
          {showModal && (
            <UploadLoadModal
              msg={"엑셀 파일 업로드 중입니다. 잠시 기다려주세요..."}
            />
          )}{" "}
          <div style={{ height: "72vh", width: "100%" }}>
            <Table bordered style={{ textAlign: "center", fontSize: "12px" }}>
              <thead>
                <tr>
                  <th
                    rowSpan="3"
                    style={{
                      width: "12%",
                      verticalAlign: "middle",
                      borderLeft: "none",
                    }}
                  >
                    담당명
                  </th>
                  <th
                    rowSpan="3"
                    style={{ width: "12%", verticalAlign: "middle" }}
                  >
                    부서명
                  </th>
                  <th
                    rowSpan="3"
                    style={{ width: "8%", verticalAlign: "middle" }}
                  >
                    공정수
                  </th>
                  <th
                    rowSpan="3"
                    style={{
                      width: "9%",
                      verticalAlign: "middle",
                      borderRight: "none",
                    }}
                  >
                    합계
                  </th>
                  <th colSpan="7" style={{ width: "40%", borderLeft: "none" }}>
                    위험요인
                  </th>
                  <th
                    rowSpan="3"
                    style={{
                      width: "12%",
                      verticalAlign: "middle",
                      borderRight: "none",
                    }}
                  >
                    위험요인 개선건수
                    <br />
                    (개선율)
                  </th>
                </tr>
                <tr>
                  <th colSpan="3" style={{ borderBottom: "none" }}>
                    Low Risk
                  </th>
                  <th colSpan="4" style={{ borderBottom: "none" }}>
                    High Risk
                  </th>
                </tr>
                <tr>
                  <th>1등급</th>
                  <th>2등급</th>
                  <th style={{ borderTop: "none" }}>소계</th>
                  <th>3등급</th>
                  <th>4등급</th>
                  <th>5등급</th>
                  <th style={{ borderTop: "none" }}>소계</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {rankingList.map((ranking, index) => (
                  <TableCell
                    key={ranking.id}
                    ranking={ranking}
                    filter={filter}
                    setFilter={setFilter}
                    index={index}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <PaginationFooter filter={filter} pageInfo={pageInfo} />
        </Row>
      </div>
    </div>
  );
};

export default CenterContents;

const StyledImage = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 0px 0px 0px;
  object-fit: contain;
`;
const Popup = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  width: 200px;
  height: 70px;
  background-color: #f8f1eb;
  border-radius: 5px;
  border: solid 1px #dcdcdc;
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 12px;
  font-family: LGSmart_H;
`;
