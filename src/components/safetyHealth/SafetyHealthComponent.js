import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import searchBtn from "../../assets/images/Component 110.png";
import DatePickerCustom from "../common/DatePickerCustom";

const SafetyHealthComponent = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const rows = Array.from({ length: 7 });

  const handleSearch = () => {
    //
  };

  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Setting_Component">
        <div className="d-flex">
          <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            합동안전보건점검
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
                navigate("/safetyHealthCreate");
              }}
            >
              점검 세부내용 등록
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
            <span
              style={{
                fontSize: "12px",
                color: "#444",
              }}
            >
              기간
            </span>
            <div
              style={{
                height: "30px",
                width: "146px",
                fontSize: "12px",
                marginTop: "-7px",
                marginLeft: "10px",
                marginRight: "-5px",
              }}
            >
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                //   className="form-control custom-date-picker"
                customInput={<DatePickerCustom />}
                dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
              />
            </div>
            <span
              style={{
                fontSize: "12px",
                marginRight: "-5px",
              }}
            >
              ~
            </span>
            <div
              style={{
                height: "30px",
                width: "146px",
                fontSize: "12px",
                marginTop: "-7px",
                marginLeft: "15px",
              }}
            >
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                //   className="form-control custom-date-picker"
                customInput={<DatePickerCustom />}
                dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
              />
            </div>
            <Input
              type="select"
              style={{
                height: "30px",
                width: "146px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              <option key={0} value={0}>
                업체명 선택
              </option>
            </Input>
            <div style={{ margin: "-7px 0 0 7px " }}>
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
            }}
          >
            <tbody>
              <tr>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "5%" }}
                >
                  No
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "14%" }}
                >
                  업체명
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  점검자
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "20%" }}
                >
                  점검내용
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "12%" }}
                >
                  재해유형 위험요인
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  개선 전 사진
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  개선 후 사진
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  개선 일정
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  개선 담당자
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  개선 상태
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "7%" }}
                >
                  비고
                </th>
              </tr>
              {rows.map((_, index) => (
                <tr
                  key={index}
                  className="table-row"
                  onClick={() => {
                    navigate("/safetyHealthDetail");
                  }}
                >
                  <td className="main-table ">{index + 1}</td>
                  <td className="main-table">
                    <div className="d-flex">
                      <div className="Ellipse-368">
                        <span className="N">N</span>
                      </div>
                      <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                        엠폴
                      </span>
                    </div>
                  </td>
                  <td className="main-table">박기운</td>
                  <td className="main-table">
                    <table
                      style={{
                        width: "100%",
                        height: "100%",
                        borderCollapse: "collapse",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              width: "25%",
                              height: "33%",
                              borderTop: "0px",
                              paddingLeft: "8px",
                              fontWeight: "600",
                            }}
                          >
                            지적사항
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              width: "75%",
                              height: "33%",
                              borderTop: "0px",
                              paddingLeft: "8px",
                            }}
                          >
                            Cell 2
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              width: "25%",
                              height: "33%",
                              paddingLeft: "8px",
                              fontWeight: "600",
                            }}
                          >
                            개선방안
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              width: "75%",
                              height: "33%",
                              paddingLeft: "8px",
                            }}
                          >
                            Cell 4
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              width: "25%",
                              height: "33%",
                              borderBottom: "0px",
                              paddingLeft: "8px",
                              fontWeight: "600",
                            }}
                          >
                            위치
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              width: "75%",
                              height: "33%",
                              borderBottom: "0px",
                              paddingLeft: "8px",
                            }}
                          >
                            Cell 6
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td className="main-table">607-86-12034</td>
                  <td className="main-table">박기운</td>
                  <td className="main-table">010-1234-5678</td>
                  <td className="main-table">abcd@test.com</td>
                  <td className="main-table">박기운</td>
                  <td className="main-table">010-1234-5678</td>
                  <td className="main-table">ahn123@test.com</td>
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

export default SafetyHealthComponent;
