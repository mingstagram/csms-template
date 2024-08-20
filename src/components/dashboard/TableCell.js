import React, { useEffect, useState } from "react";
import ChartTooltip from "./ChartTooltip";
import ChartTooltipDepartment from "./ChartTooltipDepartment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import closeBtn from "../../assets/images/close-fill@2x.png";

const TableCell = ({ ranking, filter, setFilter, index }) => {
  const navigate = useNavigate();
  const [disasterTypeDeptList, setDisasterTypeDeptList] = useState([]);
  const [harmfulClassficationCompanyList, setHarmfulClassficationCompanyList] =
    useState([]);

  const [disasterFilter, setDisasterFilter] = useState({
    ...filter,
  });
  const [disasterTop5DivFilter, setDisasterTop5DivFilter] = useState({
    ...filter,
  });
  const [disasterTop5DeptFilter, setDisasterTop5DeptFilter] = useState({
    ...filter,
  });

  const [tooltipVisible, setTooltipVisibility] = useState(false);
  const [hovered, setHovered] = useState(false); // 마우스 오버 상태 변수 추가
  const [tooltipVisibleDept, setTooltipVisibilityDept] = useState(false);
  const [hoveredDept, setHoveredDept] = useState(false); // 마우스 오버 상태 변수 추가
  const [tooltipVisibleLevel1, setTooltipVisibilityLevel1] = useState(false);
  const [tooltipVisibleLevel2, setTooltipVisibilityLevel2] = useState(false);
  const [tooltipVisibleLowTotal, setTooltipVisibilityLowTotal] =
    useState(false);
  const [tooltipVisibleLevel3, setTooltipVisibilityLevel3] = useState(false);
  const [tooltipVisibleLevel4, setTooltipVisibilityLevel4] = useState(false);
  const [tooltipVisibleLevel5, setTooltipVisibilityLevel5] = useState(false);
  const [tooltipVisibleHighTotal, setTooltipVisibilityHighTotal] =
    useState(false);
  const [tooltipVisibleTotal, setTooltipVisibilityTotal] = useState(false);

  const [tooltipData, setTooltipData] = useState([]);
  const [tooltipDataDept, setTooltipDataDept] = useState([]);
  const [tooltipDataLevel1, setTooltipDataLevel1] = useState([]);
  const [tooltipDataLevel2, setTooltipDataLevel2] = useState([]);
  const [tooltipDataLowTotal, setTooltipDataLowTotal] = useState([]);
  const [tooltipDataLevel3, setTooltipDataLevel3] = useState([]);
  const [tooltipDataLevel4, setTooltipDataLevel4] = useState([]);
  const [tooltipDataLevel5, setTooltipDataLevel5] = useState([]);
  const [tooltipDataHighTotal, setTooltipDataHighTotal] = useState([]);
  const [tooltipDataTotal, setTooltipDataTotal] = useState([]);

  const [tooltipDivDisasterType, setTooltipDivDisasterType] = useState(false);
  const [tooltipDeptDisasterType, setTooltipDeptDisasterType] = useState(false);

  const [grade1ListDiv, setGrade1ListDiv] = useState([]);
  const [grade2ListDiv, setGrade2ListDiv] = useState([]);
  const [grade3ListDiv, setGrade3ListDiv] = useState([]);
  const [grade4ListDiv, setGrade4ListDiv] = useState([]);
  const [grade5ListDiv, setGrade5ListDiv] = useState([]);

  const [grade1ListDept, setGrade1ListDept] = useState([]);
  const [grade2ListDept, setGrade2ListDept] = useState([]);
  const [grade3ListDept, setGrade3ListDept] = useState([]);
  const [grade4ListDept, setGrade4ListDept] = useState([]);
  const [grade5ListDept, setGrade5ListDept] = useState([]);

  const handleMouseOver = (divisionId) => {
    // setTooltipData(data);
    setTooltipDivDisasterType(true);
    getDisasterTypeDivTop5(divisionId);
    setHovered(true);
    // setTooltipVisibility(true);
  };
  const handleMouseLeave = (divisionId) => {
    setHovered(false);
    setTooltipDivDisasterType(false);
    // setTooltipVisibility(false);
  };
  const handleCloseDiv = () => {
    setTooltipDivDisasterType(false);
  };

  // 클릭 이벤트 핸들러
  const handleTextClick = (data) => {
    setTooltipData(data); // 툴팁 데이터를 설정
    setTooltipVisibility((prevVisible) => !prevVisible); // 가시성 토글
  };

  const handleMouseOverDept = (departmentId) => {
    // setTooltipDataDept(data);
    getDisasterTypeDeptTop5(departmentId);
    setHoveredDept(true);
    setTooltipDeptDisasterType(true);
  };
  const handleMouseLeaveDept = (departmentId) => {
    // setTooltipVisibilityDept(false);
    setHoveredDept(false);
    setTooltipDeptDisasterType(false);
  };
  const handleCloseDept = () => {
    setTooltipDeptDisasterType(false);
  };

  // 클릭 이벤트 핸들러
  const handleTextClickDept = (data) => {
    setTooltipDataDept(data); // 툴팁 데이터를 설정
    setTooltipVisibilityDept((prevVisible) => !prevVisible); // 가시성 토글
  };

  const handleMouseOverLevel1 = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: 1,
    });
    setTooltipDataLevel1(data);
    setTooltipVisibilityLevel1(true);
  };
  const handleMouseLeaveLevel1 = () => {
    setTooltipVisibilityLevel1(false);
  };

  const handleMouseOverLevel2 = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: 2,
    });
    setTooltipDataLevel2(data);
    setTooltipVisibilityLevel2(true);
  };
  const handleMouseLeaveLevel2 = () => {
    setTooltipVisibilityLevel2(false);
  };

  const handleMouseOverLowTotal = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: null,
      sort: "low",
    });
    setTooltipDataLowTotal(data);
    setTooltipVisibilityLowTotal(true);
  };
  const handleMouseLeaveLowTotal = () => {
    setTooltipVisibilityLowTotal(false);
  };

  const handleMouseOverLevel3 = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: 3,
    });
    setTooltipDataLevel3(data);
    setTooltipVisibilityLevel3(true);
  };
  const handleMouseLeaveLevel3 = () => {
    setTooltipVisibilityLevel3(false);
  };

  const handleMouseOverLevel4 = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: 4,
    });
    setTooltipDataLevel4(data);
    setTooltipVisibilityLevel4(true);
  };
  const handleMouseLeaveLevel4 = () => {
    setTooltipVisibilityLevel4(false);
  };

  const handleMouseOverLevel5 = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: 5,
    });
    setTooltipDataLevel5(data);
    setTooltipVisibilityLevel5(true);
  };
  const handleMouseLeaveLevel5 = () => {
    setTooltipVisibilityLevel5(false);
  };

  const handleMouseOverHighTotal = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: null,
      sort: "high",
    });
    setTooltipDataHighTotal(data);
    setTooltipVisibilityHighTotal(true);
  };
  const handleMouseLeaveHighTotal = () => {
    setTooltipVisibilityHighTotal(false);
  };
  const handleMouseOverTotal = (data) => {
    getDisasterTypeByDepartment({
      departmentId: ranking.departmentId,
      curRiskGrade: null,
      sort: "total",
    });
    setTooltipDataTotal(data);
    setTooltipVisibilityTotal(true);
  };
  const handleMouseLeaveTotal = () => {
    setTooltipVisibilityTotal(false);
  };

  const handleClick = (sort) => {
    const dataToSend = {
      companyId: filter.companyId,
      divisionId: ranking.divisionId,
      departmentId: ranking.departmentId,
      sort: sort,
      divisionName: ranking.division,
      departmentName: ranking.department,
      searchYear: filter.searchYear,
      searchMonth: filter.searchMonth,
    };
    navigate("/matrixList", { state: dataToSend });
  };

  // 부서별 재해유형 리스트
  const getDisasterTypeByDepartment = ({
    departmentId,
    curRiskGrade,
    sort,
  }) => {
    if (sort) {
      // sort가 low나 high일경우
      axios
        .post("/admin/api/find_disaster_type_dept", {
          disasterFilter,
          departmentId: departmentId,
          curRiskGrade: curRiskGrade,
          sort: sort,
          searchYear: filter.searchYear,
        })
        .then((res) => {
          if (res.data.code === "0000") {
            setDisasterTypeDeptList(res.data.result);
          }
        })
        .catch(() => {});
    } else {
      axios
        .post("/admin/api/find_disaster_type_dept", {
          disasterFilter,
          departmentId: departmentId,
          curRiskGrade: curRiskGrade,
          searchYear: filter.searchYear,
        })
        .then((res) => {
          if (res.data.code === "0000") {
            setDisasterTypeDeptList(res.data.result);
          }
        })
        .catch(() => {});
    }
  };

  const getDisasterTypeDivTop5 = (divisionId) => {
    axios
      .post("/admin/api/find_disaster_type_company", {
        disasterTop5DivFilter,
        searchYear: filter.searchYear,
        divisionId: divisionId,
      })
      .then((res) => {
        if (res.data.code === "0000") {
          // 등급별로 데이터 분리
          setGrade1ListDiv(res.data.result.grade1);
          setGrade2ListDiv(res.data.result.grade2);
          setGrade3ListDiv(res.data.result.grade3);
          setGrade4ListDiv(res.data.result.grade4);
          setGrade5ListDiv(res.data.result.grade5);
          // setHarmfulClassficationCompanyList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const getDisasterTypeDeptTop5 = (departmentId) => {
    axios
      .post("/admin/api/find_disaster_type_company", {
        disasterTop5DeptFilter,
        searchYear: filter.searchYear,
        departmentId: departmentId,
      })
      .then((res) => {
        if (res.data.code === "0000") {
          // 등급별로 데이터 분리
          setGrade1ListDept(res.data.result.grade1);
          setGrade2ListDept(res.data.result.grade2);
          setGrade3ListDept(res.data.result.grade3);
          setGrade4ListDept(res.data.result.grade4);
          setGrade5ListDept(res.data.result.grade5);
          // setHarmfulClassficationCompanyList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const getTransform = (index) => {
    switch (index) {
      case 0:
        return "translate(-180px, 250px)";
        break;
      case 1:
        return "translate(-180px, 195px)";
        break;
      case 2:
        return "translate(-180px, 140px)";
        break;
      case 3:
        return "translate(-180px, 85px)";
        break;
      case 4:
        return "translate(-180px, 30px)";
        break;
      case 5:
        return "translate(-180px, -300px)";
        break;
      case 6:
        return "translate(-180px, -355px)";
        break;
      case 7:
        return "translate(-180px, -410px)";
        break;
      case 8:
        return "translate(-180px, -465px)";
        break;
      case 9:
        return "translate(-180px, -520px)";
        break;
      default:
        return "translate(-180px, 250px)";
        break;
    }

    // if (index >= 0 && index <= 4) {
    //   return "translate(-180px, 250px)";
    // } else if (index >= 5 && index <= 9) {
    //   return "translate(-52%, -104%)";
    // } else {
    //   return ""; // 다른 경우에는 빈 문자열 또는 다른 기본값 설정
    // }
  };

  return (
    <tr style={{ height: "55px", fontSize: "12px", verticalAlign: "middle" }}>
      <td
        style={{
          cursor: "pointer",
          fontWeight: hovered ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: hovered ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
          position: "relative",
        }}
      >
        <span
          onMouseOver={() => handleMouseOver(ranking.divisionId)}
          onMouseLeave={() => handleMouseLeave(ranking.divisionId)}
          onClick={() => handleClick("division")}
        >
          {ranking.division}
        </span>
        {tooltipDivDisasterType && (
          <div
            style={{
              position: "absolute",
              transform: getTransform(index),
              border: "5px solid #ccc",
              borderRadius: "3px",
              padding: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              width: "1000px",
              top: "50%",
              left: "50%",
              fontFamily: "LGSmart_H",
              textAlign: "center",
              fontWeight: "normal",
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
                <span style={{ fontSize: "16px" }}>
                  {<b>{ranking.division}</b>}
                </span>
              </div>{" "}
              {/* 텍스트를 가운데 정렬하는 칸 */}
              <div style={{ flex: 1, textAlign: "right" }}>
                <button
                  onClick={() => handleCloseDiv()}
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
              <table
                style={{
                  borderCollapse: "collapse",
                  maxHeight: "210px", // 최대 높이 설정
                  overflowY: "auto", // 세로 스크롤 추가
                  fontSize: "13px",
                  textAlign: "center",
                  marginLeft: "0px",
                  border: "0.5px solid #BDBDBD",
                }}
              >
                <div style={{ marginTop: "35px" }}>
                  <ChartTooltip ranking={ranking} filter={filter} />
                </div>
              </table>
              {/* 1등급 */}
              <table
                style={{
                  borderCollapse: "collapse",
                  maxHeight: "200px", // 최대 높이 설정
                  overflowY: "auto", // 세로 스크롤 추가
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade1ListDiv.map((grade1) => (
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
                  {[...Array(5 - grade1ListDiv.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade2ListDiv.map((grade2, index) => (
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
                  {[...Array(5 - grade2ListDiv.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade3ListDiv.map((grade3) => (
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
                  {[...Array(5 - grade3ListDiv.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade4ListDiv.map((grade4) => (
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
                  {[...Array(5 - grade4ListDiv.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade5ListDiv.map((grade5) => (
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
                  {[...Array(5 - grade5ListDiv.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
      </td>
      <td
        style={{
          cursor: "pointer",
          fontWeight: hoveredDept ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: hoveredDept ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
          position: "relative",
        }}
      >
        <span
          onMouseOver={() => handleMouseOverDept(ranking.departmentId)}
          onMouseLeave={() => handleMouseLeaveDept(ranking.departmentId)}
          onClick={() => handleClick("department")}
        >
          {ranking.department}
        </span>
        {tooltipDeptDisasterType && (
          <div
            style={{
              position: "absolute",
              transform: getTransform(index),
              border: "5px solid #ccc",
              borderRadius: "3px",
              padding: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              width: "1000px",
              top: "50%",
              left: "50%",
              fontFamily: "LGSmart_H",
              textAlign: "center",
              fontWeight: "normal",
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
                <span style={{ fontSize: "16px" }}>
                  {<b>{ranking.department}</b>}
                </span>
              </div>{" "}
              {/* 텍스트를 가운데 정렬하는 칸 */}
              <div style={{ flex: 1, textAlign: "right" }}>
                <button
                  onClick={() => handleCloseDept()}
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
              <table
                style={{
                  borderCollapse: "collapse",
                  maxHeight: "210px", // 최대 높이 설정
                  overflowY: "auto", // 세로 스크롤 추가
                  fontSize: "13px",
                  textAlign: "center",
                  marginLeft: "0px",
                  border: "0.5px solid #BDBDBD",
                }}
              >
                <div style={{ marginTop: "35px" }}>
                  <ChartTooltipDepartment ranking={ranking} filter={filter} />
                </div>
              </table>
              {/* 1등급 */}
              <table
                style={{
                  borderCollapse: "collapse",
                  maxHeight: "200px", // 최대 높이 설정
                  overflowY: "auto", // 세로 스크롤 추가
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade1ListDept.map((grade1) => (
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
                  {[...Array(5 - grade1ListDept.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade2ListDept.map((grade2, index) => (
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
                  {[...Array(5 - grade2ListDept.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade3ListDept.map((grade3) => (
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
                  {[...Array(5 - grade3ListDept.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade4ListDept.map((grade4) => (
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
                  {[...Array(5 - grade4ListDept.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
                  fontSize: "12px",
                  textAlign: "center",
                  width: "150px",
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
                      상위 재해유형
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
                  {grade5ListDept.map((grade5) => (
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
                  {[...Array(5 - grade5ListDept.length)].map((_, index) => (
                    <tr key={`empty_row_${index}`} style={{ height: "30px" }}>
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
            {/* <div style={{ marginTop: "30px", marginLeft: "80px" }}>
              <ChartTooltipDepartment ranking={ranking} filter={filter} />
            </div> */}
          </div>
        )}
      </td>
      <td
        style={{ fontWeight: "bold", borderLeft: "none", borderRight: "none" }}
      >
        {ranking.processCount}개
      </td>
      <td
        style={{
          fontWeight: "bold",
          borderLeft: "none",
          borderRight: "none",
          cursor: "default",
          fontWeight: tooltipVisibleTotal ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: tooltipVisibleTotal ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
        }}
      >
        <span
          onMouseOver={handleMouseOverTotal}
          onMouseLeave={handleMouseLeaveTotal}
        >
          {ranking.riskTotal}개
        </span>
        {tooltipVisibleTotal && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(45%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          cursor: "default",
          fontWeight: tooltipVisibleLevel1 ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: tooltipVisibleLevel1 ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <span
          onMouseOver={handleMouseOverLevel1}
          onMouseLeave={handleMouseLeaveLevel1}
        >
          {ranking.level1}개
        </span>
        {tooltipVisibleLevel1 && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>

      <td
        style={{
          cursor: "default",
          fontWeight: tooltipVisibleLevel2 ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: tooltipVisibleLevel2 ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <span
          onMouseOver={handleMouseOverLevel2}
          onMouseLeave={handleMouseLeaveLevel2}
        >
          {ranking.level2}개
        </span>
        {tooltipVisibleLevel2 && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          fontWeight: "bold",
          borderLeft: "none",
          borderRight: "none",
          cursor: "default",
          textDecoration: tooltipVisibleLowTotal ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
        }}
      >
        <span
          onMouseOver={handleMouseOverLowTotal}
          onMouseLeave={handleMouseLeaveLowTotal}
        >
          {ranking.lowRiskLevel}개
        </span>
        {tooltipVisibleLowTotal && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          color: "#d00042",
          cursor: "default",
          fontWeight: tooltipVisibleLevel3 ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: tooltipVisibleLevel3 ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <span
          onMouseOver={handleMouseOverLevel3}
          onMouseLeave={handleMouseLeaveLevel3}
        >
          {ranking.level3}개
        </span>
        {tooltipVisibleLevel3 && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          color: "#d00042",
          cursor: "default",
          fontWeight: tooltipVisibleLevel4 ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: tooltipVisibleLevel4 ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <span
          onMouseOver={handleMouseOverLevel4}
          onMouseLeave={handleMouseLeaveLevel4}
        >
          {ranking.level4}개
        </span>
        {tooltipVisibleLevel4 && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          color: "#d00042",
          cursor: tooltipVisibleLevel5 ? "default" : "pointer",
          fontWeight: tooltipVisibleLevel5 ? "bold" : "normal", // 마우스 오버 시에 글자를 진하게
          textDecoration: tooltipVisibleLevel5 ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <span
          onMouseOver={handleMouseOverLevel5}
          onMouseLeave={handleMouseLeaveLevel5}
        >
          {ranking.level5}개
        </span>
        {tooltipVisibleLevel5 && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          color: "#d00042",
          fontWeight: "bold", // 마우스 오버 시에 글자를 진하게
          borderLeft: "none",
          borderRight: "none",
          cursor: "default",
          textDecoration: tooltipVisibleHighTotal ? "underline" : "none", // 마우스 오버 시에 밑줄 추가
        }}
      >
        <span
          onMouseOver={handleMouseOverHighTotal}
          onMouseLeave={handleMouseLeaveHighTotal}
        >
          {ranking.highRiskLevel}개
        </span>
        {tooltipVisibleHighTotal && disasterTypeDeptList.length > 0 && (
          <div
            style={{
              transform: "translate(30%, -28%)",
              border: "1px solid #ccc", // 테두리 스타일 변경
              borderRadius: "3px", // 테두리 모서리 둥글게 만듦
              backgroundColor: "#fff", // 배경색 변경
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
              zIndex: 1, // 다른 엘리먼트 위에 표시되도록 zIndex 설정
              position: "absolute",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "150px",
                maxHeight: "200px", // 최대 높이 설정
                overflowY: "auto", // 세로 스크롤 추가
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#F3E2A9",
                      border: "1px solid #ccc",
                      padding: "2px",
                    }}
                  >
                    상위 재해유형
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
                {disasterTypeDeptList.map((disaster) => (
                  <tr key={disaster.name}>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.name}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                      {disaster.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
      <td
        style={{
          color: "#227d88",
          fontWeight: "bold",
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        {ranking.improveRiskTotal}개({ranking.improveRiskPercent}%)
      </td>
    </tr>
  );
};

export default TableCell;
