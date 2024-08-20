import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../../components/dashboard/SalesChart";
import Feeds from "../../components/dashboard/Feeds";
import ProjectTables from "../../components/dashboard/ProjectTable";
import TopCards from "../../components/dashboard/TopCards";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { styled } from "styled-components";
import DonutCards from "../../components/dashboard/DonutCards";
import axios from "axios";
import closeBtn from "../../assets/images/close-fill@2x.png";

const LeftContents = ({ filter, setFilter }) => {
  const [tooltipVisible, setTooltipVisible] = useState({});
  const hoverTimeouts = useRef({}); // 각 카드별 타이머를 관리하는 객체
  const [harmfulFilter, setHarmfulFilter] = useState({
    ...filter,
  });
  const [grade1List, setGrade1List] = useState([]);
  const [grade2List, setGrade2List] = useState([]);
  const [grade3List, setGrade3List] = useState([]);
  const [grade4List, setGrade4List] = useState([]);
  const [grade5List, setGrade5List] = useState([]);
  const [levelByCompany, SetLevelByCompany] = useState([]);

  const handleMouseOver = (companyId) => {
    // 기존 타이머가 있으면 취소
    if (hoverTimeouts.current[companyId]) {
      clearTimeout(hoverTimeouts.current[companyId]);
    }

    setTooltipVisible({}); // 모든 툴팁을 초기화

    // 500ms 후에 툴팁을 표시
    hoverTimeouts.current[companyId] = setTimeout(() => {
      getHarmfulClassificationByCompany({ companyId });
      setTooltipVisible((prevTooltipVisible) => ({
        ...prevTooltipVisible,
        [companyId]: true,
      }));
    }, 100);
  };

  const handleMouseLeave = (companyId) => {
    // 마우스가 카드에서 떠날 때 타이머를 취소
    if (hoverTimeouts.current[companyId]) {
      clearTimeout(hoverTimeouts.current[companyId]);
    }
    setTooltipVisible((prevTooltipVisible) => ({
      ...prevTooltipVisible,
      [companyId]: false,
    }));
  };

  useEffect(() => {
    getLevelData();
  }, [filter]);

  // 본부별 위험요인 리스트
  const getHarmfulClassificationByCompany = ({ companyId }) => {
    axios
      .post("/admin/api/find_disaster_type_company", {
        harmfulFilter,
        searchYear: filter.searchYear,
        companyId: companyId,
      })
      .then((res) => {
        if (res.data.code === "0000") {
          // 등급별로 데이터 분리
          setGrade1List(res.data.result.grade1);
          setGrade2List(res.data.result.grade2);
          setGrade3List(res.data.result.grade3);
          setGrade4List(res.data.result.grade4);
          setGrade5List(res.data.result.grade5);
          // setHarmfulClassficationCompanyList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const getLevelData = () => {
    axios
      .post("/admin/api/find_level_by_company", filter)
      .then((res) => {
        if (res.data.code === "0000") {
          SetLevelByCompany(res.data.result);
        }
      })
      .catch(() => {});
  };

  const handleClose = (companyId) => {
    setTooltipVisible({ ...tooltipVisible, [companyId]: false });
  };

  return (
    <div>
      <Row>
        <Col>
          {levelByCompany.map((company, index) => (
            <div
              key={index}
              onMouseOver={() => handleMouseOver(company.companyId)}
              onMouseLeave={() => handleMouseLeave(company.companyId)}
            >
              <DonutCards
                levelByCompany={company}
                onCardClick={() => {
                  setFilter({
                    ...filter,
                    companyId: company.companyId,
                    pageNum: 1,
                  });
                }}
                filter={filter}
              />
              {tooltipVisible[company.companyId] && (
                <div
                  style={{
                    position: "absolute",
                    transform: "translate(-52%, -30%)",
                    border: "5px solid #ccc",
                    borderRadius: "3px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    width: "800px",
                    top: "50%",
                    left: "50%",
                    fontFamily: "LGSmart_H",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }}></div> {/* 왼쪽의 빈 칸 */}
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <span>
                        <b>{company.company} 상위 재해유형</b>
                      </span>
                    </div>{" "}
                    {/* 텍스트를 가운데 정렬하는 칸 */}
                    <div style={{ flex: 1, textAlign: "right" }}>
                      <button
                        onClick={() => handleClose(company.companyId)}
                        style={{
                          background: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "none",
                        }}
                      >
                        <img
                          src={closeBtn}
                          alt="Close"
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </button>
                    </div>{" "}
                    {/* 이미지 버튼을 오른쪽에 위치시키는 칸 */}
                  </div>

                  <div style={{ display: "flex" }}>
                    {/* 1등급 */}
                    <table
                      style={{
                        borderCollapse: "collapse",
                        maxHeight: "200px", // 최대 높이 설정
                        overflowY: "auto", // 세로 스크롤 추가
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      <tbody>
                        <tr
                          style={{
                            color: "white",
                            height: "30px",
                            flex: 1,
                          }}
                        >
                          <td
                            style={{
                              backgroundColor: "#BDBDBD",
                              border: "1px solid #ccc",
                              padding: "2px",
                              width: "200px",
                            }}
                            colSpan={2}
                          >
                            1등급
                          </td>
                        </tr>
                        <tr style={{ height: "30px" }}>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            재해유형
                          </td>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            건수
                          </td>
                        </tr>
                        {grade1List.map((grade1) => (
                          <tr style={{ height: "30px" }}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade1.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade1.total}
                            </td>
                          </tr>
                        ))}
                        {/* 남은 행을 빈 셀로 채움 */}
                        {[...Array(5 - grade1List.length)].map((_, index) => (
                          <tr
                            key={`empty_row_${index}`}
                            style={{ height: "30px" }}
                          >
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* 2등급 */}
                    <table
                      style={{
                        borderCollapse: "collapse",
                        maxHeight: "200px", // 최대 높이 설정
                        overflowY: "auto", // 세로 스크롤 추가
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      <tbody>
                        <tr
                          style={{
                            color: "white",
                            height: "30px",
                          }}
                        >
                          <td
                            style={{
                              backgroundColor: "#585858",
                              border: "1px solid #ccc",
                              padding: "2px",
                              width: "200px",
                            }}
                            colSpan={2}
                          >
                            2등급
                          </td>
                        </tr>
                        <tr style={{ height: "30px" }}>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            재해유형
                          </td>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            건수
                          </td>
                        </tr>
                        {/* grade2List의 데이터 */}
                        {grade2List.map((grade2, index) => (
                          <tr style={{ height: "30px" }}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade2.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade2.total}
                            </td>
                          </tr>
                        ))}
                        {/* 남은 행을 빈 셀로 채움 */}
                        {[...Array(5 - grade2List.length)].map((_, index) => (
                          <tr
                            key={`empty_row_${index}`}
                            style={{ height: "30px" }}
                          >
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* 3등급 */}
                    <table
                      style={{
                        borderCollapse: "collapse",
                        maxHeight: "200px", // 최대 높이 설정
                        overflowY: "auto", // 세로 스크롤 추가
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      <tbody>
                        <tr
                          style={{
                            color: "white",
                            height: "30px",
                          }}
                        >
                          <td
                            style={{
                              backgroundColor: "#FFBF00",
                              border: "1px solid #ccc",
                              padding: "2px",
                              width: "200px",
                            }}
                            colSpan={2}
                          >
                            3등급
                          </td>
                        </tr>
                        <tr style={{ height: "30px" }}>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            재해유형
                          </td>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            건수
                          </td>
                        </tr>
                        {grade3List.map((grade3) => (
                          <tr style={{ height: "30px" }}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade3.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade3.total}
                            </td>
                          </tr>
                        ))}
                        {/* 남은 행을 빈 셀로 채움 */}
                        {[...Array(5 - grade3List.length)].map((_, index) => (
                          <tr
                            key={`empty_row_${index}`}
                            style={{ height: "30px" }}
                          >
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* 4등급 */}
                    <table
                      style={{
                        borderCollapse: "collapse",
                        maxHeight: "200px", // 최대 높이 설정
                        overflowY: "auto", // 세로 스크롤 추가
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      <tbody>
                        <tr
                          style={{
                            color: "white",
                            height: "30px",
                          }}
                        >
                          <td
                            style={{
                              backgroundColor: "#FF8000",
                              border: "1px solid #ccc",
                              padding: "2px",
                              width: "200px",
                            }}
                            colSpan={2}
                          >
                            4등급
                          </td>
                        </tr>
                        <tr style={{ height: "30px" }}>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            재해유형
                          </td>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            건수
                          </td>
                        </tr>
                        {grade4List.map((grade4) => (
                          <tr style={{ height: "30px" }}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade4.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade4.total}
                            </td>
                          </tr>
                        ))}
                        {/* 남은 행을 빈 셀로 채움 */}
                        {[...Array(5 - grade4List.length)].map((_, index) => (
                          <tr
                            key={`empty_row_${index}`}
                            style={{ height: "30px" }}
                          >
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* 5등급 */}
                    <table
                      style={{
                        borderCollapse: "collapse",
                        maxHeight: "200px", // 최대 높이 설정
                        overflowY: "auto", // 세로 스크롤 추가
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      <tbody>
                        <tr
                          style={{
                            color: "white",
                            height: "30px",
                          }}
                        >
                          <td
                            style={{
                              backgroundColor: "#d00042",
                              border: "1px solid #ccc",
                              padding: "2px",
                              width: "200px",
                            }}
                            colSpan={2}
                          >
                            5등급
                          </td>
                        </tr>
                        <tr style={{ height: "30px" }}>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            재해유형
                          </td>
                          <td
                            style={{
                              backgroundColor: "#F3E2A9",
                              border: "1px solid #ccc",
                              padding: "2px",
                            }}
                          >
                            건수
                          </td>
                        </tr>
                        {grade5List.map((grade5) => (
                          <tr style={{ height: "30px" }}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade5.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              {grade5.total}
                            </td>
                          </tr>
                        ))}
                        {/* 남은 행을 빈 셀로 채움 */}
                        {[...Array(5 - grade5List.length)].map((_, index) => (
                          <tr
                            key={`empty_row_${index}`}
                            style={{ height: "30px" }}
                          >
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "2px",
                              }}
                            >
                              &nbsp;
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default LeftContents;
