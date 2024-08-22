import React from "react";
import { Input } from "reactstrap";

const SafetyHealthMngCreateComponent = () => {
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
        </div>
      </div>
    </div>
  );
};

export default SafetyHealthMngCreateComponent;
