import React from "react";
import "../../styles/projectStyle.css";
import plusIconNoBackground from "../../assets/images/plus-icon-nobackground.png";
import closeIcon from "../../assets/images/close-fill.png";
import { Button, FormGroup, Input, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerCustom from "../common/DatePickerCustom";
import { useNavigate } from "react-router-dom";

const ContractorShCreateComponent = () => {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Write_Component">
        <div className="d-flex">
          <div className="Rectangle-346"></div>
          <p className="main-sub-title">안전보건관리체계 구축</p>
        </div>
        <div className="Write_Component1">
          <div className="d-flex" style={{ paddingTop: "10px" }}>
            <Button
              style={{
                width: "160px",
                height: "34px",
                borderRadius: "500px",
                paddingTop: "4px",
                border: "solid 1px #d9d9d9",
                backgroundColor: "white",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/shLeadershipCreate");
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: "bold", color: "#666" }}
              >
                경영자의 안전보건 리더십
              </span>
            </Button>
            <Button
              style={{
                width: "160px",
                height: "34px",
                borderRadius: "500px",
                paddingTop: "4px",
                border: "solid 1px #d9d9d9",
                backgroundColor: "white",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/workerParticipationCreate");
              }}
            >
              <span
                style={{ fontSize: "14px", fontWeight: "bold", color: "#666" }}
              >
                근로자의 참여
              </span>
            </Button>
            <Button
              style={{
                width: "160px",
                height: "34px",
                borderRadius: "500px",
                paddingTop: "4px",
                border: "solid 1px #d9d9d9",
                backgroundColor: "white",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/hazardManagementCreate");
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: "bold", color: "#666" }}
              >
                위험요인 제거·대체 및 통제
              </span>
            </Button>
            <Button
              style={{
                width: "160px",
                height: "34px",
                borderRadius: "500px",
                paddingTop: "4px",
                border: "solid 1px #d9d9d9",
                backgroundColor: "white",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/emergencyPlanCreate");
              }}
            >
              <span
                style={{ fontSize: "14px", fontWeight: "bold", color: "#666" }}
              >
                비상조치계획
              </span>
            </Button>
          </div>
          <div className="d-flex" style={{ paddingTop: "10px" }}>
            <Button
              style={{
                width: "160px",
                height: "34px",
                borderRadius: "500px",
                backgroundColor: "#29282d",
                paddingTop: "4px",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/contractorShCreate");
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                도급·용역·위탁시 안전보건 확보
              </span>
            </Button>
            <Button
              style={{
                width: "160px",
                height: "34px",
                borderRadius: "500px",
                paddingTop: "4px",
                border: "solid 1px #d9d9d9",
                backgroundColor: "white",
                marginRight: "10px",
              }}
              onClick={() => {
                navigate("/shSystemImproveCreate");
              }}
            >
              <span
                style={{ fontSize: "10px", fontWeight: "bold", color: "#666" }}
              >
                안전보건관리체계 평가 및 개선
              </span>
            </Button>
          </div>
          <div
            className="d-flex"
            style={{
              paddingTop: "20px",
              height: "89px",
              borderBottom: "1px solid #d9d9d9",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "23px 10px",
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
                paddingTop: "12px",
                fontSize: "12px",
              }}
            >
              <FormGroup>
                <div
                  className="d-flex"
                  style={{
                    paddingBottom: "10px",
                    alignItems: "center", // 추가된 스타일
                    marginTop: "10px",
                  }}
                >
                  <span style={{ flexBasis: "50%" }}>
                    <Input type="radio" name="radioGroup1" checked />
                    &nbsp;중대재해처벌법 {">"} 도급·용역·위탁시 안전보건 확보
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              paddingTop: "18px",
              height: "80px",
              borderBottom: "1px solid #d9d9d9",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "010px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 분류
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              <FormGroup>
                <div className="d-flex">
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" checked /> 해당사항
                    없음
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>

          <div
            className="d-flex"
            style={{
              paddingTop: "20px",
              height: "60px",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "0px 10px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 제목
            </div>
            <div
              style={{
                flexBasis: "80%",
                paddingLeft: "10px",
                fontSize: "12px",
              }}
            >
              <FormGroup>
                <div className="d-flex">
                  <span>
                    <Input
                      type="text"
                      placeholder="제목을 입력하세요."
                      style={{
                        height: "30px",
                        width: "575px",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                    />
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              height: "160px",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "50px 10px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 내용
            </div>
            <div
              style={{
                flexBasis: "80%",
                paddingLeft: "10px",
                fontSize: "12px",
              }}
            >
              <FormGroup>
                <div className="d-flex">
                  <span>
                    <Input
                      type="textarea"
                      placeholder="내용을 입력하거나 이미지를 붙여넣기 하세요."
                      style={{
                        height: "150px",
                        width: "575px",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                    />
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              height: "40px",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "0px 10px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 첨부파일
            </div>
            <div
              style={{
                flexBasis: "80%",
                paddingLeft: "10px",
                fontSize: "12px",
              }}
            >
              <FormGroup>
                <div className="d-flex">
                  <div
                    type="text"
                    //   placeholder="제목을 입력하세요."
                    style={{
                      width: "575px",
                      height: "30px",
                      backgroundColor: "#fff",
                      padding: "10px",
                      border: "1px solid  #d9d9d9",
                      borderRadius: "5px",
                      display: "flex", // 추가: 플렉스 컨테이너로 설정
                      justifyContent: "center", // 추가: 가로 가운데 정렬
                      alignItems: "center", // 추가: 세로 가운데 정렬
                      marginTop: "-7px",
                    }}
                  >
                    <img src={plusIconNoBackground} alt="Plus Icon" />
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>

          <div
            className="d-flex"
            style={{
              height: "60px",
              paddingTop: "40px",
            }}
          >
            <div
              style={{
                flexBasis: "50%",
                fontSize: "12px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center", // 세로 중앙 정렬을 원할 경우
                paddingRight: "10px",
              }}
            >
              <Button
                color="secondary"
                style={{
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#edeef2",
                  borderColor: "white",
                  color: "black",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
              >
                수정
              </Button>
            </div>
            <div
              style={{
                flexBasis: "50%",
                fontSize: "12px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center", // 세로 중앙 정렬을 원할 경우
                paddingLeft: "10px",
              }}
            >
              <Button
                color="secondary"
                style={{
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#e23465",
                  borderColor: "white",
                  color: "white",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorShCreateComponent;
