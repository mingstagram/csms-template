import React, { useState } from "react";
import component209 from "../../assets/images/component-209.png";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";

const SafetyHealthDetailComponent = () => {
  const navigate = useNavigate();
  const rows = Array.from({ length: 3 });
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Setting_Component">
        <div className="d-flex">
          <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            협동안전보건점검
          </span>
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 업체명
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span style={{ fontSize: "13px" }}>엠폴</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 개선상태 선택
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span style={{ fontSize: "13px" }}> 개선상태1 </span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 재해유형 선택
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span style={{ fontSize: "13px" }}>
                  {" "}
                  낙하/넘어짐, 추락/떨어짐{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "30px", display: "flex" }}>
          {/* 70% 영역 */}
          <div
            style={{
              flexBasis: "70%",
              height: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 첫 번째 줄: 50:50 비율의 두 개의 폼 */}
            <div
              style={{ display: "flex", width: "100%", marginBottom: "20px" }}
            >
              <div style={{ flexBasis: "50%", paddingRight: "10px" }}>
                <div className="d-flex">
                  <div style={{ flexBasis: "24%" }}>
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      &#183; 점검자
                    </span>
                  </div>
                  <div style={{ flexBasis: "76%" }}>
                    <span style={{ fontSize: "13px" }}> 박기운 </span>
                  </div>
                </div>
              </div>
              <div style={{ flexBasis: "50%" }}>
                <div className="d-flex">
                  <div style={{ flexBasis: "24%" }}>
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      &#183; 점검일
                    </span>
                  </div>
                  <div style={{ flexBasis: "76%" }}>
                    <span style={{ fontSize: "13px" }}>2024-04-02</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 두 번째 줄: 50:50 비율의 두 개의 폼 */}
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  flexBasis: "11.9%",
                  paddingRight: "10px",
                  paddingTop: "15px",
                }}
              >
                <div className="d-flex">
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                    &#183; 점검내용
                  </span>
                </div>
              </div>
              <div
                style={{
                  flexBasis: "88.1%",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "10px",
                }}
              >
                <div className="d-flex">
                  <div style={{ flexBasis: "6%" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>
                      &#183; 지적사항
                    </span>
                  </div>
                  <div style={{ flexBasis: "94%" }}>
                    <span style={{ fontSize: "13px" }}>지적사항 내용1</span>
                  </div>
                </div>

                <div className="d-flex" style={{ paddingTop: "10px" }}>
                  <div style={{ flexBasis: "6%" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>
                      &#183; 개선방안
                    </span>
                  </div>
                  <div style={{ flexBasis: "94%" }}>
                    <span style={{ fontSize: "13px" }}>개선방안 내용1</span>
                  </div>
                </div>

                <div className="d-flex" style={{ paddingTop: "10px" }}>
                  <div style={{ flexBasis: "6%" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>
                      &#183; 위치
                    </span>
                  </div>
                  <div style={{ flexBasis: "94%" }}>
                    <span style={{ fontSize: "13px" }}>위치 내용1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 세 번째 줄 */}
            <div style={{ display: "flex", width: "100%", paddingTop: "30px" }}>
              <div style={{ flexBasis: "50%", paddingRight: "10px" }}>
                <div className="d-flex">
                  <div style={{ flexBasis: "24%" }}>
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      &#183; 개선 전 사진
                    </span>
                  </div>
                  <div style={{ flexBasis: "76%" }}>
                    <img src={component209} style={{ paddingRight: "15px" }} />
                    {rows.map((_, index) => (
                      <img
                        src={component209}
                        style={{ paddingRight: "15px" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="d-flex">
                  <div style={{ flexBasis: "24%" }}>
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      &#183; 개선 후 사진{" "}
                    </span>
                  </div>
                  <div style={{ flexBasis: "76%" }}>
                    <img src={component209} style={{ paddingRight: "15px" }} />
                    {rows.map((_, index) => (
                      <img
                        src={component209}
                        style={{ paddingRight: "15px" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 30% 영역 */}
          <div
            style={{
              flexBasis: "30%",
              height: "300px",
            }}
          >
            <div className="Rectangle-417">
              <div class="_Work_stac1">
                <div className="d-flex">
                  <div style={{ flexBasis: "4%" }}></div>
                  <div style={{ flexBasis: "92%" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        paddingLeft: "5px",
                      }}
                    >
                      낙하/넘어짐
                    </span>
                  </div>
                  <div style={{ flexBasis: "4%" }}></div>
                </div>
              </div>
              <div class="_Work_stac1">
                <div className="d-flex">
                  <div style={{ flexBasis: "4%" }}></div>
                  <div style={{ flexBasis: "92%" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        paddingLeft: "5px",
                      }}
                    >
                      추락/떨어짐
                    </span>
                  </div>
                  <div style={{ flexBasis: "4%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 개선일정
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span style={{ fontSize: "13px" }}>2024-04-08</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 개선 담당자
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span style={{ fontSize: "13px" }}>박기운</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 비고
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span style={{ fontSize: "13px" }}>비고내용1</span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex" style={{ paddingTop: "60px" }}>
          <div
            style={{
              flexBasis: "50%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
          <div
            style={{
              flexBasis: "50%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                width: "170px",
                height: "40px",
                padding: "11px 36px 11px 35px",
                backgroundColor: "#dfe0e4",
                border: "0px",
                fontSize: "13px",
                color: "#444",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              목록
            </Button>
            <Button
              style={{
                width: "170px",
                height: "40px",
                padding: "11px 36px 11px 35px",
                backgroundColor: "#e23465",
                border: "0px",
                fontSize: "13px",
                marginLeft: "10px",
              }}
              onClick={() => {
                navigate("/safetyHealthUpdate");
              }}
            >
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyHealthDetailComponent;
