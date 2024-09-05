import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";

const QualificationCreateComponent = () => {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Write_Component">
        <div
          className="d-flex"
          style={{ paddingBottom: "10px", paddingLeft: "10px" }}
        >
          <div className="Rectangle-346"></div>
          <p className="main-sub-title">적격 수급인 선정 평가</p>
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
                  적격 수급인 선정 평가
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
              <span>&#183;</span> 평가시기
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
                  type="text"
                  placeholder="평가시기를 입력하세요."
                />
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "23px 10px",
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
                padding: "10px 10px 0 10px",
                paddingTop: "12px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex" style={{ paddingBottom: "10px" }}>
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
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "26px 10px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 총 평가 점수
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex" style={{ paddingBottom: "10px" }}>
                <Input
                  style={{
                    marginTop: "12px",
                    width: "260px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  type="text"
                  placeholder="점수를 입력하세요."
                />{" "}
                <span
                  style={{
                    margin: "18px 0 0 7px",
                  }}
                >
                  점
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "23px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <span>&#183;</span> 평가항목
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex" style={{ paddingBottom: "10px" }}>
                <Input
                  style={{
                    marginTop: "12px",
                    width: "550px",
                    height: "90px",
                    fontSize: "12px",
                  }}
                  type="textarea"
                  placeholder="평가항목을 입력하세요."
                />{" "}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "23px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <span>&#183;</span> 판단기준
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex" style={{ paddingBottom: "10px" }}>
                <Input
                  style={{
                    marginTop: "12px",
                    width: "550px",
                    height: "90px",
                    fontSize: "12px",
                  }}
                  type="textarea"
                  placeholder="판단기준을 입력하세요."
                />{" "}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div
              style={{
                flexBasis: "20%",
                padding: "23px 10px",
                fontSize: "13px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <span>&#183;</span> 평가내용
            </div>
            <div
              style={{
                flexBasis: "80%",
                padding: "10px",
                paddingTop: "12px",
                fontSize: "12px",
              }}
            >
              <div className="d-flex" style={{ paddingBottom: "10px" }}>
                <Input
                  style={{
                    marginTop: "12px",
                    width: "550px",
                    height: "90px",
                    fontSize: "12px",
                  }}
                  type="textarea"
                  placeholder="평가내용을 입력하세요."
                />{" "}
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ paddingTop: "20px" }}>
            <Button
              style={{
                width: "180px",
                height: "40px",
                padding: "11px 36px 11px 35px",
                backgroundColor: "#439099",
                border: "0px",
                fontSize: "13px",
                marginRight: "150px",
              }}
            >
              점검 세부내용 추가
            </Button>
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
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
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
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationCreateComponent;
