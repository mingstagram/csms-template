import React from "react";
import "../../styles/projectStyle.css";
import VS1 from "../../assets/images/VS1.png";
import { Button, Input } from "reactstrap";

const PwChangeComponent = () => {
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="PwChange_Component">
        <div className="PwChange_Header">
          <img className="PwChange_Header_Image" src={VS1} />
        </div>
        <div className="PwChange_Contents">
          <div className="d-flex" style={{ marginRight: "20px" }}>
            <div className="Rectangle-346"></div>
            <p className="main-sub-title">비밀번호 변경</p>
          </div>
          <div className="d-flex" style={{ paddingTop: "20px" }}>
            <span style={{ fontSize: "14px", color: "#6b6b6b" }}>
              LG전자 (평택 )도급사 안전관리 시스템 비밀번호를 변경하세요
            </span>
          </div>
          <div className="d-flex" style={{ paddingTop: "30px" }}>
            <div style={{ flexBasis: "30%" }}>
              <span style={{ fontSize: "14px" }}>업체명 (아이디)</span>
            </div>
            <div style={{ flexBasis: "70%" }}>
              <Input
                type="text"
                style={{ width: "380px", height: "30px", fontSize: "13px" }}
                placeholder="로그인 업체명 정보"
              />
            </div>
          </div>
          <div className="d-flex" style={{ paddingTop: "30px" }}>
            <div style={{ flexBasis: "30%" }}>
              <span style={{ fontSize: "14px" }}>새 비밀번호</span>
            </div>
            <div style={{ flexBasis: "70%" }}>
              <Input
                type="password"
                style={{ width: "380px", height: "30px", fontSize: "13px" }}
                placeholder="새 비밀번호를 입력하세요."
              />
            </div>
          </div>
          <div className="d-flex" style={{ paddingTop: "30px" }}>
            <div style={{ flexBasis: "30%" }}>
              <span style={{ fontSize: "14px" }}>새 비밀번호 확인</span>
            </div>
            <div style={{ flexBasis: "70%" }}>
              <Input
                type="password"
                style={{ width: "380px", height: "30px", fontSize: "13px" }}
                placeholder="새 비밀번호를 한번 더 입력하세요."
              />
            </div>
          </div>
          <div style={{ textAlign: "center", paddingTop: "30px" }}>
            <div>
              <Button
                style={{
                  width: "250px",
                  height: "40px",
                  backgroundColor: "#e23465",
                  borderColor: "white",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                비밀번호 변경
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PwChangeComponent;
