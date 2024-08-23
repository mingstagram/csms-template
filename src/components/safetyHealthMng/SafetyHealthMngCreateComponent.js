import React from "react";
import plusIconNoBackground from "../../assets/images/plus-icon-nobackground.png";
import component212 from "../../assets/images/component-212.png";
import closeFill from "../../assets/images/close-fill.png";
import { Button, Input } from "reactstrap";

const SafetyHealthMngCreateComponent = () => {
  const rows = Array.from({ length: 5 });
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Write_Component">
        <div
          className="d-flex"
          style={{ paddingBottom: "10px", paddingLeft: "10px" }}
        >
          <div className="Rectangle-346"></div>
          <p className="main-sub-title">안전보건관리체계 구축</p>
        </div>
        <div className="Write_Component1">
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "16px 10px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 구분
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                paddingTop: "7px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex">
                <Input
                  style={{ marginTop: "12px" }}
                  type="radio"
                  name="radioGroup1"
                  checked
                />{" "}
                <span style={{ marginLeft: "5px", marginTop: "10px" }}>
                  안전보건관리체계 구축
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "20px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <span>&#183;</span> 업체명
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex">
                <Input
                  style={{
                    marginTop: "12px",
                    width: "260px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  type="select"
                >
                  <option key={0} value={0}>
                    업체명 선택
                  </option>
                </Input>
              </div>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              paddingBottom: "15px",
              borderBottom: "1px solid #d9d9d9",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "20px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <span>&#183;</span> 첨부파일
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex">
                <div
                  style={{
                    width: "550px",
                    height: "30px",
                    border: "1px solid  #d9d9d9",
                    borderRadius: "5px",
                    display: "flex", // 추가: 플렉스 컨테이너로 설정
                    justifyContent: "center", // 추가: 가로 가운데 정렬
                    alignItems: "center", // 추가: 세로 가운데 정렬
                    marginTop: "10px",
                  }}
                >
                  <img src={plusIconNoBackground} alt="Plus Icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ paddingTop: "10px" }}>
            <div
              style={{
                flexBasis: "20%",
                padding: "20px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <span>&#183;</span> 첨부파일
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
                paddingTop: "22px",
              }}
            >
              {rows.map((_, index) => (
                <div className="d-flex" style={{ paddingBottom: "10px" }}>
                  <div className="_Work_stac2 d-flex">
                    <div style={{ flexBasis: "2%", marginLeft: "-20px" }}>
                      <img src={component212} />
                    </div>
                    <div style={{ flexBasis: "96%", marginLeft: "5px" }}>
                      <span style={{ fontSize: "12px" }}>
                        안전보건관리체계 구축 등록 파일명.xlsx
                      </span>{" "}
                      <span style={{ fontSize: "12px", color: "#439099" }}>
                        (458kb)
                      </span>
                    </div>
                    <div style={{ flexBasis: "2%" }}>
                      <img src={closeFill} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="d-flex"
            style={{ paddingTop: "20px", justifyContent: "flex-end" }}
          >
            <Button
              style={{
                width: "180px",
                height: "40px",
                padding: "11px 36px 11px 35px",
                backgroundColor: "#edeef2",
                border: "0px",
                fontSize: "13px",
                color: "black",
                marginRight: "15px",
              }}
            >
              수정
            </Button>
            <Button
              style={{
                width: "180px",
                height: "40px",
                padding: "11px 36px 11px 35px",
                backgroundColor: "#e23465",
                border: "0px",
                fontSize: "13px",
              }}
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyHealthMngCreateComponent;
