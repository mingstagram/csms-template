import React, { useState } from "react";
import "../../styles/projectStyle.css";
import { Button, Input } from "reactstrap";
import searchBtn from "../../assets/images/Component 110.png";
import dot3Icon from "../../assets/images/more-2-line.png";
import closeIcon from "../../assets/images/close-fill.png";
import { useNavigate } from "react-router-dom";

const PartnerComponent = () => {
  const navigate = useNavigate();
  const rows = Array.from({ length: 10 });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("업무구분");

  const handleDeptClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePartnerDetail = () => {
    navigate("/partnerDetail");
  };

  const handleSearch = () => {
    //
  };

  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Setting_Component">
        <div className="d-flex">
          <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            협력사 등록
          </span>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ paddingTop: " 10px" }}
        >
          <div>
            <Button
              color="secondary"
              style={{
                width: "120px",
                height: "30px",
                backgroundColor: "#e23465",
                borderColor: "white",
                color: "white",
                fontSize: "12px",
                fontFamily: "LGSmart_H",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/partnerCreate");
              }}
            >
              협력사 등록
            </Button>
            <Button
              color="secondary"
              style={{
                width: "120px",
                height: "30px",
                backgroundColor: "#edeef2",
                borderColor: "white",
                color: "black",
                fontSize: "12px",
                fontFamily: "LGSmart_H",
              }}
            >
              엑셀 다운로드
            </Button>
          </div>
          <div className="d-flex">
            <Input
              type="text"
              placeholder="업체명 입력"
              style={{
                height: "30px",
                width: "240px",
                fontSize: "12px",
                marginRight: "5px",
              }}
            />
            <img
              src={searchBtn}
              alt="Search"
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
              }}
              onClick={handleSearch}
            />
          </div>
        </div>
        {/* 테이블 추가 */}
        <div
          style={{
            overflowX: "auto",
            height: "72vh",
            paddingTop: "10px",
          }}
          className="custom-scrollbar"
        >
          <table
            style={{
              width: "100%",
              height: "100%",
              borderCollapse: "collapse",
              minWidth: "1790px",
              overflowX: "auto", // 가로 스크롤 추가
            }}
          >
            <tbody>
              <tr>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "2%" }}
                >
                  <Input
                    type="checkbox"
                    style={{ width: "18px", height: "18px" }}
                  />
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "4%", position: "relative" }}
                >
                  <div
                    onClick={toggleDropdown}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    업무
                    <br />
                    구분
                    <span className="arrow-down" style={{ marginLeft: "5px" }}>
                      ▼
                    </span>
                  </div>
                  {isOpen && (
                    <ul
                      style={{
                        position: "absolute",
                        left: "0px",
                        width: "80px",
                        borderRadius: "4px",
                        maxHeight: "200px",
                        overflowY: "auto",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        fontFamily: "LGSmart_H",
                        fontSize: "14px",
                        zIndex: 1000,
                        top: "35px",
                        padding: 0,
                        margin: 0,
                        listStyleType: "none",
                        textAlign: "center",
                      }}
                    >
                      <li
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeptClick("지원")}
                      >
                        지원
                      </li>
                      <li
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeptClick("물류")}
                      >
                        물류
                      </li>
                      <li
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeptClick("생산")}
                      >
                        생산
                      </li>
                    </ul>
                  )}
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "5%" }}
                >
                  업체명
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "5%" }}
                >
                  상주장소
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "10%" }}
                >
                  본사주소
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  사업자 등록번호
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "5%" }}
                >
                  대표자명
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  대표자 연락처
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  대표자 이메일
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "5%" }}
                >
                  상주 총괄 작업자명
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  책임자 연락처
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  책임자 이메일
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "5%" }}
                >
                  안전보건 관리 담당자명
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  담당자 연락처
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "3%" }}
                >
                  상주인원
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "15%" }}
                >
                  업무내용(상세)
                </th>
              </tr>
              {rows.map((_, index) => (
                <tr
                  key={index}
                  className="table-row"
                  style={{ cursor: "pointer" }}
                  onClick={handlePartnerDetail}
                >
                  <td className="main-table">
                    <Input
                      type="checkbox"
                      style={{ width: "18px", height: "18px" }}
                    />
                  </td>
                  <td className="main-table main-table-row1">asdf</td>
                  <td className="main-table">
                    <div className="d-flex">
                      <div className="Ellipse-370">
                        <span className="N">N</span>
                      </div>
                      <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                        asd
                      </span>
                    </div>
                  </td>
                  <td className="main-table">P동/3층/A존</td>
                  <td className="main-table">
                    서울시 강서구 강서로 396 (등촌동, 팬코타워) 5층
                  </td>
                  <td className="main-table">607-86-12034</td>
                  <td className="main-table">박기운</td>
                  <td className="main-table">010-1234-5678</td>
                  <td className="main-table">abcd@test.com</td>
                  <td className="main-table">박기운</td>
                  <td className="main-table">010-1234-5678</td>
                  <td className="main-table">ahn123@test.com</td>
                  <td className="main-table">박기운</td>
                  <td className="main-table">010-1234-5678</td>
                  <td className="main-table">15명</td>
                  <td className="main-table">
                    안전은 선택이 아닌 필수입니다. 모든 작업 시 안전 규정을
                    준수하세요. 작업 전 보호 장비를 착용하고, 안전 절차를
                    확인하십시오.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "13px",
            height: "40px",
            paddingTop: "10px",
          }}
        >
          <div className="pageFooter">
            {/* {pageInfo.currentPage}페이지 {pageInfo.firstPage}-{pageInfo.lastPage}{" "} */}
            1페이지 1-15 &nbsp;&nbsp;
          </div>
          <div style={{ marginRight: "auto" }}>
            <button
              className="Rectangle-331"
              style={{ paddingTop: "2px" }}
              //   onClick={() => {
              //     paginationData.setPage(filter.pageNum - 1);
              //   }}
              //   disabled={
              //     arr.slice(firstNum - 1, lastNum).length === 0 ||
              //     filter.pageNum === 1
              //   }
              outline
            >
              <b>{"<"}</b>
            </button>
            &nbsp;
            <button
              className="Rectangle-332"
              style={{ paddingTop: "2px" }}
              //   onClick={() => {
              //     paginationData.setPage(filter.pageNum + 1);
              //   }}
              //   disabled={
              //     arr.slice(firstNum - 1, lastNum).length === 0 ||
              //     filter.pageNum === numPages
              //   }
              outline
            >
              <b>&gt;</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerComponent;
