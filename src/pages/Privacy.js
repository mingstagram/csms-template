import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/lg_bg.png";
import { Row, Form, FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { shouldRenderHeaderState } from "../data/atom";
import { useCookies } from "react-cookie";
import { getAllDeptList } from "../utils/CodeList";

const Privacy = () => {
  const location = useLocation();
  const { username, departmentId, divisionId, companyId, department } =
    location.state;
  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const [shouldRenderHeader, setShouldRenderHeader] = useAtom(
    shouldRenderHeaderState
  );
  const [allDeptList, setAllDeptList] = useState([]);
  const [formData, setFormData] = useState({
    companyId: companyId,
    divisionId: divisionId,
    departmentId: departmentId,
    department: department,
    username: username,
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    setShouldRenderHeader(false);
    getAllDeptList(setAllDeptList);
  }, []);

  const handleInputChange = (formName, value) => {
    setFormData({
      ...formData,
      [formName]: value,
    });
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const departmentId = parseInt(e.target.value, 10);
    const companyId = selectedOption.getAttribute("data-company-id");
    const divisionId = selectedOption.getAttribute("data-division-id");
    const departmentName = selectedOption.text;

    setFormData({
      ...formData,
      companyId: parseInt(companyId, 10),
      divisionId: parseInt(divisionId, 10),
      departmentId: departmentId,
      department: departmentName,
    });
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } else if (formData.departmentId === 0) {
      alert("부서를 선택해주세요.");
      return;
    } else {
      axios
        .post("/user/api/change_privacy", formData)
        .then((res) => {
          if (res.data.code === "0000") {
            alert("정보변경 완료. 다시 로그인해주세요.");
            sessionStorage.clear();
            // sessionStorage.setItem("username", formData.username);
            // sessionStorage.setItem("divisionId", formData.divisionId);
            // sessionStorage.setItem("companyId", formData.companyId);
            // sessionStorage.setItem("departmentId", formData.departmentId);
            // sessionStorage.setItem("department", formData.department);
            navigate("/");
          } else {
            alert(res.data.msg);
          }
        })
        .catch(() => {});
    }
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
            <span className="Password_Title">비밀번호 변경</span>
            <span className="Pw_Title2" style={{ fontSize: "15.5px" }}>
              LG전자(평택) 위험성평가 관리시스템 비밀번호를 변경해보세요!
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
                      fontFamily: "LGSmart_H",
                    }}
                    required
                    className="Rectangle-Pw2"
                    onChange={(e) => handleSelectChange(e)}
                    value={formData.departmentId}
                    disabled
                  >
                    <option value={0}>전체</option>
                    {allDeptList.map((dept) => (
                      <option
                        key={dept.id}
                        value={dept.id}
                        data-company-id={dept.companyId}
                        data-division-id={dept.divisionId}
                      >
                        {formData.username === "admin"
                          ? "평택안전보건팀"
                          : dept.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="Password_Frame1">
                  <span className="Password_Label2">부서명(아이디)</span>
                  <Input
                    type="text"
                    id="username"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                    }}
                    required
                    className="Rectangle-Pw2"
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    disabled={true} // 폼 비활성화
                    value={
                      formData.username === "admin"
                        ? "평택안전보건팀"
                        : formData.username
                    }
                  ></Input>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="Password_Frame2">
                  <span className="Password_Label2">변경 비밀번호</span>
                  <Input
                    type="password"
                    id="username"
                    required
                    className="Rectangle-Pw1"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  {/* <span className="Password_Label4">
                    * 8자 이상이면서 최소한 숫자 하나와 글자 하나를 포함해야
                    합니다.
                  </span> */}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="Password_Frame3">
                  <span className="Password_Label3">변경 비밀번호 재확인</span>
                  <Input
                    type="password"
                    id="username"
                    required
                    className="Rectangle-Pw1"
                    onChange={(e) =>
                      handleInputChange("passwordConfirm", e.target.value)
                    }
                  />
                  <span className="Password_Label4">
                    * 비밀번호를 다시 입력해주세요.
                  </span>
                </div>
              </FormGroup>
              <button className="Pw_Button1" onClick={handleSignup} block>
                <span className="Pw_Label11">비밀번호 변경하기</span>
              </button>
              <button
                className="Pw_Button2"
                block
                onClick={() => {
                  navigate(-1);
                }}
              >
                <span className="Pw_Label12">이전</span>
              </button>
            </Form>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
