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
  const [username, setUsername] = useState("");
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUsername"]);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [allDeptList, setAllDeptList] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const departmentSelectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // Select 박스 열림 여부 상태
  const [isDisabled, setIsDisabled] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [headquarters, setHeadquarters] = useState(""); // 현재 선택된 본부
  // const listRef = useRef(null);

  const [shouldRenderHeader, setShouldRenderHeader] = useAtom(
    shouldRenderHeaderState
  );

  // const adminDept = {
  //   id: 1,
  //   companyId: 1,
  //   divisionId: 1,
  //   name: "평택안전보건팀",
  //   isDeleted: "N"
  // }

  useEffect(() => {
    setShouldRenderHeader(false);
    getCompList({ setCompanyList });
    getAllDeptList(setAllDeptList);
    if (cookies.rememberUsername !== undefined) {
      setUsername(cookies.rememberUsername);
      setIsIdChecked(true);
    }

    getDeptListByCompanyId({
      selectedCompanyId: companyId,
      setSelectedDepartmentList: setDepartmentList,
    });

    if (companyId === "admin") {
      setUsername("평택안전보건팀(관리자)");
      setIsDisabled(true);
    } else {
      setUsername("");
      setIsDisabled(false);
    }

    // if (username === "") {
    //   setFilteredDepts([]);
    //   setIsOpen(false); // 입력값이 비어 있을 때 드롭다운 닫기
    // }
  }, [companyId, companyName]);

  const [tooltipVisible, setTooltipVisibility] = useState(false);
  const handleMouseOver = () => {
    setTooltipVisibility(true);
  };
  const handleMouseLeave = () => {
    setTooltipVisibility(false);
  };

  const [tooltipVisible1, setTooltipVisibility1] = useState(false);
  const handleMouseOver1 = () => {
    setTooltipVisibility1(true);
  };
  const handleMouseLeave1 = () => {
    setTooltipVisibility1(false);
  };

  const [tooltipVisible2, setTooltipVisibility2] = useState(false);
  const handleMouseOver2 = () => {
    setTooltipVisibility2(true);
  };
  const handleMouseLeave2 = () => {
    setTooltipVisibility2(false);
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // if (username === "") {
    //   alert("부서를 선택해주세요.");
    //   return;
    // }
    // if (companyId === "") {
    //   alert("담당를 선택해주세요.");
    //   return;
    // }
    // 로그인 로직 추가
    // axios
    //   .post("/user/api/login", {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     if (res.data.code === "0000") {
    //       sessionStorage.setItem("username", res.data.result.username);
    //       sessionStorage.setItem("department", res.data.result.departmentName);
    //       sessionStorage.setItem("departmentId", res.data.result.departmentId);
    //       sessionStorage.setItem("divisionId", res.data.result.divisionId);
    //       if (username === "admin") {
    //         sessionStorage.setItem("companyId", companyId);
    //       } else {
    //         sessionStorage.setItem("companyId", res.data.result.companyId);
    //       }
    //       sessionStorage.setItem("authority", res.data.result.authority);
    //       sessionStorage.setItem("midAuthority", res.data.result.midAuthority);
    //       setShouldRenderHeader(true);
    //       if (isIdChecked) {
    //         setCookie("rememberUsername", username);
    //       } else {
    //         removeCookie("rememberUsername");
    //       }
    //       // navigate("/dashboard");
    //       window.location.href = "/dashboard";
    //     } else {
    //       alert(res.data.msg);
    //     }
    //   })
    //   .catch(() => {});
    navigate("/dashboard");
  };

  const handleIdCheckboxChange = () => {
    setIsIdChecked(!isIdChecked);
  };

  const handlePasswordChange = () => {
    navigate("/pwchange");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value) {
      const filtered = departmentList.filter((dept) =>
        dept.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDepts(filtered);
      setIsOpen(true); // 입력값 변경 시 드롭다운 표시
    } else {
      setFilteredDepts([]);
      setIsOpen(false); // 입력값이 비어 있을 때 드롭다운 닫기
    }
  };

  const handleDeptClick = (deptName) => {
    setUsername(deptName);
    setFilteredDepts([]);
    setIsOpen(false); // 아이템 선택 시 Select 박스 닫기
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFilteredDepts(departmentList);
  };

  const handleCompanyChange = (e) => {
    setCompanyId(e.target.value);
    setCompanyName(e.target.name);
    if (departmentSelectRef.current) {
      departmentSelectRef.current.selectedIndex = 0;
    }
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
          <Row className="justify-content-center">
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Input
                  type="password"
                  id="password"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    onMouseOver={handleMouseOver2}
                    onMouseLeave={handleMouseLeave2}
                    style={{
                      cursor: tooltipVisible2 ? "default" : "pointer",
                      fontWeight: tooltipVisible2 ? "bold" : "normal",
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
              <button className="Component-99" block>
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
                  시스템 이용을 위해서는 협력사 등록이 필요하며 문의사항은
                  관리자에게 연락해 주시기 바랍니다. <br />- 평택안전보건팀
                  황동호 선임
                </p>
              </div>
            </Form>
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
