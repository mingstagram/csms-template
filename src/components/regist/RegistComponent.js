import React, { useState } from "react";
import "../../styles/projectStyle.css";
import plusIconNoBackground from "../../assets/images/plus-icon-nobackground.png";
import closeIcon from "../../assets/images/close-fill.png";
import { Button, FormGroup, Input, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerCustom from "../common/DatePickerCustom";

const RegistComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
                <div className="d-flex" style={{ paddingBottom: "10px" }}>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup1" /> 메인 {">"}{" "}
                    공지사항
                  </span>
                  <span style={{ flexBasis: "40%" }}>
                    <Input type="radio" name="radioGroup1" /> 산업안전보건법{" "}
                    {">"} 협의체 자료 <span>&#183;</span> 결과
                  </span>
                  <span style={{ flexBasis: "40%" }}>
                    <Input type="radio" name="radioGroup1" /> 중대재해처벌법{" "}
                    {">"} 적격 수급인 선정 평가
                  </span>
                </div>
                <div className="d-flex">
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup1" /> 메인 {">"} 게시판
                  </span>
                  <span style={{ flexBasis: "40%" }}>
                    <Input type="radio" name="radioGroup1" />
                    산업안전보건법 {">"} 개선제안
                    <span>&#183;</span> 아차사고
                  </span>
                  <span style={{ flexBasis: "40%" }}>
                    <Input type="radio" name="radioGroup1" /> 중대재해처벌법{" "}
                    {">"} 안전보건관리체계 구축
                  </span>
                </div>
              </FormGroup>
            </div>
          </div>
          <div
            className="d-flex"
            style={{
              paddingTop: "18px",
              height: "109px",
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
                <div className="d-flex" style={{ paddingBottom: "20px" }}>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 요청
                  </span>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 점검
                  </span>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 협의체
                  </span>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 교육
                  </span>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 해당사항 없음
                  </span>
                </div>
                <div className="d-flex">
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 공모전
                  </span>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 지침
                  </span>
                  <span style={{ flexBasis: "20%" }}>
                    <Input type="radio" name="radioGroup" /> 안내
                  </span>
                  <span style={{ flexBasis: "40%", display: "flex" }}>
                    <Input type="radio" name="radioGroup" />{" "}
                    <Input
                      type="text"
                      placeholder="직접입력"
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
                    >
                      <option key={0} value={0}>
                        표지선택
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
                          onChange={(date) => setStartDate(date)}
                          //   className="form-control custom-date-picker"
                          customInput={<DatePickerCustom />}
                          dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
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
                          onChange={(date) => setEndDate(date)}
                          //   className="form-control custom-date-picker"
                          customInput={<DatePickerCustom />}
                          dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
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

export default RegistComponent;
