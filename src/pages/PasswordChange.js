import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/lg_bg.png";
import { Row, Form, FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { shouldRenderHeaderState } from "../data/atom";
import { useCookies } from "react-cookie";
import { getAllDeptList } from "../utils/CodeList";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [shouldRenderHeader, setShouldRenderHeader] = useAtom(
    shouldRenderHeaderState
  );
  const [allDeptList, setAllDeptList] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    prevPassword: "",
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

  const handlePwChange = (event) => {
    event.preventDefault();
    axios
      .post("/user/api/pwchange", formData)
      .then((res) => {
        if (res.data.code === "0000") {
          alert("비밀번호 변경 완료");
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
      <div>
        <div className="Password_Box" style={{ height: "730px" }}>
          <Row className="justify-content-center">
            <span className="Password_Title">비밀번호 변경</span>
            <span className="Pw_Title2" style={{ fontSize: "15.5px" }}>
              LG전자(평택) 위험성평가 관리시스템 비밀번호를 변경해보세요!
            </span>
            <Form>
              <FormGroup>
                <div className="Password_Frame1">
                  <span className="Password_Label2">부서명(아이디)</span>
                  <Input
                    type="select"
                    id="departmentId"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H-Regular",
                    }}
                    required
                    className="Rectangle-Pw2"
                    // onChange={(e) => handleSelectChange(e)}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  >
                    <option value={0}>전체</option>
                    {allDeptList.map((dept) => (
                      <option
                        key={dept.id}
                        value={dept.name}
                        data-company-id={dept.companyId}
                        data-division-id={dept.divisionId}
                      >
                        {dept.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </FormGroup>
              {/* <FormGroup>
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
                    className="Rectangle-Pw2"
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  ></Input>
                </div>
              </FormGroup> */}
              <FormGroup>
                <div className="Password_Frame2">
                  <span className="Password_Label2">이전 비밀번호</span>
                  <Input
                    type="password"
                    id="username"
                    required
                    className="Rectangle-Pw1"
                    onChange={(e) =>
                      handleInputChange("prevPassword", e.target.value)
                    }
                  />
                  {/* <span className="Password_Label4">
                    * 8자 이상이면서 최소한 숫자 하나와 글자 하나를 포함해야
                    합니다.
                  </span> */}
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
              <button className="Pw_Button1" onClick={handlePwChange} block>
                <span className="Pw_Label11">비밀번호 변경하기</span>
              </button>
              <button
                className="Pw_Button2"
                block
                onClick={() => {
                  navigate("/");
                }}
              >
                <span className="Pw_Label12">이전 화면</span>
              </button>
            </Form>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
