import React, { useState } from "react";
import attachFile from "../../assets/images/attach_file.png";
import component179 from "../../assets/images/Component-179.png";
import searchBtn from "../../assets/images/Component 110.png";
import { Button, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import DatePickerCustom from "../common/DatePickerCustom";
import { useNavigate } from "react-router-dom";

const DataResultComponent = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="d-flex" style={{ fontFamily: "LGSmart_H" }}>
      <div className="Notice_Component">
        <div className="d-flex">
          <div className="Rectangle-346"></div>
          <p className="main-sub-title">협의체</p>
        </div>
        <div className="d-flex" style={{ paddingTop: "10px" }}>
          <Button
            style={{
              width: "140px",
              height: "34px",
              borderRadius: "500px",
              backgroundColor: "#29282d",
              paddingTop: "4px",
              marginRight: "10px",
            }}
            onClick={() => {
              navigate("/dataResult");
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>
              협의체 자료 · 결과
            </span>
          </Button>
          <Button
            style={{
              width: "140px",
              height: "34px",
              borderRadius: "500px",
              paddingTop: "4px",
              border: "solid 1px #d9d9d9",
              backgroundColor: "white",
            }}
            onClick={() => {
              navigate("/improve");
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: "bold", color: "#666" }}
            >
              개선제안 · 아차사고
            </span>
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "#e23465",
              borderColor: "white",
              color: "white",
              fontSize: "12px",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate("/dataResultWrite");
            }}
          >
            등록
          </Button>
        </div>
        {/* 테이블 추가 */}
        <div
          style={{
            width: "810px",
            height: "250px",
            overflow: "hidden",
            paddingTop: "10px",
          }}
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
                  style={{ width: "15%" }}
                >
                  업체명
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "65%" }}
                >
                  제목
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "10%" }}
                >
                  등록일
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "10%" }}
                >
                  수정일
                </th>
              </tr>
              <tr>
                <td
                  className="main-table main-table-row1"
                  style={{ color: "black" }}
                >
                  asdf
                </td>
                <td className="main-table">
                  <div className="Ellipse-368">
                    <span className="N">N</span>
                    <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                      asdf
                    </span>
                  </div>
                </td>
                <td className="main-table">asd</td>
                <td className="main-table">asd</td>
              </tr>
              <tr>
                <td
                  className="main-table main-table-row1"
                  style={{ color: "black" }}
                >
                  asdf
                </td>
                <td className="main-table">asdf</td>
                <td className="main-table">asd</td>
                <td className="main-table">asd</td>
              </tr>
              <tr>
                <td
                  className="main-table main-table-row1"
                  style={{ color: "black" }}
                >
                  asdf
                </td>
                <td className="main-table">asdf</td>
                <td className="main-table">asd</td>
                <td className="main-table">asd</td>
              </tr>
              <tr>
                <td
                  className="main-table main-table-row1"
                  style={{ color: "black" }}
                >
                  asdf
                </td>
                <td className="main-table">asdf</td>
                <td className="main-table">asd</td>
                <td className="main-table">asd</td>
              </tr>
              <tr>
                <td
                  className="main-table  main-table-row1"
                  style={{ color: "black" }}
                >
                  asdf
                </td>
                <td className="main-table">asdf</td>
                <td className="main-table">asd</td>
                <td className="main-table">asd</td>
              </tr>
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
      <div
        style={{
          width: "8px",
          display: "flex", // Flexbox 사용
          alignItems: "center", // 세로 가운데 정렬
          marginRight: "-3px",
          marginLeft: "3px",
        }}
      >
        <img src={component179} />
      </div>
      <div className="Notice_Component" style={{ paddingTop: "60px" }}>
        <div>
          <div className="d-flex justify-content-end">
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
                width: "130px",
                fontSize: "12px",
                marginTop: "-7px",
                marginLeft: "17px",
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
                marginLeft: "7px",
                marginRight: "-7px",
              }}
            >
              ~
            </span>
            <div
              style={{
                height: "30px",
                width: "130px",
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
            <div style={{ margin: "-7px 0 0 7px " }}>
              <img
                src={searchBtn}
                alt="Search"
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
                }}
                // onClick={handleSearch}
              />
            </div>
          </div>
          <div
            style={{
              width: "110px",
              height: "32px",
              border: "1px solid #d9d9d9",
              padding: "3px 0 0 0",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "12px" }}>평택안전보건팀</span>
          </div>
        </div>
        <div className="d-flex" style={{ paddingTop: "20px" }}>
          <div style={{ flexBasis: "10%" }}>
            <span
              style={{
                fontSize: "14px",
                color: "#439899",
                textAlign: "left",
                fontWeight: "600",
                paddingLeft: "5px",
              }}
            >
              요청
            </span>
          </div>
          <div style={{ flexBasis: "80%" }}>
            <span
              className="d-flex"
              style={{ fontSize: "18px", fontWeight: "600", color: "#444" }}
            >
              <div className="Ellipse-369">
                <span className="N1">N</span>
              </div>
              평택 LG전자 화면 설계서 가이드 입니다.
            </span>
          </div>
          <div style={{ flexBasis: "10%" }}>
            <div style={{ height: "15px" }}>
              <span style={{ fontSize: "11px", color: "#666" }}>
                등록일: 24.07.14
              </span>
            </div>
            <div style={{ height: "15px" }}>
              <span style={{ fontSize: "11px", color: "#666" }}>
                수정일: 24.07.14
              </span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <div
            className="Rectangle-890 d-flex"
            style={{ borderTop: "2px solid black" }}
          >
            <div
              style={{
                flexBasis: "15%",
                padding: "10px 20px 0 0 ",
                textAlign: "center",
              }}
            >
              <span
                style={{ fontSize: "11px", color: "#444", paddingRight: "2px" }}
              >
                첨부파일
              </span>
              <span style={{ fontSize: "11px", color: "#e23465" }}>(3)</span>
            </div>
            <div style={{ flexBasis: "85%", paddingTop: "10px" }}>
              <div style={{ margin: "0 0 -5px 0" }}>
                <img src={attachFile} />{" "}
                <span style={{ fontSize: "12px", color: "#19358c" }}>
                  1234.jpg (26KB)
                </span>
              </div>
              <div style={{ margin: "0 0 -5px 0" }}>
                <img src={attachFile} />{" "}
                <span style={{ fontSize: "12px", color: "#19358c" }}>
                  1234.jpg (26KB)
                </span>
              </div>
              <div style={{ margin: "0 0 -5px 0" }}>
                <img src={attachFile} />{" "}
                <span style={{ fontSize: "12px", color: "#19358c" }}>
                  1234.jpg (26KB)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="Rectangle-891"> 게시물 내용</div>
        <div className="Rectangle-893">
          <div>
            <Input
              type="text"
              style={{ height: "45px", fontSize: "12px" }}
              placeholder="댓글을 입력해주세요."
            />
          </div>
          <div
            className="d-flex justify-content-end"
            style={{ paddingTop: "10px" }}
          >
            <Button
              style={{
                width: "70px",
                height: "30px",
                backgroundColor: "#e23465",
                borderColor: "white",
                color: "white",
                fontSize: "12px",
                marginRight: "5px",
              }}
            >
              등록
            </Button>
            <Button
              style={{
                width: "70px",
                height: "30px",
                backgroundColor: "#edeef2",
                borderColor: "white",
                color: "black",
                fontSize: "12px",
                marginRight: "5px",
              }}
            >
              수정
            </Button>
            <Button
              style={{
                width: "70px",
                height: "30px",
                backgroundColor: "#edeef2",
                borderColor: "white",
                color: "black",
                fontSize: "12px",
              }}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataResultComponent;
