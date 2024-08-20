import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import "../../styles/projectStyle.css";
import { Button, Input, Row, Table } from "reactstrap";
import searchBtn from "../../assets/images/Component 110.png";
import download from "../../assets/images/download.png";
import questionIcon from "../../assets/images/questionIcon.png";
import { getAllDeptList } from "../../utils/CodeList";
import PaginationDataroom from "../../components/dataroom/PaginationDataroom.js";
import styled from "styled-components";
import { PaginationData } from "../../data/atom";
import axios from "axios";
import { useAtom } from "jotai";

const Dataroom = () => {
  const [allDeptList, setAllDeptList] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [selectedCheckboxFiles, setSelectedCheckboxFiles] = useState([]);
  const [selectedCheckboxDeptName, setSelectedCheckboxDeptName] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [pagination, setPagination] = useAtom(PaginationData);
  const sessionStorage = window.sessionStorage;
  const sessionUsername = sessionStorage.getItem("username");
  const sessionCompanyId = sessionStorage.getItem("companyId");
  const authority = sessionStorage.getItem("authority");
  const midAuthority = sessionStorage.getItem("midAuthority");
  const [deleteConfirm, setDeleteConfirm] = useState(0);
  const [departmentId, setDepartmentId] = useState(0);
  const [departmentName, setDepartmentName] = useState("");
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Select 박스 열림 여부 상태
  const [popupVisible, setPopupVisible] = useState(false);

  const [filter, setFilter] = useState({
    keyword: "",
    limit: 10,
    pageNum: 1,
    state: "1",
    workType: null,
    companyId: 0,
    divisionId: 0,
    departmentId: 0,
    searchYear: null, //new Date().getFullYear(),
    searchMonth: null,
  });

  const [dataFilter, setDataFilter] = useState({
    keyword: "",
    limit: 10,
    pageNum: 1,
    state: "1",
    workType: null,
    companyId: 0,
    divisionId: 0,
    departmentId: 0,
    searchYear: null, //new Date().getFullYear(),
    searchMonth: null,
    selectedCheckbox: selectedCheckbox,
    selectedCheckboxFiles: selectedCheckboxFiles,
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    lastPage: 0,
    firstPage: 1,
  });
  const handleDeptNameChange = (e) => {
    const value = e.target.value.toLowerCase(); // 입력 값을 소문자로 변환
    setDepartmentName(e.target.value); // 원래 값을 상태에 저장

    if (value) {
      const filtered = allDeptList.filter(
        (dept) => dept.name.toLowerCase().includes(value) // 각 부서 이름을 소문자로 변환하여 비교
      );
      setFilteredDepts(filtered);
    } else {
      setFilteredDepts([]);
    }
  };

  const handleDeptClick = (deptName) => {
    setDepartmentName(deptName);
    setFilteredDepts([]);
    setIsOpen(false); // 아이템 선택 시 Select 박스 닫기
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFilteredDepts(allDeptList);
  };

  const getDataroomList = () => {
    axios
      .post("/dataroom/api/find_dataroom", dataFilter)
      .then((res) => {
        if (res.data.code === "0000") {
          console.log(res.data.result.list);
          setDataList(res.data.result.list);
          setPagination({
            ...pagination,
            countAll: res.data.result.total,
            setPage: (data) => {
              setDataFilter({ ...dataFilter, pageNum: data });
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

  const handleDownload = ({ fileName, realName }) => {
    axios
      .get("/dataroom/api/download/" + fileName, {
        responseType: "blob",
      })
      .then((res) => {
        if (res.status === 200) {
          // 브라우저에서 파일 다운로드
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", realName); // 파일명 설정
          document.body.appendChild(link);
          link.click();
        }
      })
      .catch(() => {});
  };

  const handleMultiFileDownload = () => {
    if (selectedCheckboxFiles.length > 0) {
      if (
        window.confirm(
          "총 " +
            selectedCheckboxFiles.length +
            "건의 데이터를 다운로드 하시겠습니까?"
        )
      ) {
        axios
          .post("/dataroom/api/downloadFiles", selectedCheckboxFiles, {
            responseType: "blob",
          })
          .then((res) => {
            if (res.status === 200) {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "file_list.zip"); // 파일명 설정
              document.body.appendChild(link);
              link.click();
            }
          })
          .catch(() => {});
      }
    } else {
      alert("데이터를 선택해주세요.");
    }
  };

  const handleCheckboxChange = (checkboxId) => {
    if (selectedCheckbox.includes(checkboxId)) {
      setSelectedCheckbox((prevSelected) =>
        prevSelected.filter((id) => id !== checkboxId)
      );
      setDataFilter({
        ...dataFilter,
        selectedCheckbox: selectedCheckbox,
      });
    } else {
      setSelectedCheckbox((prevSelected) => [...prevSelected, checkboxId]);
    }
  };

  // const handleCheckboxChangeDeptName = (deptName) => {
  //   const isChecked = selectedCheckboxDeptName.includes(deptName);

  //   if (isChecked) {
  //     // 이미 체크된 상태이면 체크를 해제
  //     setSelectedCheckboxDeptName((prevSelected) =>
  //       prevSelected.filter((name) => name !== deptName)
  //     );
  //   } else {
  //     // 체크되지 않은 경우에만 체크를 추가
  //     setSelectedCheckboxDeptName((prevSelected) => [
  //       ...prevSelected,
  //       deptName,
  //     ]);
  //   }
  //   setSelectedCheckboxDeptName((prevSelected) => [...prevSelected, deptName]);
  // };

  const handleCheckboxChangeMulti = (checkboxFilename) => {
    if (selectedCheckboxFiles.includes(checkboxFilename)) {
      setSelectedCheckboxFiles((prevSelected) =>
        prevSelected.filter((id) => id !== checkboxFilename)
      );
      setDataFilter({
        ...dataFilter,
        selectedCheckboxFiles: selectedCheckboxFiles,
      });
    } else {
      setSelectedCheckboxFiles((prevSelected) => [
        ...prevSelected,
        checkboxFilename,
      ]);
    }
  };

  const handleButtonClick = () => {
    // 선택된 체크박스에 대한 다른 작업 수행
    if (authority === "Y") {
      if (selectedCheckbox.length > 0) {
        if (
          window.confirm(
            "총 " + selectedCheckbox.length + "건의 데이터를 삭제하시겠습니까?"
          )
        ) {
          axios
            .post("/dataroom/api/delete_dataroom", selectedCheckbox)
            .then((res) => {
              if (res.data.code === "0000") {
                setDeleteConfirm(1);
                alert("삭제 완료");
                window.location.reload();
              } else {
                alert("삭제 실패 - 관리자 문의");
              }
            })
            .catch(() => alert("삭제 실패 - 관리자 문의"));
        }
      } else {
        alert("데이터를 선택해주세요.");
      }
    } else {
      alert("권한이 없습니다.");
    }
  };

  const handleDelete = (uuidFileName) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .get("/dataroom/api/delete_dataroom/" + uuidFileName)
        .then((res) => {
          if (res.data.code === "0000") {
            setDeleteConfirm(1);
            alert("삭제 완료");
            window.location.reload();
          } else {
            alert("삭제 실패 - 관리자 문의");
          }
        })
        .catch(() => alert("삭제 실패 - 관리자 문의"));
    }
  };

  // 검색 버튼 클릭 시에 호출되는 함수
  const handleSearch = () => {
    // filter를 사용하여 검색 로직 수행
    setDataFilter({
      ...filter,
      // departmentId: departmentId,
      departmentName: departmentName,
    });
  };

  const handleDepartment = (event) => {
    // if (event.target.value === "평택안전보건팀") {
    //   const deptName = event.target.value;
    //   setDepartmentName(deptName);
    // } else {
    //   const selectedDeptId = parseInt(event.target.value, 10);
    //   setDepartmentId(selectedDeptId);
    //   setDepartmentName("");
    // }
    setDepartmentName(event.target.value);
  };

  useEffect(() => {
    getAllDeptList(setAllDeptList);
    getDataroomList();
  }, [
    dataFilter,
    deleteConfirm,
    selectedCheckbox,
    selectedCheckboxFiles,
    selectedCheckboxDeptName,
  ]);

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
              marginTop: "10px",
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
              <b style={{ marginRight: "7px" }}>위험성평가 파일 보관함</b>
              {/* <StyledImage
                src={questionIcon}
                onMouseOver={() => setPopupVisible(true)}
                onMouseLeave={() => setPopupVisible(false)}
              ></StyledImage>
              {popupVisible && (
                <Popup>
                  각 부서별 파일을 보관 <br />* 삭제방법 : 파일의 삭제권한은 각
                  부서별로 삭제 가능하며, 관리자는 모든 파일을 삭제할 수
                  있습니다.
                </Popup>
              )} */}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Input
                id="exampleSelectMonth"
                name="selectMonth"
                type="text"
                style={{
                  marginRight: "10px",
                  width: "200px",
                  height: "36px",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                value={departmentName}
                onChange={handleDeptNameChange}
                onClick={toggleDropdown}
                autocomplete="off"
                placeholder="부서명 검색"
              >
                {/* <option value={0} selected>
                  전체
                </option>
                <option value={"평택안전보건팀"}>평택안전보건팀</option>
                {allDeptList.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))} */}
              </Input>
              {isOpen && filteredDepts.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    left: "0px",
                    width: "200px",
                    borderRadius: "4px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    fontFamily: "LGSmart_H",
                    fontSize: "14px",
                    zIndex: 1000,
                    top: "35px", // 기본 위치 설정
                  }}
                >
                  <li
                    key={"admin"}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeptClick("평택안전보건팀")}
                  >
                    평택안전보건팀
                  </li>
                  {filteredDepts.map((dept) => (
                    <li
                      key={dept.id}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeptClick(dept.name)}
                    >
                      {dept.name}
                    </li>
                  ))}
                </ul>
              )}
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
          <div style={{ overflowX: "auto", height: "73vh" }}>
            <Table
              bordered
              hover
              style={{
                textAlign: "center",
                fontSize: "12px",
                minWidth: "1500px",
                fontFamily: "LGSmart_H",
                marginTop: "10px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ verticalAlign: "middle" }}>
                  <th
                    style={{
                      width: "5%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  ></th>
                  <th
                    style={{
                      width: "10%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    부서명
                  </th>
                  <th
                    style={{
                      width: "45%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    파일명
                  </th>
                  <th
                    style={{
                      width: "10%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    파일용량
                  </th>
                  <th
                    style={{
                      width: "15%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    등록일시
                  </th>
                  <th
                    style={{
                      width: "10%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    다운로드
                  </th>
                  <th
                    style={{
                      width: "5%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((data) => (
                  <tr
                    style={{
                      height: "60px",
                      fontSize: "12px",
                      verticalAlign: "middle",
                    }}
                    // onClick={handleRowClick}
                  >
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                        // ...commonCellStyle,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <input
                        type="checkbox"
                        // id={matrix.id}
                        className="Check_Normal1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          handleCheckboxChange(data.id);
                          handleCheckboxChangeMulti(data.uuidFileName);
                          // handleCheckboxChangeDeptName(data.departmentName);
                        }}
                        checked={selectedCheckbox.includes(data.id)}
                        // checked={selectedCheckbox.includes(matrix.id)}
                      ></input>
                    </td>
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      {data.departmentName}
                    </td>
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      {data.fileName.substring(
                        0,
                        data.fileName.lastIndexOf(".")
                      )}
                    </td>
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      {data.fileVolume} MB
                    </td>
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      {data.regDate}
                    </td>
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      <img
                        src={download}
                        title="다운로드"
                        alt="download"
                        value={data.fileName}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          handleDownload({
                            fileName: data.uuidFileName,
                            realName: data.fileName,
                          });
                        }}
                      />
                    </td>
                    <td
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      {(authority === "Y" ||
                        sessionUsername === data.departmentName ||
                        (midAuthority === "Y" &&
                          Number(sessionCompanyId) ===
                            Number(data.companyId))) && (
                        <Button
                          color="secondary"
                          style={{
                            marginRight: "10px",
                            width: "60px",
                            height: "36px",
                            backgroundColor: "#585858",
                            borderColor: "#585858",
                            color: "white",
                            fontSize: "11px",
                            fontFamily: "LGSmart_H",
                          }}
                          onClick={() => {
                            handleDelete(data.uuidFileName);
                          }}
                        >
                          삭제
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <PaginationDataroom
            filter={dataFilter}
            setFilter={setDataFilter}
            pageInfo={pageInfo}
            deleteButton={handleButtonClick}
            handleMultiFileDownload={handleMultiFileDownload}
            selectedCheckbox={selectedCheckbox}
            setSelectedCheckbox={setSelectedCheckbox}
            selectedCheckboxFiles={selectedCheckboxFiles}
            setSelectedCheckboxFiles={setSelectedCheckboxFiles}
          />
        </Row>
      </div>
    </div>
  );
};

export default Dataroom;

const StyledImage = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 0px 0px 0px;
  object-fit: contain;
`;
const Popup = styled.div`
  position: absolute;
  top: 30px;
  left: 135px;
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

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
