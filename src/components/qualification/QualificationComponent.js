import React from "react";
import searchBtn from "../../assets/images/Component 110.png";
import component210 from "../../assets/images/component-210.png";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";

const QualificationComponent = () => {
  const navigate = useNavigate();
  const rows1 = Array.from({ length: 8 });
  const rows2 = Array.from({ length: 10 });
  return (
    <div className="d-flex" style={{ fontFamily: "LGSmart_H" }}>
      <div className="Qualification_Component1">
        <div className="d-flex">
          <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            적격 수급인 선정 평가
          </span>
        </div>
        <div>
          <Button
            color="secondary"
            style={{
              width: "140px",
              height: "30px",
              backgroundColor: "#e23465",
              borderColor: "white",
              color: "white",
              fontSize: "12px",
              fontFamily: "LGSmart_H",
              marginTop: "15px",
            }}
            onClick={() => {
              navigate("/qualificationCreate");
            }}
          >
            등록
          </Button>
        </div>
        <div
          style={{
            height: "40vh",
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
                  style={{ width: "50%" }}
                >
                  평가시기
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "25%" }}
                >
                  업체시기
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "25%" }}
                >
                  등록일
                </th>
              </tr>
              {rows1.map((_, index) => (
                <tr key={index} className="table-row">
                  <td className="main-table">
                    <div className="d-flex">
                      <div className="Ellipse-368">
                        <span className="N">N</span>
                      </div>
                      <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                        `24년 하반기
                      </span>
                    </div>{" "}
                  </td>
                  <td className="main-table">12</td>
                  <td className="main-table">24.07.14</td>
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
          <div
            className="pageFooter"
            style={{ fontSize: "12px", marginRight: "5px" }}
          >
            {/* {pageInfo.currentPage}페이지 {pageInfo.firstPage}-{pageInfo.lastPage}{" "} */}
            1페이지 1-15 &nbsp;&nbsp;
          </div>
          <div style={{ marginRight: "auto" }}>
            <button
              className="Rectangle-331"
              style={{ paddingTop: "2px", width: "32px", height: "24px" }}
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
              style={{ paddingTop: "2px", width: "32px", height: "24px" }}
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
      ></div>
      <div className="Qualification_Component2">
        <div
          className="d-flex justify-content-end"
          style={{ paddingTop: "45px" }}
        >
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
              // onClick={handleSearch}
            />
          </div>
        </div>
        <div
          style={{
            height: "55vh",
            paddingTop: "30px",
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
                  className="notice-table notice-table-title"
                  style={{ width: "10%" }}
                >
                  총 평가점수
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "10%" }}
                >
                  평가항목
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "20%" }}
                >
                  판단기준
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "20%" }}
                >
                  평가내용
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "25%", textAlign: "center" }}
                >
                  제출자료
                </th>
              </tr>
              {rows2.map((_, index) => (
                <tr key={index} className="table-row">
                  <td className="main-table">
                    <div className="d-flex">
                      <div className="Ellipse-368">
                        <span className="N">N</span>
                      </div>
                      <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                        큐원에이트
                      </span>
                    </div>
                  </td>
                  <td className="main-table">54</td>
                  <td className="main-table">12</td>
                  <td className="main-table">업체 실적 및 업무 평가 기준</td>
                  <td className="main-table">업체 실적 및 업무 평가 기준</td>
                  <td
                    className="main-table"
                    style={{ textAlign: "center", cursor: "pointer" }}
                  >
                    <img src={component210} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontSize: "13px",
              height: "40px",
              paddingTop: "20px",
            }}
          >
            <div
              className="pageFooter"
              style={{ fontSize: "12px", marginRight: "5px" }}
            >
              {/* {pageInfo.currentPage}페이지 {pageInfo.firstPage}-{pageInfo.lastPage}{" "} */}
              1페이지 1-15 &nbsp;&nbsp;
            </div>
            <div style={{ marginRight: "auto" }}>
              <button
                className="Rectangle-331"
                style={{ paddingTop: "2px", width: "32px", height: "24px" }}
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
                style={{ paddingTop: "2px", width: "32px", height: "24px" }}
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
          <div style={{ paddingTop: "15px" }}>
            <Button
              style={{
                width: "70px",
                height: "30px",
                backgroundColor: "#edeef2",
                borderColor: "white",
                color: "black",
                fontSize: "12px",
                marginRight: "10px",
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
        <div className="Rectangle-894">
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

export default QualificationComponent;
