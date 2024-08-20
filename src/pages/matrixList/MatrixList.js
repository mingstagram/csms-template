import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Row, Table } from "reactstrap";
import axios from "axios";
import { useAtom } from "jotai";
import { PaginationData } from "../../data/atom";
import searchBtn from "../../assets/images/Component 110.png";
import "../../styles/projectStyle.css";
import PaginationMatrixList from "../../components/matrixList/PaginationMatrixList";
import MatrixListTable from "../../components/matrixList/MatrixListTable";
import { useLocation } from "react-router-dom";
import Header from "../../layouts/Header";
import excelSampleFile from "../../assets/sample/excel_sample.xlsx";
import UploadLoadModal from "../modal/UploadLoadModal";
import { styled } from "styled-components";

const MatrixList = () => {
  const { state } = useLocation();
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const [searchMonth, setSearchMonth] = useState(state.searchMonth || null);
  const [searchYear, setSearchYear] = useState(state.searchYear || null);
  const [matrixList, setMatrixList] = useState([]);
  const [countAll, setCountAll] = useState(0);
  const [pagination, setPagination] = useAtom(PaginationData);
  const [companyName, setCompanyName] = useState("");
  // const [divisionName, setCompanyName] = useState("");
  // const [companyName, setCompanyName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(0);
  const sessionStorage = window.sessionStorage;
  const sessionUsername = sessionStorage.getItem("username");
  const sessionCompanyId = sessionStorage.getItem("companyId");
  const sessionDivisionId = sessionStorage.getItem("divisionId");
  const sessionDepartmentId = sessionStorage.getItem("departmentId");
  const authority = sessionStorage.getItem("authority");
  const midAuthority = sessionStorage.getItem("midAuthority");
  const [listTotal, setListTotal] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    lastPage: 0,
    firstPage: 1,
  });
  const [titleLabel, setTitleLabel] = useState(state.titleLabel || "");
  const [initLimit, setInitLimit] = useState(state.limit || 50);

  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [selectedAllCheckbox, setSelectedAllCheckbox] = useState([]);
  const [viewCount, setViewCount] = useState(10);
  const tableRef = useRef(null); // useRef를 사용하여 table 요소의 참조를 생성
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [pictureShowModal, setPictureShowModal] = useState(false);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    state.checkboxChecked || false
  );
  const [isRiskCheckboxChecked, setIsRiskCheckboxChecked] = useState(
    state.riskCheckboxChecked || false
  );

  const freqCheckboxChange = () => {
    const newCheckboxState = !isCheckboxChecked;
    setMatrixFilter((prev) => ({
      ...prev,
      checkboxChecked: newCheckboxState,
      riskCheckboxChecked: newCheckboxState ? false : prev.riskCheckboxChecked,
      pageNum: 1,
    }));
    setFilter((prev) => ({
      ...prev,
      checkboxChecked: newCheckboxState,
      riskCheckboxChecked: newCheckboxState ? false : prev.riskCheckboxChecked,
      pageNum: 1,
    }));
    setIsCheckboxChecked(newCheckboxState);
    if (newCheckboxState) {
      setIsRiskCheckboxChecked(false);
    }
  };

  const freqRiskCheckboxChange = () => {
    const newRiskCheckboxState = !isRiskCheckboxChecked;
    setMatrixFilter((prev) => ({
      ...prev,
      riskCheckboxChecked: newRiskCheckboxState,
      checkboxChecked: newRiskCheckboxState ? false : prev.checkboxChecked,
      pageNum: 1,
    }));
    setFilter((prev) => ({
      ...prev,
      riskCheckboxChecked: newRiskCheckboxState,
      checkboxChecked: newRiskCheckboxState ? false : prev.checkboxChecked,
      pageNum: 1,
    }));
    setIsRiskCheckboxChecked(newRiskCheckboxState);
    if (newRiskCheckboxState) {
      setIsCheckboxChecked(false);
    }
  };

  const [filter, setFilter] = useState({
    keyword: "",
    limit: state.limit || 50,
    pageNum: state.maintainPageNum || 1,
    state: "1",
    workType: null,
    companyId: state.companyId,
    divisionId: state.divisionId,
    departmentId: state.departmentId,
    searchYear: state.searchYear || null, //new Date().getFullYear(),
    searchMonth: null,
    sort: state.sort,
    checkboxChecked: state.checkboxChecked || false,
    riskCheckboxChecked: state.riskCheckboxChecked || false,
  });

  const [matrixFilter, setMatrixFilter] = useState({
    ...filter,
    limit: state.limit || 50,
    companyId: state.companyId,
    divisionId: state.divisionId,
    departmentId: state.departmentId,
    searchYear: state.searchYear || null, //new Date().getFullYear(),
    searchMonth: state.searchMonth,
    sort: state.sort,
    checkboxChecked: false,
    riskCheckboxChecked: false,
    selectedCheckbox: selectedCheckbox,
    checkboxChecked: state.checkboxChecked || false,
    riskCheckboxChecked: state.riskCheckboxChecked || false,
  });

  // const downloadMsg = () => {
  //   const msg = "엑셀파일 다운로드";
  //   if (selectedCheckbox.length === 0) {
  //     msg = "엑셀파일 다운로드";
  //   } else {
  //     msg = "엑셀파일 선택 다운로드";
  //   }

  //   return msg;
  // };

  const handleCheckboxChange = (checkboxId) => {
    if (selectedCheckbox.includes(checkboxId)) {
      setSelectedCheckbox((prevSelected) =>
        prevSelected.filter((id) => id !== checkboxId)
      );
      setMatrixFilter({
        ...matrixFilter,
        selectedCheckbox: selectedCheckbox,
      });
    } else {
      setSelectedCheckbox((prevSelected) => [...prevSelected, checkboxId]);
    }
  };

  const handleButtonClick = () => {
    // 선택된 체크박스에 대한 다른 작업 수행
    if (
      authority === "Y" ||
      (midAuthority === "Y" &&
        Number(sessionCompanyId) === Number(state.companyId))
    ) {
      if (selectedCheckbox.length === 0) {
        alert("삭제할 데이터를 선택해주세요.");
        return;
      }
      if (
        window.confirm(
          "총 " + selectedCheckbox.length + "건의 데이터를 삭제하시겠습니까?"
        )
      ) {
        setDeleteShowModal(true);

        axios
          .post("/admin/api/delete_matrix_v2", selectedCheckbox)
          .then((res) => {
            if (res.data.code === "0000") {
              setDeleteShowModal(false);
              setDeleteConfirm(1);
              alert("삭제 완료");
              setSelectedCheckbox([]);

              // axios.post("/admin/api/procedure_value", res.data.result);
            } else {
              alert("삭제 실패 - 관리자 문의");
            }
          })
          .catch(() => alert("삭제 실패 - 관리자 문의"));
      }
    } else {
      console.log(state);
      if (sessionUsername === state?.departmentName) {
        if (selectedCheckbox.length === 0) {
          alert("삭제할 데이터를 선택해주세요.");
        } else {
          if (
            window.confirm(
              "총 " +
                selectedCheckbox.length +
                "건의 데이터를 삭제하시겠습니까?"
            )
          ) {
            setDeleteShowModal(true);

            axios
              .post("/admin/api/delete_matrix_v2", selectedCheckbox)
              .then((res) => {
                if (res.data.code === "0000") {
                  setDeleteShowModal(false);
                  setDeleteConfirm(1);
                  alert("삭제 완료");
                  setSelectedCheckbox([]);
                } else {
                  alert("삭제 실패 - 관리자 문의");
                }
              })
              .catch(() => {
                setDeleteShowModal(false);
                alert("삭제 실패 - 관리자 문의");
              });
          }
        }
      } else {
        alert("권한이 없습니다.");
        return;
      }
    }
  };

  // 엑셀 업로드 부분
  const fileInputRef = useRef(null);
  const fileInputUpdateRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleUpdateFileChange = async (e) => {
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
      const res = await axios.post("/excel/api/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드 시 Content-Type 설정
        },
      });

      if (res.data.code === "0000") {
        setShowModal(false); // 모달 창 닫기
        alert(
          "업데이트 완료 되었습니다. \n업데이트 건수: " +
            res.data.result.updateCount +
            "건 \n업로드 건수: " +
            res.data.result.uploadCount +
            "건"
        );
        // alert("업데이트 완료");
      } else {
        setShowModal(false); // 모달 창 닫기
        alert(res.data.msg);
      }
    } catch (error) {
      setShowModal(false); // 모달 창 닫기
      alert("업데이트 실패 - 관리자 문의");
    } finally {
      window.location.reload();
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    fileInputUpdateRef.current.click();
  };

  const handleTitleLabel = () => {
    if (state.sort === "department") {
      setTitleLabel(state.departmentName);
    } else if (state.sort === "division") {
      setTitleLabel(state.divisionName);
    }
  };

  useEffect(() => {
    getMatrixData();
    getRiskDateList();
    getCompanyData();
    handleTitleLabel();
    if (listTotal === 0) {
      setMatrixList([]);
      setPageInfo({
        currentPage: 0,
        lastPage: 0,
        firstPage: 1,
      });
    }
    console.log(matrixList);
    tableRef.current.scrollTop = 0;
  }, [
    matrixFilter,
    deleteConfirm,
    isCheckboxChecked,
    selectedCheckbox,
    viewCount,
  ]);

  const getCompanyData = () => {
    axios
      .get("/admin/api/find_all_company")
      .then((res) => {
        if (res.data.code === "0000") {
          const matchingCompany = res.data.result.find(
            (company) => company.id === filter.companyId
          );
          if (matchingCompany) {
            // 찾은 객체의 name 값을 사용0
            const companyName = matchingCompany.name;
            setCompanyName(companyName);
          }
        }
      })
      .catch(() => {});
  };

  const getMatrixData = () => {
    axios
      .post("/admin/api/find_matrix", matrixFilter)
      .then((res) => {
        if (res.data.code === "0000") {
          setMatrixList(res.data.result.list);
          setCountAll(res.data.result.total);
          setPagination({
            ...pagination,
            countAll: res.data.result.total,
            setPage: (data) => {
              setMatrixFilter({ ...matrixFilter, pageNum: data });
            },
            deleteFunc: null,
            saveFunc: null,
          });
          setPageInfo({
            ...pageInfo,
            currentPage: res.data.result.currentPage,
            lastPage: res.data.result.lastPage,
          });
          // state.maintainPageNum = undefined;
        }
      })
      .catch(() => {});
  };

  const getRiskDateList = () => {
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

  const handleExcelDownload = () => {
    if (selectedCheckbox.length > 0) {
      alert(
        "선택하신 " + selectedCheckbox.length + "건의 데이터를 다운로드 합니다."
      );
    } else {
      alert("전체 데이터를 다운로드 합니다.");
    }
    const requestData = {
      pageReq: filter,
      selectedCheckbox: selectedCheckbox,
    };

    axios
      .post("/excel/api/ranking/download", requestData, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "위험성평가표_" + titleLabel;
        link.click();
      })
      .catch(() => {});
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

  // 년도 선택 시에 호출되는 함수
  const handleViewChange = (event) => {
    const selectedViewCount = parseInt(event.target.value, 10);
    // setFilter({ ...filter, searchYear: selectedYear });
    setMatrixFilter({
      ...matrixFilter,
      limit: selectedViewCount,
      pageNum: 1,
    });
    setInitLimit(selectedViewCount);
  };

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
    setMatrixFilter({
      ...matrixFilter,
      searchMonth: searchMonth,
      searchYear: searchYear,
    });
  };

  // th 요소의 체크박스 클릭 시 모든 td 요소의 체크박스 상태 변경하는 함수
  const handleAllCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const updatedSelectedCheckbox = isChecked
      ? matrixList.map((matrix) => matrix.id)
      : [];
    setSelectedCheckbox(updatedSelectedCheckbox);
  };

  return (
    <div>
      <Header filter={filter} setFilter={setFilter} />
      <div className="Detail_Component1">
        {/***Table ***/}
        <Row className="Detail_Table1">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // 컨테이너 내에서 공간을 최대한 나누어 정렬
              alignItems: "center",
              // marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            <div
              className="Matrix_List_Title1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <b>{titleLabel} 위험성평가</b>
              <div style={{ marginLeft: "20px" }}>
                <div style={{ marginBottom: "5px" }}>
                  <span
                    style={{
                      color: "#666",
                      fontFamily: "LGSmart_H",
                      fontSize: "12px",
                      marginRight: "32px",
                    }}
                  >
                    수시위험성평가 보기
                  </span>
                  <Input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={freqCheckboxChange}
                    style={{ marginTop: "2px" }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      color: "#666",
                      fontFamily: "LGSmart_H",
                      fontSize: "12px",
                      marginRight: "12px",
                    }}
                  >
                    High Risk 위험요인 보기
                  </span>
                  <Input
                    type="checkbox"
                    checked={isRiskCheckboxChecked}
                    onChange={freqRiskCheckboxChange}
                    style={{ marginTop: "2px" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                id="exampleSelectYear"
                name="selectYear"
                type="select"
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                value={matrixFilter.limit}
                onChange={handleViewChange}
              >
                <option key={10} value={10}>
                  10개씩 보기
                </option>
                <option key={20} value={20}>
                  20개씩 보기
                </option>
                <option key={30} value={30}>
                  30개씩 보기
                </option>
                <option key={40} value={40}>
                  40개씩 보기
                </option>
                <option key={50} value={50}>
                  50개씩 보기
                </option>
              </Input>
              <Button
                color="secondary"
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
                onClick={handleExcelSampleDownload}
              >
                샘플파일 내려받기
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
                onClick={handleExcelDownload}
              >
                {selectedCheckbox.length > 0
                  ? "엑셀 선택 다운로드"
                  : "엑셀 전체 다운로드"}
              </Button>
              <form encType="multipart/form-data">
                <input
                  type="file"
                  name="file"
                  accept=".xls,.xlsx"
                  ref={fileInputUpdateRef}
                  style={{ display: "none" }}
                  onChange={handleUpdateFileChange}
                />
                <Button
                  color="secondary" // 기존에는 "success"였음
                  style={{
                    width: "160px",
                    height: "36px",
                    flexGrow: "0",
                    marginRight: "10px",
                    padding: "10px 29px 9px 30px",
                    backgroundColor: "#747579",
                    borderColor: "#747579",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "12px",
                    fontFamily: "LGSmart_H",
                  }}
                  onClick={handleUpdate}
                >
                  엑셀파일 업데이트
                </Button>
              </form>
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
                    width: "140px",
                    height: "36px",
                    flexGrow: "0",
                    marginRight: "20px",
                    padding: "10px 29px 9px 30px",
                    backgroundColor: "#747579",
                    borderColor: "#747579",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "12px",
                    fontFamily: "LGSmart_H",
                  }}
                  onClick={handleUpload}
                >
                  엑셀파일 업로드
                </Button>
              </form>
              {showModal && (
                <UploadLoadModal
                  msg={"엑셀 파일 업로드 중입니다. 잠시 기다려주세요..."}
                />
              )}{" "}
              {/* 모달 컴포넌트 표시 */}
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
                value={searchYear ? searchYear : state.searchYear}
                onChange={handleYearChange}
              >
                {yearList.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </Input>
              <Input
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
                value={searchMonth ? searchMonth : state.searchMonth}
                onChange={handleMonthChange}
              >
                <option value={null} selected>
                  전체
                </option>
                {monthList.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </Input>
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
          <div style={{ overflowX: "auto", height: "72vh" }} ref={tableRef}>
            <Table
              bordered
              hover
              style={{
                textAlign: "center",
                fontSize: "12px",
                minWidth: "6500px",
                fontFamily: "LGSmart_H",
                // marginTop: "5px",
                borderCollapse: "collapse",
                overflowX: "auto", // 가로 스크롤 추가
                tableLayout: "fixed", // 각 열의 너비를 고정
              }}
            >
              <thead
                style={{
                  borderLeft: "none",
                  borderRight: "none",
                  position:
                    deleteShowModal || showModal || pictureShowModal
                      ? ""
                      : "sticky",
                  top: "0",
                  zIndex: "2",
                  backgroundColor: "#fff",
                  boxShadow: "0 -1px 0 #ddd, 0 2px 4px rgba(0, 0, 0, 0.1)", // 위쪽 선과 아래쪽 굵은 선
                }}
              >
                <tr style={{ verticalAlign: "middle" }}>
                  <th
                    style={{
                      width: "1%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <input
                      type="checkbox"
                      // id={matrix.id}
                      className="Check_Normal1"
                      onClick={handleAllCheckboxChange}
                      checked={selectedCheckbox.length === matrixList.length} // 전체 선택 여부 확인
                    ></input>
                  </th>
                  <th
                    style={{
                      width: "3%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    담당
                  </th>
                  <th
                    style={{
                      width: "3%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    부서명
                  </th>
                  <th
                    style={{
                      width: "3%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선상태
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    정기위험
                    <br />
                    평가일
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    수시위험
                    <br />
                    평가일
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    수시위험
                    <br />
                    평가유형
                  </th>
                  <th
                    style={{
                      width: "3%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    수시위험성평가
                    <br />
                    SHEE Protal 등록번호
                  </th>
                  <th
                    style={{
                      width: "5%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    공정번호
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    공정(설비)명
                    <br />
                    (작업내용)
                  </th>
                  <th
                    style={{
                      width: "4%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    세부작업활동
                    <br />
                    또는 작업장비
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    유해위험요인
                    <br />
                    적용분야
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    유해위험요인
                    <br />
                    상태구분
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    유해위험요인
                    <br />
                    위험분류
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    유해위험요인
                    <br />
                    요인파악
                  </th>
                  <th
                    style={{
                      width: "7%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    유해위험요인
                    <br />
                    위험발생상황 및 결과
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    재해유형
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 <br />
                    안전보건조치
                    <br />
                    대책유형
                  </th>
                  <th
                    style={{
                      width: "8%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 안전보건조치
                    <br />
                    조치내용
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 위험성
                    <br />
                    가능성(빈도)
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 위험성
                    <br />
                    중대성(강도)
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 위험성
                    <br />
                    위험성수준
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 위험
                    <br />
                    등급
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 High Risk
                    <br />
                    공정
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    현재 위험성
                    <br />
                    감소대책
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선
                    <br />
                    대책유형
                  </th>
                  <th
                    style={{
                      width: "6%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선
                    <br />
                    세부내용
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선
                    <br />
                    이전 사진
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선
                    <br />
                    실행 사진
                  </th>
                  <th
                    style={{
                      width: "6%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선실행
                    <br />
                    조치결과
                  </th>
                  <th
                    style={{
                      width: "1%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선실행
                    <br />
                    일정
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선실행
                    <br />
                    담당부서
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선실행
                    <br />
                    담당자
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선 위험성
                    <br />
                    가능성(빈도)
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선 위험성
                    <br />
                    중대성(강도)
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선 위험성 수준
                  </th>
                  <th
                    style={{
                      width: "2%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    개선 위험 등급
                  </th>
                  {/* <th
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    비고
                  </th> */}
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {matrixList.map((matrix) => (
                  <MatrixListTable
                    key={matrix.id}
                    matrix={matrix}
                    filter={filter}
                    matrixFilter={matrixFilter}
                    setMatrixFilter={setMatrixFilter}
                    companyId={state.companyId}
                    onCheckboxChange={handleCheckboxChange}
                    sort={state.sort}
                    titleLabel={titleLabel}
                    selectedCheckbox={selectedCheckbox}
                    checkboxChecked={isCheckboxChecked}
                    riskCheckboxChecked={isRiskCheckboxChecked}
                    limit={initLimit}
                    searchYear={searchYear}
                    searchMonth={searchMonth}
                    setPictureShowModal={setPictureShowModal}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          {deleteShowModal && (
            <UploadLoadModal
              msg={"데이터 삭제중 입니다. 잠시 기다려주세요..."}
            />
          )}{" "}
          <PaginationMatrixList
            filter={matrixFilter}
            setFilter={setMatrixFilter}
            pageInfo={pageInfo}
            onClick={handleButtonClick}
            titleLabel={titleLabel}
            stateSort={state.sort}
            selectedCheckbox={selectedCheckbox}
            setSelectedCheckbox={setSelectedCheckbox}
          />
        </Row>
      </div>
    </div>
  );
};

export default MatrixList;
