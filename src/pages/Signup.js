import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/lg_bg.png";
import { Row, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { shouldRenderHeaderState } from "../data/atom";
import { getAllDeptList } from "../utils/CodeList";

const Signup = () => {
  const navigate = useNavigate();
  const [shouldRenderHeader, setShouldRenderHeader] = useAtom(
    shouldRenderHeaderState
  );
  const [allDeptList, setAllDeptList] = useState([]);
  const [formData, setFormData] = useState({
    companyId: 0,
    divisionId: 0,
    departmentId: 0,
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [username, setUsername] = useState("");

  const handleDepartmentSelectChange = (e) => {
    const selectedDeptName = e.target.options[e.target.selectedIndex].text;
    setSelectedDepartment(selectedDeptName);
    setUsername(selectedDeptName); // 부서명을 아이디에 입력

    const selectedOption = e.target.options[e.target.selectedIndex];
    const departmentId = parseInt(e.target.value, 10);
    const companyId = selectedOption.getAttribute("data-company-id");
    const divisionId = selectedOption.getAttribute("data-division-id");

    setFormData({
      ...formData,
      companyId: parseInt(companyId, 10),
      divisionId: parseInt(divisionId, 10),
      departmentId: departmentId,
      username: selectedDeptName,
    });
  };

  useEffect(() => {
    setShouldRenderHeader(false);
    getAllDeptList(setAllDeptList);
  }, []);

  // const handleUsernameChange = (e) => {
  //   const value = e.target.value;
  //   setFormData({
  //     ...formData,
  //     username: value,
  //   });
  // };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      password: value,
    });
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      passwordConfirm: value,
    });
  };

  // const handleDepartmentSelectChange = (e) => {
  //   const selectedOption = e.target.options[e.target.selectedIndex];
  //   const departmentId = parseInt(e.target.value, 10);
  //   const companyId = selectedOption.getAttribute("data-company-id");
  //   const divisionId = selectedOption.getAttribute("data-division-id");

  //   setFormData({
  //     ...formData,
  //     companyId: parseInt(companyId, 10),
  //     divisionId: parseInt(divisionId, 10),
  //     departmentId: departmentId,
  //   });
  // };

  const handleSignup = (event) => {
    event.preventDefault();
    const { username, password, passwordConfirm, departmentId } = formData;

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (departmentId === 0) {
      alert("부서를 선택해주세요.");
      return;
    }

    if (username.length === 0) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (username.length < 5) {
      alert("아이디는 5자 이상 입력해주세요.");
      return;
    }

    if (password.length === 0 || passwordConfirm.length === 0) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    axios
      .post("/user/api/signup", formData)
      .then((res) => {
        if (res.data.code === "0000") {
          alert(
            "회원가입이 신청이 완료됬습니다. 관리자승인 이후에 이용가능합니다."
          );
          navigate("/");
        } else {
          alert(res.data.msg);
        }
      })
      .catch(() => {});
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

  return (
    <div style={backgroundStyle}>
      <style>
        {`
          /* 크롬 브라우저에서 스크롤바 스타일을 지정합니다. */
          ::-webkit-scrollbar {
            width: 5px; /* 스크롤바의 너비를 조절합니다. */
          }

          ::-webkit-scrollbar-thumb {
            background-color: #bababa; /* 스크롤바의 색상 */
            border-radius: 3px; /* 스크롤바의 둥근 경계를 조절합니다. */
          }

          ::-webkit-scrollbar-track {
            background-color: #f8f9fa; /* 스크롤바 트랙의 색상 */
            border-radius: 3px; /* 스크롤바 트랙의 둥근 경계를 조절합니다. */
          }
        `}
      </style>
      <div>
        <div className="Password_Box">
          <Row className="justify-content-center">
            <span className="Password_Title">환영합니다!</span>
            <span className="Pw_Title2">
              LG 디지털파크 RAMS 회원가입을 시작해보세요.
            </span>
            <Form>
              <FormGroup>
                <div className="Password_Frame1">
                  <span className="Password_Label2">부서명</span>
                  <Input
                    type="select"
                    id="departmentId"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H-Regular",
                    }}
                    required
                    className="Rectangle-Pw2"
                    onChange={handleDepartmentSelectChange}
                  >
                    <option value={0}>전체</option>
                    {allDeptList.map((dept) => (
                      <option
                        key={dept.id}
                        value={dept.id}
                        data-company-id={dept.companyId}
                        data-division-id={dept.divisionId}
                      >
                        {dept.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="Password_Frame1">
                  <span className="Password_Label2">아이디</span>
                  <Input
                    type="text"
                    id="username"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H-Regular",
                    }}
                    required
                    value={username}
                    className="Rectangle-Pw2"
                    // onChange={handleUsernameChange}
                    disabled
                  ></Input>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="Password_Frame2">
                  <span className="Password_Label2">비밀번호</span>
                  <Input
                    type="password"
                    id="username"
                    required
                    className="Rectangle-Pw1"
                    onChange={handlePasswordChange}
                  />
                  {/* <span className="Password_Label4">
                    * 8자 이상이면서 최소한 숫자 하나와 글자 하나를 포함해야
                    합니다.
                  </span> */}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="Password_Frame3">
                  <span className="Password_Label3">비밀번호 재확인</span>
                  <Input
                    type="password"
                    id="username"
                    required
                    className="Rectangle-Pw1"
                    onChange={handlePasswordConfirmChange}
                  />
                  <span className="Password_Label4">
                    * 비밀번호를 다시 입력해주세요.
                  </span>
                </div>
              </FormGroup>
              <button className="Pw_Button1" onClick={handleSignup} block>
                <span className="Pw_Label11">회원가입</span>
              </button>
              <button
                className="Pw_Button2"
                block
                onClick={() => {
                  navigate("/");
                }}
              >
                <span className="Pw_Label12">메인으로</span>
              </button>
            </Form>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Signup;
