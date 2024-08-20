import React from "react";
import "../../styles/projectStyle.css";
import { Button, Input } from "reactstrap";
import plusIcon from "../../assets/images/plus-icon.png";
import plusIconNoBackground from "../../assets/images/plus-icon-nobackground.png";
import dot3Icon from "../../assets/images/more-2-line.png";
import closeIcon from "../../assets/images/close-fill.png";

const SettingComponent = () => {
  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div className="Setting_Component">
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          관리자 설정
        </span>
        <div className="d-flex">
          <div
            style={{
              flexBasis: "50%",
              height: "83vh",
              paddingTop: "15px",
              borderRight: "1px solid #eaeaea",
            }}
          >
            <div>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">사용자 비밀번호 초기화</p>
              </div>
              <div className="d-flex" style={{ paddingTop: "10px" }}>
                <Input
                  style={{
                    width: "720px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  type="text"
                  placeholder="업체명 (로그인 아이디)을 입력하세요."
                />
                <div style={{ paddingLeft: "10px" }}>
                  <Button
                    style={{
                      width: "100px",
                      height: "30px",
                      backgroundColor: "#439099",
                      color: "white",
                      border: "0px",
                      fontSize: "12px",
                      paddingTop: "8px",
                    }}
                  >
                    초기화
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">관리자 문의내용 관리</p>
              </div>
              <div className="d-flex" style={{ paddingTop: "10px" }}>
                <Input
                  style={{
                    width: "828px",
                    height: "100px",
                    fontSize: "12px",
                  }}
                  type="textarea"
                />
              </div>
            </div>
            <div
              style={{
                paddingTop: "5px",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "30px",
                alignItems: "center", // 세로 정렬을 중앙으로 맞춤
              }}
            >
              <div style={{ flexGrow: 1, marginTop: "-20px" }}>
                <span style={{ fontSize: "10px", color: "#a2845e" }}>
                  ※ 로그인 화면 하단에 표시되는 정보
                </span>
              </div>
              <div>
                <Button
                  style={{
                    width: "100px",
                    height: "30px",
                    backgroundColor: "#439099",
                    color: "white",
                    border: "0px",
                    fontSize: "12px",
                    paddingTop: "8px",
                  }}
                >
                  저장
                </Button>
              </div>
            </div>
            <div style={{ paddingTop: "10px" }}>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">협력사 업무 구분 관리</p>
              </div>
              <div className="d-flex" style={{ paddingTop: "10px" }}>
                <Input
                  style={{
                    width: "260px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  placeholder="업무 구분을 입력하세요."
                />
                <img src={plusIcon} style={{ paddingLeft: "5px" }} />
              </div>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    width: "828px",
                    height: "150px",
                    backgroundColor: "#fff",
                    padding: "20px 30px 20px 30px",
                    border: "1px solid  #d9d9d9",
                    borderRadius: "5px",
                    overflowY: "auto", // 세로 스크롤 추가
                    maxHeight: "150px", // 최대 높이 설정
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
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>지원</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>지원</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>지원</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>지원</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>지원</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>지원</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                  </div>
                </div>
                <div style={{ flexGrow: 1, marginTop: "-2px" }}>
                  <span style={{ fontSize: "10px", color: "#a2845e" }}>
                    ※ 업무 구분 선택하여 이동 시 표시 순서 설정이 가능
                  </span>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">임대설비 관리</p>
              </div>
              <div className="d-flex" style={{ paddingTop: "10px" }}>
                <Input
                  style={{
                    width: "260px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  placeholder="임대설비를 입력하세요."
                />
                <img src={plusIcon} style={{ paddingLeft: "5px" }} />
              </div>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    width: "828px",
                    height: "150px",
                    backgroundColor: "#fff",
                    padding: "20px 30px 20px 30px",
                    border: "1px solid  #d9d9d9",
                    borderRadius: "5px",
                    overflowY: "auto", // 세로 스크롤 추가
                    maxHeight: "150px", // 최대 높이 설정
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
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>임대설비명</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>임대설비명</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>임대설비명</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>임대설비명</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>임대설비명</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>임대설비명</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              flexBasis: "50%",
              height: "83vh",
              paddingLeft: "30px",
            }}
          >
            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">재해유형(위험요인) 관리</p>
              </div>
              <div className="d-flex" style={{ paddingTop: "10px" }}>
                <Input
                  style={{
                    width: "260px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  placeholder="재해유형(위험요인)을 입력하세요."
                />
                <img src={plusIcon} style={{ paddingLeft: "5px" }} />
              </div>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    width: "828px",
                    height: "230px",
                    backgroundColor: "#fff",
                    padding: "20px 30px 20px 30px",
                    border: "1px solid  #d9d9d9",
                    borderRadius: "5px",
                    overflowY: "auto", // 세로 스크롤 추가
                    maxHeight: "230px", // 최대 높이 설정
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
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>추락/떨어짐</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>추락/떨어짐</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                    {/* 데이터 반복 구간 시작 */}
                    <div
                      className="d-flex"
                      style={{ padding: "0 70px 10px 30px" }}
                    >
                      <div className="d-flex _Work_stac">
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={dot3Icon} />{" "}
                        </div>
                        <div
                          style={{
                            flexBasis: "80%",
                            margin: "-5px 0 0 3px",
                            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>추락/떨어짐</span>
                        </div>
                        <div style={{ flexBasis: "10%", marginTop: "-5px" }}>
                          <img src={closeIcon} />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#222",
                          padding: "5px 0 0 5px",
                        }}
                      >
                        수정
                      </span>
                    </div>
                    {/* 데이터 반복 구간 종료 */}
                  </div>
                </div>
                <div style={{ flexGrow: 1, marginTop: "-2px" }}>
                  <span style={{ fontSize: "10px", color: "#a2845e" }}>
                    ※ 업무 구분 선택하여 이동 시 표시 순서 설정이 가능
                  </span>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">
                  대여기계 안전보건조치 확인서 샘플파일 관리
                </p>
              </div>
              <div
                className="d-flex"
                style={{
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    flexBasis: "10%",
                    paddingLeft: "2px",
                    fontSize: "12px",
                    paddingTop: "7px",
                    paddingLeft: "10px",
                    color: "#666",
                  }}
                >
                  <span>&#183;</span> 등록 파일
                </div>
                <div
                  style={{
                    flexBasis: "90%",
                    paddingLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div className="d-flex">
                    <Input
                      style={{
                        width: "735px",
                        height: "30px",
                        fontSize: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex"
                style={{
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    flexBasis: "10%",
                    paddingLeft: "2px",
                    fontSize: "12px",
                    paddingTop: "7px",
                    paddingLeft: "10px",
                    color: "#666",
                  }}
                >
                  <span>&#183;</span> 파일 변경
                </div>
                <div
                  style={{
                    flexBasis: "90%",
                    paddingLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        width: "735px",
                        height: "30px",
                        backgroundColor: "#fff",
                        padding: "10px",
                        border: "1px solid  #d9d9d9",
                        borderRadius: "5px",
                        display: "flex", // 추가: 플렉스 컨테이너로 설정
                        justifyContent: "center", // 추가: 가로 가운데 정렬
                        alignItems: "center", // 추가: 세로 가운데 정렬
                      }}
                    >
                      <img src={plusIconNoBackground} alt="Plus Icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    paddingTop: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "2px",
                    alignItems: "center", // 세로 정렬을 중앙으로 맞춤
                  }}
                >
                  <div style={{ flexGrow: 1, marginTop: "-20px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#a2845e",
                        paddingLeft: "10px",
                      }}
                    >
                      ※ 산업안전보건법 {">"} 임대설비 현황 샘플파일 다운로드
                      파일로 관리
                    </span>
                  </div>
                  <div>
                    <Button
                      style={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: "#439099",
                        color: "white",
                        border: "0px",
                        fontSize: "12px",
                        paddingTop: "8px",
                      }}
                    >
                      저장
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex" style={{ marginRight: "20px" }}>
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">
                  안전보건관리체계 구축 샘플파일 관리
                </p>
              </div>
              <div
                className="d-flex"
                style={{
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    flexBasis: "10%",
                    paddingLeft: "2px",
                    fontSize: "12px",
                    paddingTop: "7px",
                    paddingLeft: "10px",
                    color: "#666",
                  }}
                >
                  <span>&#183;</span> 등록 파일
                </div>
                <div
                  style={{
                    flexBasis: "90%",
                    paddingLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div className="d-flex">
                    <Input
                      style={{
                        width: "735px",
                        height: "30px",
                        fontSize: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex"
                style={{
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    flexBasis: "10%",
                    paddingLeft: "2px",
                    fontSize: "12px",
                    paddingTop: "7px",
                    paddingLeft: "10px",
                    color: "#666",
                  }}
                >
                  <span>&#183;</span> 파일 변경
                </div>
                <div
                  style={{
                    flexBasis: "90%",
                    paddingLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div className="d-flex">
                    <div
                      style={{
                        width: "735px",
                        height: "30px",
                        backgroundColor: "#fff",
                        padding: "10px",
                        border: "1px solid  #d9d9d9",
                        borderRadius: "5px",
                        display: "flex", // 추가: 플렉스 컨테이너로 설정
                        justifyContent: "center", // 추가: 가로 가운데 정렬
                        alignItems: "center", // 추가: 세로 가운데 정렬
                      }}
                    >
                      <img src={plusIconNoBackground} alt="Plus Icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    paddingTop: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "2px",
                    alignItems: "center", // 세로 정렬을 중앙으로 맞춤
                  }}
                >
                  <div style={{ flexGrow: 1, marginTop: "-20px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#a2845e",
                        paddingLeft: "10px",
                      }}
                    >
                      ※ 중대재해법 {">"} 안전관리체계구축 샘플파일 다운로드
                      파일로 관리
                    </span>
                  </div>
                  <div>
                    <Button
                      style={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: "#439099",
                        color: "white",
                        border: "0px",
                        fontSize: "12px",
                        paddingTop: "8px",
                      }}
                    >
                      저장
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
