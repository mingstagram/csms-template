import React, { useState } from "react";
import plusIconNoBackgroundWhite from "../../assets/images/plus-icon-nobackground-white.png";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

const PartnerDetailComponent = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handlePartnerDetail = () => {
    navigate("/partnerUpdate");
  };
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Setting_Component">
        <div className="d-flex">
          <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            협력사 상세
          </span>
        </div>
        <div className="d-flex" style={{ paddingTop: "20px" }}>
          <div style={{ flexBasis: "70%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "12%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 업체명
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#666",
                  }}
                >
                  (로그인 아이디)
                </span>
              </div>
              <div
                className="partner-font"
                style={{
                  flexBasis: "88%",
                }}
              >
                엠폴
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 사용상태
                </span>
              </div>
              <div className="d-flex partner-font" style={{ flexBasis: "70%" }}>
                사용중
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "70%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "12%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 업무구분 선택
                </span>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  flexBasis: "88%",
                  fontSize: "12px",
                  marginTop: "5px",
                  paddingRight: "350px",
                }}
              >
                <span className="partner-font" style={{ paddingTop: "0px" }}>
                  지원
                </span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}></div>
        </div>
        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "70%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "12%", marginTop: "7px" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 상주 장소
                </span>
              </div>
              <div
                className="d-flex "
                style={{
                  flexBasis: "88%",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                <div className="d-flex" style={{ marginRight: "10px" }}>
                  <span className="partner-font" style={{ paddingTop: "7px" }}>
                    P 동
                  </span>
                </div>
                <div className="d-flex" style={{ marginRight: "10px" }}>
                  <span className="partner-font" style={{ paddingTop: "7px" }}>
                    3 층
                  </span>
                </div>
                <div className="d-flex">
                  <span className="partner-font" style={{ paddingTop: "7px" }}>
                    A 존
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}></div>
        </div>
        <div style={{ paddingTop: "10px" }}>
          {/* <Button
            style={{
              width: "120px",
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#439099",
              border: "0px",
              fontSize: "12px",
              padding: "5px 3px 2px 0px",
            }}
          >
            <img
              src={plusIconNoBackgroundWhite}
              style={{ width: "17px", height: "17px" }}
              alt="Plus Icon"
            />{" "}
            <span style={{ marginTop: "5px" }}>정보 추가하기</span>
          </Button> */}
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "70%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "12%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 본사 주소
                </span>
              </div>
              <div style={{ flexBasis: "88%" }}>
                <span className="partner-font">
                  서울시 강서구 강서로 396 (등촌동, 팬코타워) 5층
                </span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 사업자등록번호
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span className="partner-font">607-86-12034</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 대표자명
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">박기운</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 대표자 연락처
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">010-8686-1546</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 대표자 이메일
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span className="partner-font">ajhjhjhjhj@naver.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 상주 총괄 책임자명
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">박기운</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 책임자 연락처
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">010-1568-4586</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 책임자 이메일
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span className="partner-font">abcd@naver.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 안전보건관리 담당자명
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">박기운</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 담당자 연락처
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">010-1568-4586</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 담당자 이메일
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span className="partner-font">abcd@naver.com</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "10px" }}></div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 상주인원
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <div className="d-flex" style={{ marginRight: "80px" }}>
                  <span
                    style={{
                      marginLeft: "7px",
                      marginTop: "7px",
                      fontSize: "12px",
                    }}
                  >
                    15명
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "65%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "13%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 업무내용(상세)
                </span>
              </div>
              <div style={{ flexBasis: "87%" }}>
                <span className="partner-font">
                  안전은 선택이 아닌 필수입니다. 모든 작업 시 안전 규정을
                  준수하세요. 작업 전 보호 장비를 착용하고, 안전 절차를
                  확인하십시오.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ paddingTop: "30px" }}>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 계약 부서명
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">평택안전보건팀</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "35%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 계약 부서장
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <span className="partner-font">박기운</span>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "30%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 계약 담당자
                </span>
              </div>
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <span className="partner-font">박기운</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-end"
          style={{ flexGrow: 1, marginTop: "30px" }}
        >
          <div>
            <Button
              style={{
                width: "180px",
                height: "40px",
                backgroundColor: "#dfe0e4",
                borderColor: "white",
                color: "black",
                fontSize: "12px",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </Button>
          </div>
          <div>
            <Button
              style={{
                width: "180px",
                height: "40px",
                backgroundColor: "#e23465",
                borderColor: "white",
                color: "white",
                fontSize: "12px",
                marginLeft: "10px",
              }}
              onClick={handlePartnerDetail}
            >
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailComponent;
