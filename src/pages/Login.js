import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../assets/images/lg_bg.png";
import LGLogo from "../assets/images/LGLogo.png";
import LockLine from "../assets/images/lock-line.png";
import UserLine from "../assets/images/user-line.png";
import {
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { FaAngleDown } from "react-icons/fa";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { shouldRenderHeaderState } from "../data/atom";
import { useCookies } from "react-cookie";
import {
  getAllDeptList,
  getCompList,
  getDeptListByCompanyId,
} from "../utils/CodeList";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const sessionStorage = window.sessionStorage;
  const localStorage = window.localStorage;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [contents, setContents] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      navigate("/");
    }
    getQuestionContents();
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleLogin = () => {
    // if (username === "") {
    //   alert("사용자명을 입력해주세요..");
    //   return;
    // }
    // if (password === "") {
    //   alert("비밀번호를 입력해주세요.");
    //   return;
    // }
    // // 로그인 로직 추가
    // axios
    //   .post("/auth/api/login", {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     if (res.data.code === "0000") {
    //       const { accessToken, refreshToken } = res.data.result;

    //       if (isIdChecked) {
    //         // 로그인 상태 유지 체크박스가 체크된 경우, 로컬 스토리지에 저장
    //         localStorage.setItem("accessToken", accessToken);
    //         localStorage.setItem("refreshToken", refreshToken);
    //         localStorage.setItem("username", username);
    //       } else {
    //         // 로그인 상태 유지 체크박스가 체크되지 않은 경우, 세션 스토리지에 저장
    //         sessionStorage.setItem("accessToken", accessToken);
    //         sessionStorage.setItem("refreshToken", refreshToken);
    //         sessionStorage.setItem("username", username);
    //       }
    //       navigate("/");
    //     } else {
    //       alert(res.data.msg);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleIdCheckboxChange = () => {
    setIsIdChecked(!isIdChecked);
  };

  const getQuestionContents = () => {
    axios.get("/admin_setting/api/question").then((res) => {
      if (res.data.code === "0000") {
        setContents(res.data.result.contents);
      }
    });
  };

  return (
    <div style={backgroundStyle}>
      <div>
        <span
          className="LG-Dash-Board"
          style={{
            lineHeight: "1.2",
            textAlign: "center",
            marginBottom: "-20px",
          }}
        >
          <p>
            <img src={LGLogo} />
          </p>
          <p style={{ fontSize: "25px" }}>평택 CSMS 도급사 안전관리 시스템</p>{" "}
          <p style={{ fontWeight: "normal" }}>Constractor Safety Management</p>
        </span>
        <div className="Rectangle-324">
          <Row className="justify-content-center" onKeyDown={handleKeyDown}>
            <FormGroup>
              <Input
                type="text"
                id="username"
                style={{
                  fontFamily: "LGSmart_H",
                  marginTop: "0",
                  marginBottom: "0",
                  background: `url(${UserLine}) no-repeat left center`,
                  backgroundSize: "20px 20px", // 이미지 크기 조절
                  backgroundPosition: "10px center", // 이미지에 padding-left 적용
                  paddingLeft: "40px", // 이미지 오른쪽에 텍스트를 배치할 공간 확보
                }}
                placeholder="업체명을 입력하세요."
                value={username}
                // value={"평택안전보건팀"}
                onChange={(e) => setUsername(e.target.value)}
                // required
                className="Rectangle-327"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                style={{
                  fontFamily: "LGSmart_H",
                  marginTop: "0",
                  marginBottom: "0",
                  background: `url(${LockLine}) no-repeat left center`,
                  backgroundSize: "20px 20px", // 이미지 크기 조절
                  backgroundPosition: "10px center", // 이미지에 padding-left 적용
                  paddingLeft: "40px", // 이미지 오른쪽에 텍스트를 배치할 공간 확보
                }}
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                className="Rectangle-327"
              />
            </FormGroup>
            <FormGroup className="d-flex">
              <div style={{ display: "flex", marginBottom: "-20px" }}>
                <Input
                  type="checkbox"
                  id="idCheckbox"
                  label="ID 체크"
                  checked={isIdChecked}
                  onChange={handleIdCheckboxChange}
                  className="Check_Normal"
                />
                <span
                  htmlFor="idCheckbox"
                  className="Label_Login"
                  onClick={handleIdCheckboxChange}
                  style={{
                    cursor: "default",
                  }}
                >
                  로그인 상태 유지
                </span>
                {/* <div className="Vector-12"></div> */}
                {/* <StyledDiv></StyledDiv>
                  <span
                    className="Label_PWChange"
                    onClick={handlePasswordChange}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      cursor: tooltipVisible ? "default" : "pointer",
                      fontWeight: tooltipVisible ? "bold" : "normal",
                    }}
                  >
                    아이디/비밀번호 찾기
                  </span>
*/}
                {/* 회원가입 버튼 */}
                {/*
                  <span
                    className="Label_Join"
                    onClick={handleSignup}
                    onMouseOver={handleMouseOver1}
                    onMouseLeave={handleMouseLeave1}
                    style={{
                      cursor: tooltipVisible1 ? "default" : "pointer",
                      fontWeight: tooltipVisible1 ? "bold" : "normal",
                    }}
                  >
                    회원가입
                  </span>{" "}
                  */}
              </div>
            </FormGroup>
            <button className="Component-99" onClick={handleLogin}>
              <span className="Login_Label1">로그인</span>
            </button>
            <div
              style={{
                backgroundColor: "#f8f1eb",
                width: "404px",
                height: "91px",
                margin: "5px 5px 16px 6px",
                padding: "10px", // 텍스트 여백 추가
                overflow: "hidden", // 내용이 넘칠 때 잘리도록 설정
                wordWrap: "break-word", // 긴 단어가 있을 때 줄바꿈 처리
                wordBreak: "break-all", // 단어가 박스 크기를 넘길 경우 줄바꿈 처리
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "LGSmart_H",
                  padding: "0 20px 0 20px", // 상하좌우 여백 제거
                }}
              >
                {contents}
              </p>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;

const StyledDiv = styled.div`
  width: 2px;
  height: 14px;
  margin: 1px 0px 23px 22px;
  opacity: 0.3;
  background-color: #8f8f8f;
`;
