import React, { useState } from "react";
import plusIconNoBackgroundWhite from "../../assets/images/plus-icon-nobackground-white.png";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

const PartnerUpdateComponent = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("사용중");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
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
              <div style={{ flexBasis: "88%" }}>
                <Input
                  type="text"
                  placeholder="업체명을 입력하세요."
                  style={{ width: "950px", height: "30px", fontSize: "12px" }}
                  value={"엠폴"}
                />
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
              <div className="d-flex" style={{ flexBasis: "70%" }}>
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="1234"
                    value="사용중"
                    checked={selectedOption === "사용중"}
                    onChange={() => handleOptionChange("사용중")}
                  />
                  <span
                    className="custom-radio-span"
                    style={{
                      border:
                        selectedOption === "사용중"
                          ? "solid 1px #e23465"
                          : "solid 1px #bebebe",
                      color:
                        selectedOption === "사용중" ? "#e23465" : "initial",
                    }}
                  >
                    사용중
                  </span>
                </label>
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="1234"
                    value="미사용"
                    checked={selectedOption === "미사용"}
                    onChange={() => handleOptionChange("미사용")}
                  />
                  <span
                    className="custom-radio-span"
                    style={{
                      border:
                        selectedOption === "미사용"
                          ? "solid 1px #e23465"
                          : "solid 1px #bebebe",
                      color:
                        selectedOption === "미사용" ? "#e23465" : "initial",
                    }}
                  >
                    미사용
                  </span>
                </label>
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
                <span>
                  <Input type="radio" name="radioGroup" /> 요청
                </span>
                <span>
                  <Input type="radio" name="radioGroup" checked /> 물류
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 생산
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 자재
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 연구
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 연구용역
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 업무용PC
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 콜센터
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 파견
                </span>
                <span>
                  <Input type="radio" name="radioGroup" /> 칠러
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
                <div className="d-flex" style={{ marginRight: "80px" }}>
                  <Input
                    type="text"
                    style={{ width: "230px", height: "30px", fontSize: "12px" }}
                    placeholder="동을 입력하세요."
                    value={"P"}
                  />{" "}
                  <span style={{ marginLeft: "7px", marginTop: "7px" }}>
                    동
                  </span>
                </div>
                <div className="d-flex" style={{ marginRight: "80px" }}>
                  <Input
                    type="text"
                    style={{ width: "230px", height: "30px", fontSize: "12px" }}
                    placeholder="층을 입력하세요."
                    value={"3"}
                  />{" "}
                  <span style={{ marginLeft: "7px", marginTop: "7px" }}>
                    층
                  </span>
                </div>
                <div className="d-flex">
                  <Input
                    type="text"
                    style={{ width: "230px", height: "30px", fontSize: "12px" }}
                    placeholder="세부위치를 입력하세요."
                    value={"A존"}
                  />{" "}
                  <span style={{ marginLeft: "7px", marginTop: "7px" }}>
                    세부위치
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "30%" }}></div>
        </div>
        <div style={{ paddingTop: "10px" }}>
          <Button
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
          </Button>
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
                <Input
                  type="text"
                  placeholder="본사 주소를 입력하세요."
                  style={{ width: "950px", height: "30px", fontSize: "12px" }}
                  value={"서울시 강서구 강서로 396  (등촌동, 팬코타워) 5층"}
                />
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
                <Input
                  type="text"
                  placeholder="사업자 등록번호를 입력하세요."
                  style={{ width: "360px", height: "30px", fontSize: "12px" }}
                  value={"607-86-12034"}
                />
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
                <Input
                  type="text"
                  placeholder="대표자명을 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"박기운"}
                />
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
                <Input
                  type="text"
                  placeholder="대표자 연락처를 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"010-1235-4454"}
                />
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
                <Input
                  type="text"
                  placeholder="대표자 이메일을 입력하세요."
                  style={{ width: "360px", height: "30px", fontSize: "12px" }}
                  value={"abcd@naver.com"}
                />
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
                <Input
                  type="text"
                  placeholder="상주 총괄 책임자명을 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"박기운"}
                />
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
                <Input
                  type="text"
                  placeholder="책임자 연락처를 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"010-1234-4485"}
                />
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
                <Input
                  type="text"
                  placeholder="책임자 이메일을 입력하세요."
                  style={{ width: "360px", height: "30px", fontSize: "12px" }}
                  value={"abcd@naver.com"}
                />
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
                <Input
                  type="text"
                  placeholder="안전보건관리 담당자명을 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"박기운"}
                />
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
                <Input
                  type="text"
                  placeholder="담당자 연락처를 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"010-4549-4451"}
                />
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
                <Input
                  type="text"
                  placeholder="담당자 이메일을 입력하세요."
                  style={{ width: "360px", height: "30px", fontSize: "12px" }}
                  value={"abcd@naver.com"}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "10px" }}>
          <Button
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
          </Button>
        </div>

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
                  <Input
                    type="text"
                    placeholder="몇명인지 숫자로 입력하세요."
                    style={{ width: "176px", height: "30px", fontSize: "12px" }}
                    value={"15"}
                  />{" "}
                  <span
                    style={{
                      marginLeft: "7px",
                      marginTop: "7px",
                      fontSize: "12px",
                    }}
                  >
                    명
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "65%" }}>
            <div className="d-flex">
              <div style={{ flexBasis: "24%" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  &#183; 업무내용(상세)
                </span>
              </div>
              <div style={{ flexBasis: "76%" }}>
                <Input
                  type="text"
                  placeholder="담당자 연락처를 입력하세요."
                  style={{ width: "973px", height: "30px", fontSize: "12px" }}
                  value={
                    "안전은 선택이 아닌 필수입니다. 모든 작업 시 안전 규정을 준수하세요. 작업 전 보호 장비를 착용하고, 안전 절차를 확인하십시오."
                  }
                />
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
                <Input
                  type="text"
                  placeholder="계약 부서명을 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"평택안전보건팀"}
                />
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
                <Input
                  type="text"
                  placeholder="계약 부서장을 입력하세요."
                  style={{ width: "350px", height: "30px", fontSize: "12px" }}
                  value={"박기운"}
                />
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
                <Input
                  type="text"
                  placeholder="계약 담당자를 입력하세요."
                  style={{ width: "360px", height: "30px", fontSize: "12px" }}
                  value={"박기운"}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "10px" }}>
          <Button
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
          </Button>
        </div>

        <div style={{ flexGrow: 1, marginTop: "10px" }}>
          <span style={{ fontSize: "10px", color: "#a2845e" }}>
            ※ 전체 항목을 입력하세요
          </span>
        </div>

        <div className="d-flex justify-content-end">
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
            >
              수정완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerUpdateComponent;
