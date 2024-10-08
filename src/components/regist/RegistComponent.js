import React, { useState } from "react";
import "../../styles/projectStyle.css";
import plusIconNoBackground from "../../assets/images/plus-icon-nobackground.png";
import closeIcon from "../../assets/images/close-fill.png";
import { Button, FormGroup, Input, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerCustom from "../common/DatePickerCustom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const RegistComponent = () => {
  const navigate = useNavigate();
  const localStorage = window.localStorage;
  const sessionStorage = window.sessionStorage;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedRadioGroup, setSelectedRadioGroup] = useState(null);
  const [customInputValue, setCustomInputValue] = useState("");
  const storageUsername =
    localStorage.getItem("username") || sessionStorage.getItem("username");

  const [formData, setFormData] = useState({
    category: null,
    calendarDisplay: "N",
    calendarStartDate: startDate,
    calendarEndDate: endDate,
    dateAndTime: null,
    location: null,
    title: null,
    author: storageUsername,
    content: null,
  });

  const handleMainChange = (value) => {
    setSelectedMain(value);
    // 메인 구분이 변경될 때 라디오 그룹 초기화
    setSelectedRadioGroup(null);
  };

  const handleRadioGroupChange = (value) => {
    setSelectedRadioGroup(value);
    if (value === "custom") {
    } else {
      setCustomInputValue("");
      handleInputChange("category", value);
    }
  };

  const handleInputChange = (formName, value) => {
    if (formName === "calendarDisplay") {
      setStartDate(null);
      setEndDate(null);
    }
    setFormData({
      ...formData,
      [formName]: value,
    });
  };

  const handleRegist = () => {
    console.log(formData);
    if (formData.category === null) {
      alert("분류를 직접 입력해주세요.");
      return;
    }
    axios
      .post(`/regist/api/${selectedMain}`, formData)
      .then((res) => {
        if (res.data.code === "0000") {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCustomInputChange = (e) => {
    setCustomInputValue(e.target.value);
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleStartDateInputChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    setStartDate(formattedDate);
    setFormData({
      ...formData,
      calendarStartDate: formattedDate,
    });
  };

  const handleEndDateInputChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    const today = new Date();
    if (startDate > formattedDate) {
      alert("시작날짜 이전을 선택할 수 없습니다.");
      return;
    }
    setEndDate(formattedDate);
    setFormData({
      ...formData,
      calendarEndDate: formattedDate,
    });
  };

  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Write_Component">
        <div className="d-flex">
          <div className="Rectangle-346"></div>
          <p className="main-sub-title">게시물 등록</p>
        </div>
        <div className="Write_Component1">
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
                <div className="d-flex" style={{ paddingTop: "10px" }}>
                  <span style={{ flexBasis: "30%" }}>
                    <Input
                      type="radio"
                      name="radioGroup1"
                      onChange={() => handleMainChange("notice")}
                    />{" "}
                    메인 {">"} 공지사항
                  </span>
                  <span style={{ flexBasis: "30%" }}>
                    <Input
                      type="radio"
                      name="radioGroup1"
                      onChange={() => handleMainChange("board")}
                    />{" "}
                    메인 {">"} 게시판
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              paddingTop: "18px",
              height: "104px",
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
                {/* selectedMain이 null인 경우 텍스트 표시 */}
                {selectedMain === null && (
                  <div
                    style={{
                      paddingTop: "12px",
                      color: "#999",
                      fontSize: "14px",
                    }}
                  >
                    구분을 선택해주세요.
                  </div>
                )}
                {/* 공지사항이 선택된 경우 */}
                {selectedMain === "notice" && (
                  <div>
                    <div className="d-flex" style={{ paddingTop: "12px" }}>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "공모전"}
                          onChange={() => handleRadioGroupChange("공모전")}
                        />{" "}
                        공모전
                      </span>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "지침"}
                          onChange={() => handleRadioGroupChange("지침")}
                        />{" "}
                        지침
                      </span>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "안내"}
                          onChange={() => handleRadioGroupChange("안내")}
                        />{" "}
                        안내
                      </span>
                      <span style={{ flexBasis: "40%", display: "flex" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "custom"}
                          onChange={(e) => handleRadioGroupChange("custom")}
                        />{" "}
                        <Input
                          type="text"
                          placeholder="직접입력"
                          value={customInputValue}
                          onChange={handleCustomInputChange}
                          disabled={!(selectedRadioGroup === "custom")}
                          style={{
                            height: "30px",
                            width: "180px",
                            marginLeft: "10px",
                            fontSize: "12px",
                            marginTop: "-7px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                )}
                {/* 게시판이 선택된 경우 */}
                {selectedMain === "board" && (
                  <div>
                    <div className="d-flex" style={{ paddingTop: "12px" }}>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "요청"}
                          onChange={() => handleRadioGroupChange("요청")}
                        />{" "}
                        요청
                      </span>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "점검"}
                          onChange={() => handleRadioGroupChange("점검")}
                        />{" "}
                        점검
                      </span>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "협의체"}
                          onChange={() => handleRadioGroupChange("협의체")}
                        />{" "}
                        협의체
                      </span>
                      <span style={{ flexBasis: "20%" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "교육"}
                          onChange={() => handleRadioGroupChange("교육")}
                        />{" "}
                        교육
                      </span>
                      <span style={{ flexBasis: "40%", display: "flex" }}>
                        <Input
                          type="radio"
                          name="radioGroup"
                          checked={selectedRadioGroup === "custom"}
                          onChange={() => handleRadioGroupChange("custom")}
                        />{" "}
                        <Input
                          type="text"
                          placeholder="직접입력"
                          value={customInputValue}
                          onChange={handleCustomInputChange}
                          disabled={!(selectedRadioGroup === "custom")}
                          style={{
                            height: "30px",
                            width: "180px",
                            marginLeft: "10px",
                            fontSize: "12px",
                            marginTop: "-7px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              paddingTop: "20px",
              height: "60px",
              borderBottom: "1px solid #d9d9d9",
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
              <span>&#183;</span> 캘린더(일정) 표시 선택
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
                  <span style={{ flexBasis: "30%", display: "flex" }}>
                    <Input
                      type="select"
                      style={{
                        height: "30px",
                        width: "130px",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                      onChange={(e) => {
                        handleInputChange("calendarDisplay", e.target.value);
                      }}
                    >
                      <option key={"N"} value={"N"}>
                        미표시
                      </option>
                      <option key={"Y"} value={"Y"}>
                        표시
                      </option>
                    </Input>
                  </span>
                  <span
                    style={{
                      flexBasis: "70%",
                      display: "flex",
                      fontSize: "12px",
                    }}
                  >
                    <div className="d-flex">
                      <div>
                        <span>&#183;</span> 표시 날짜 시간 선택
                      </div>
                      <div
                        style={{
                          height: "30px",
                          width: "130px",
                          fontSize: "12px",
                          marginTop: "-7px",
                          marginLeft: "17px",
                        }}
                      >
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleStartDateInputChange(date)}
                          //   className="form-control custom-date-picker"
                          customInput={<DatePickerCustom />}
                          dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
                          disabled={formData.calendarDisplay === "N"}
                        />
                      </div>
                      <div
                        style={{
                          height: "30px",
                          width: "130px",
                          fontSize: "12px",
                          marginTop: "-7px",
                          marginLeft: "15px",
                        }}
                      >
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => handleEndDateInputChange(date)}
                          //   className="form-control custom-date-picker"
                          customInput={<DatePickerCustom />}
                          dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
                          disabled={formData.calendarDisplay === "N"}
                        />
                      </div>
                    </div>
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
              borderBottom: "1px solid #d9d9d9",
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
              <span>&#183;</span> 일시
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
                  <span style={{ flexBasis: "40%", display: "flex" }}>
                    <Input
                      type="text"
                      placeholder="일시를 입력하세요."
                      style={{
                        height: "30px",
                        width: "180px",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                      onChange={(e) => {
                        handleInputChange("dateAndTime", e.target.value);
                      }}
                    />
                  </span>
                  <span
                    style={{
                      flexBasis: "60%",
                      display: "flex",
                      fontSize: "12px",
                    }}
                  >
                    <div className="d-flex">
                      <div>
                        <span>&#183;</span> 장소
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="장소를 입력하세요."
                          style={{
                            height: "30px",
                            width: "180px",
                            fontSize: "12px",
                            marginTop: "-7px",
                            marginLeft: "17px",
                          }}
                          onChange={(e) => {
                            handleInputChange("location", e.target.value);
                          }}
                        />
                      </div>
                    </div>
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
                      onChange={(e) => {
                        handleInputChange("title", e.target.value);
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
              height: "100px",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "30px 10px",
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
                        height: "90px",
                        width: "575px",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                      onChange={(e) => {
                        handleInputChange("content", e.target.value);
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
              borderBottom: "1px solid #d9d9d9",
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
              <span>&#183;</span> 대상업체
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
                      type="select"
                      style={{
                        height: "30px",
                        width: "180px",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                    >
                      <option key={0} value={0}>
                        업체명 선택
                      </option>
                    </Input>
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              height: "60px",
            }}
          >
            <div
              style={{
                flexBasis: "20%",
                padding: "20px 10px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              <span>&#183;</span> 선택업체
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
                    style={{
                      width: "575px",
                      height: "50px",
                      backgroundColor: "#fff",
                      padding: "10px",
                      border: "1px solid  #d9d9d9",
                      borderRadius: "5px",
                      // overflowY: "auto", // 세로 스크롤 추가
                      maxHeight: "50px", // 최대 높이 설정
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{
                        flexWrap: "wrap",
                      }}
                    >
                      {/* 데이터 반복 구간 시작 */}
                      <div
                        className="d-flex"
                        style={{ padding: "0 20px 10px 30px" }}
                      >
                        <div className="d-flex _Work_stac">
                          <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                            {" "}
                          </div>
                          <div
                            style={{
                              flexBasis: "80%",
                              margin: "0px 0 0 3px",
                              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                            }}
                          >
                            <span style={{ fontSize: "11px" }}>업체명</span>
                          </div>
                          <div style={{ flexBasis: "10%" }}>
                            <img src={closeIcon} />
                          </div>
                        </div>
                      </div>
                      {/* 데이터 반복 구간 종료 */}
                      {/* 데이터 반복 구간 시작 */}
                      <div
                        className="d-flex"
                        style={{ padding: "0 20px 10px 30px" }}
                      >
                        <div className="d-flex _Work_stac">
                          <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                            {" "}
                          </div>
                          <div
                            style={{
                              flexBasis: "80%",
                              margin: "0px 0 0 3px",
                              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                            }}
                          >
                            <span style={{ fontSize: "11px" }}>업체명</span>
                          </div>
                          <div style={{ flexBasis: "10%" }}>
                            <img src={closeIcon} />
                          </div>
                        </div>
                      </div>
                      {/* 데이터 반복 구간 종료 */}
                      {/* 데이터 반복 구간 시작 */}
                      <div
                        className="d-flex"
                        style={{ padding: "0 20px 10px 30px" }}
                      >
                        <div className="d-flex _Work_stac">
                          <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                            {" "}
                          </div>
                          <div
                            style={{
                              flexBasis: "80%",
                              margin: "0px 0 0 3px",
                              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                            }}
                          >
                            <span style={{ fontSize: "11px" }}>업체명</span>
                          </div>
                          <div style={{ flexBasis: "10%" }}>
                            <img src={closeIcon} />
                          </div>
                        </div>
                      </div>
                      {/* 데이터 반복 구간 종료 */}
                    </div>
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
                onClick={() => {
                  navigate(-1);
                }}
              >
                이전
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
                onClick={handleRegist}
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

export default RegistComponent;
