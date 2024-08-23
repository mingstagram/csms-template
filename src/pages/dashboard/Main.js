import React, { useEffect, useState } from "react";
import { Row, Col, Input } from "reactstrap";
import Calendar from "react-calendar";
import leftArrow from "../../assets/images/left-arrow.png";
import rightArrow from "../../assets/images/right-arrow.png";
import Variant5 from "../../assets/images/Variant5.png";
import searchBtn from "../../assets/images/Component 110.png";
import ReactApexChart from "react-apexcharts";
import DashboardMiniDonutChart from "../../components/common/DashboardMiniDonutChart";
import DashboardDonutChart from "../../components/common/DashboardDonutChart";
import DashboardBarChart from "../../components/common/DashboardBarChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const rows1 = Array.from({ length: 5 });
  const [date, setDate] = useState(new Date());
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const [noticeList, setNoticeList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [councilList, setCouncilList] = useState([]);
  const [improveList, setImproveList] = useState([]);
  const navigate = useNavigate();

  // 구분별 협력사 현황
  const contractorCategoryData = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  // 협력사별 점검 현황
  const contractorInspectionData = [
    { title: "Chart 1", data: [44, 55, 13, 33], count: 44 },
    { title: "Chart 2", data: [23, 67, 33, 14], count: 33 },
    { title: "Chart 3", data: [12, 34, 56, 78], count: 56 },
    { title: "Chart 4", data: [11, 22, 33, 44], count: 33 },
  ];

  // 재해유형별 개선현황
  // 카테고리와 두 개의 값을 포함한 데이터
  const improveDisasterTypeData = [
    { category: "Category 1", value1: 30, value2: 20 },
    { category: "Category 2", value1: 40, value2: 25 },
    { category: "Category 3", value1: 45, value2: 30 },
    { category: "Category 4", value1: 50, value2: 35 },
    { category: "Category 5", value1: 49, value2: 40 },
    { category: "Category 6", value1: 60, value2: 45 },
    { category: "Category 7", value1: 70, value2: 50 },
    { category: "Category 8", value1: 91, value2: 55 },
    { category: "Category 9", value1: 125, value2: 60 },
    { category: "Category 10", value1: 130, value2: 65 },
    { category: "Category 11", value1: 140, value2: 70 },
    { category: "Category 12", value1: 150, value2: 75 },
    { category: "Category 13", value1: 160, value2: 80 },
    { category: "Category 14", value1: 170, value2: 85 },
  ];

  const getNoticeList = () => {
    axios
      .post("/main/api/notice_top5")
      .then((res) => {
        if (res.data.code === "0000") {
          setNoticeList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const getBoardList = () => {
    axios
      .post("/main/api/board_top5")
      .then((res) => {
        if (res.data.code === "0000") {
          setBoardList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const getCouncilList = () => {
    axios
      .post("/main/api/council_top5")
      .then((res) => {
        if (res.data.code === "0000") {
          setCouncilList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const getImproveList = () => {
    axios
      .post("/main/api/improve_top5")
      .then((res) => {
        if (res.data.code === "0000") {
          setImproveList(res.data.result);
        }
      })
      .catch(() => {});
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const getRiskDateList = () => {
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

    const monthsByYear = years.map((year) => {
      return Array.from({ length: 12 }, (_, index) => index + 1);
    });

    // 현재 월의 마지막 날짜를 구하기 위한 함수
    const getLastDayOfMonth = (year, month) => {
      return new Date(year, month, 0).getDate();
    };

    // 현재 연도와 월에 대한 일(day) 배열 생성
    const currentMonth = new Date().getMonth() + 1; // 현재 월
    const daysInCurrentMonth = Array.from(
      { length: getLastDayOfMonth(currentYear, currentMonth) },
      (_, index) => index + 1
    );

    setYearList(years);
    setMonthList(monthsByYear[0]);
  };

  const formatMonthYear = (date) => {
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const handleNoticePage = () => {
    navigate("/notice");
  };

  const handleAnnouncePage = () => {
    navigate("/announce");
  };

  const handleDataResultPage = () => {
    navigate("/dataResult");
  };

  const handleImprovePage = () => {
    navigate("/improve");
  };

  useEffect(() => {
    getRiskDateList();
    getNoticeList();
    getBoardList();
    getCouncilList();
    getImproveList();
  }, []);

  // 현재 월의 날짜만 보이고, 이전/다음 월의 날짜는 회색으로 표시
  //   const tileClassName = ({ date, view }) => {
  //     if (view === "month") {
  //       const today = new Date();
  //       // 현재 월의 날짜는 기본 스타일 적용
  //       if (
  //         date.getMonth() === today.getMonth() &&
  //         date.getFullYear() === today.getFullYear()
  //       ) {
  //         return null;
  //       }
  //       // 이전/다음 월의 날짜는 회색으로 설정
  //       return "other-month-tile";
  //     }
  //     return null;
  //   };

  return (
    <div style={{ fontFamily: "LGSmart_H" }}>
      <div
        style={{ display: "flex", flexDirection: "row", marginLeft: "-15px" }}
      >
        {/* 첫 번째 그룹의 Row */}
        <Row style={{ marginRight: "0px", marginLeft: "-20px" }}>
          <Col>
            <div
              style={{
                width: "590px",
                height: "250px",
                backgroundColor: "#fff",
                padding: "30px",
                marginBottom: "10px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="Rectangle-346"></div>
                  <p className="main-sub-title">공지사항</p>
                </div>
                <span
                  className="main-sub-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleAnnouncePage}
                >
                  더보기
                </span>
              </div>
              {/* 테이블 추가 */}
              <div
                style={{
                  width: "530px",
                  height: "150px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    height: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "20%" }}
                      >
                        분류
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "50%" }}
                      >
                        제목
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        등록일
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        수정일
                      </th>
                    </tr>
                    {rows1.map((_, index) => (
                      <tr>
                        <td className="main-table main-table-row1">asdf</td>
                        <td className="main-table">
                          <div className="d-flex">
                            <div className="Ellipse-368">
                              <span className="N">N</span>
                            </div>
                            <span
                              style={{ fontSize: "12px", marginLeft: "7px" }}
                            >
                              asdf
                            </span>
                          </div>
                        </td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* 테이블 종료 */}
            </div>
          </Col>
          <Col>
            <div
              style={{
                width: "590px",
                height: "250px",
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="Rectangle-346"></div>
                  <p className="main-sub-title">협의체 자료 · 결과</p>
                </div>
                <span
                  className="main-sub-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleDataResultPage}
                >
                  더보기
                </span>
              </div>
              <div
                style={{
                  width: "530px",
                  height: "150px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    height: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "20%" }}
                      >
                        업체명
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "50%" }}
                      >
                        제목
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        등록일
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        수정일
                      </th>
                    </tr>
                    {rows1.map((_, index) => (
                      <tr>
                        <td className="main-table">asdf</td>
                        <td className="main-table">
                          <div className="d-flex">
                            <div className="Ellipse-368">
                              <span className="N">N</span>
                            </div>
                            <span
                              style={{ fontSize: "12px", marginLeft: "7px" }}
                            >
                              asdf
                            </span>
                          </div>
                        </td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>

        {/* 두 번째 그룹의 Row */}
        <Row style={{ marginRight: "0px", marginLeft: "-30px" }}>
          <Col>
            <div
              style={{
                width: "590px",
                height: "250px",
                backgroundColor: "#fff",
                padding: "30px",
                marginBottom: "10px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="Rectangle-346"></div>
                  <p className="main-sub-title">게시판</p>
                </div>
                <span
                  className="main-sub-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleNoticePage}
                >
                  더보기
                </span>
              </div>
              <div
                style={{
                  width: "530px",
                  height: "150px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    height: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "20%" }}
                      >
                        분류
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "50%" }}
                      >
                        제목
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        등록일
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        수정일
                      </th>
                    </tr>
                    {rows1.map((_, index) => (
                      <tr>
                        <td className="main-table main-table-row1">asdf</td>
                        <td className="main-table">
                          <div className="d-flex">
                            <div className="Ellipse-368">
                              <span className="N">N</span>
                            </div>
                            <span
                              style={{ fontSize: "12px", marginLeft: "7px" }}
                            >
                              asdf
                            </span>
                          </div>
                        </td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
          <Col>
            <div
              style={{
                width: "590px",
                height: "250px",
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="Rectangle-346"></div>
                  <p className="main-sub-title">개선제안 · 아차사고</p>
                </div>
                <span
                  className="main-sub-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleImprovePage}
                >
                  더보기
                </span>
              </div>
              <div
                style={{
                  width: "530px",
                  height: "150px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    height: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "20%" }}
                      >
                        업체명
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "50%" }}
                      >
                        제목
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        등록일
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        수정일
                      </th>
                    </tr>
                    {rows1.map((_, index) => (
                      <tr>
                        <td className="main-table">asdf</td>
                        <td className="main-table">
                          <div className="d-flex">
                            <div className="Ellipse-368">
                              <span className="N">N</span>
                            </div>
                            <span
                              style={{ fontSize: "12px", marginLeft: "7px" }}
                            >
                              asdf
                            </span>
                          </div>
                        </td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>

        {/* 세 번째 그룹의 Row */}
        <Row style={{ marginRight: "0px", marginLeft: "-30px" }}>
          <Col>
            <div
              style={{
                width: "590px",
                height: "510px",
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <div className="d-flex">
                <div className="Rectangle-346"></div>
                <p className="main-sub-title">캘린더(일정)</p>
              </div>
              <div className="calendar-container">
                <div className="calendar-header">
                  <button
                    className="nav-btn calendar-font"
                    onClick={handlePrevMonth}
                  >
                    <img src={leftArrow} />
                  </button>
                  <span
                    className="calendar-title calendar-font"
                    style={{ padding: "10px 0px 10px 0px" }}
                  >
                    {formatMonthYear(date)}
                  </span>
                  <button
                    className="nav-btn calendar-font"
                    onClick={handleNextMonth}
                  >
                    <img src={rightArrow} />
                  </button>
                </div>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  showNavigation={false}
                  showNeighboringMonth={true} // 이전/다음 월의 날짜도 보여줍니다.
                  formatShortWeekday={(locale, date) => {
                    const days = ["일", "월", "화", "수", "목", "금", "토"];
                    return days[date.getDay()];
                  }} // 요일 순서 커스터마이징
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const today = new Date();
                      const isBeforeCurrentMonth =
                        date.getMonth() < today.getMonth() &&
                        date.getFullYear() === today.getFullYear();
                      const isAfterCurrentMonth =
                        date.getMonth() > today.getMonth() &&
                        date.getFullYear() === today.getFullYear();

                      if (isBeforeCurrentMonth || isAfterCurrentMonth) {
                        return "other-month-tile"; // 이전/다음 월의 날짜는 회색
                      }
                    }
                    return null;
                  }}
                  formatDay={(locale, date) => date.getDate()} // 요일 텍스트 설정
                />
              </div>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ paddingTop: "20px" }}
              >
                <div className="d-flex">
                  <img
                    src={Variant5}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <p className="main-sub-title2">
                    {formatMonthYear(date)} 일정
                  </p>
                </div>
                <span className="main-sub-btn">더보기</span>
              </div>
              <div
                style={{
                  width: "530px",
                  height: "150px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    height: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "00%" }}
                      >
                        분류
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "40%" }}
                      >
                        제목
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "10%" }}
                      >
                        기간
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "15%" }}
                      >
                        일시
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "10%" }}
                      >
                        대상
                      </th>
                      <th
                        className="main-table main-table-title"
                        style={{ width: "10%" }}
                      >
                        장소
                      </th>
                    </tr>
                    {rows1.map((_, index) => (
                      <tr>
                        <td className="main-table">asdf</td>
                        <td className="main-table">
                          <div className="d-flex">
                            <div className="Ellipse-368">
                              <span className="N">N</span>
                            </div>
                            <span
                              style={{ fontSize: "12px", marginLeft: "7px" }}
                            >
                              asdf
                            </span>
                          </div>
                        </td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                        <td className="main-table">asd</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* 새로운 줄에서 시작하는 네 번째 그룹의 Row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          marginLeft: "-15px",
        }}
      >
        <Row style={{ marginRight: "0px", marginLeft: "-20px" }}>
          <Col>
            <div
              style={{
                width: "1790px",
                height: "320px",
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p className="main-sub-title">대시보드</p>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <Input
                    id="exampleSelectYear"
                    name="selectYear"
                    type="select"
                    style={{
                      marginRight: "10px",
                      width: "140px",
                      height: "36px",
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                    }}
                    //   value={searchYear ? searchYear : state.searchYear}
                    //   onChange={handleYearChange}
                  >
                    {yearList.map((year) => (
                      <option key={year} value={year}>
                        {year}년
                      </option>
                    ))}
                  </Input>
                  <Input
                    id="exampleSelectMonth"
                    name="selectMonth"
                    type="select"
                    style={{
                      marginRight: "10px",
                      width: "140px",
                      height: "36px",
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                    }}
                    // value={searchMonth ? searchMonth : state.searchMonth}
                    // onChange={handleMonthChange}
                  >
                    <option value={null} selected>
                      전체
                    </option>
                    {monthList.map((month) => (
                      <option key={month} value={month}>
                        {month}월
                      </option>
                    ))}
                  </Input>
                  <img
                    src={searchBtn}
                    alt="Search"
                    style={{
                      width: "36px",
                      height: "36px",
                      cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
                    }}
                    // onClick={handleSearch}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div
                  style={{
                    width: "600px",
                    height: "220px",
                    overflow: "hidden",
                    borderRight: "1px solid #eaeaea",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div className="Rectangle-346"></div>
                    <p className="main-sub-title">구분별 협력사 현황</p>
                  </div>
                  <div>
                    <DashboardDonutChart data={contractorCategoryData} />
                  </div>
                </div>
                <div
                  style={{
                    width: "600px",
                    height: "220px",
                    overflow: "hidden",
                    borderRight: "1px solid #eaeaea",
                    paddingLeft: "20px",
                    paddingRight: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div className="Rectangle-346"></div>
                    <p className="main-sub-title">협력사별 점검 현황</p>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginTop: "30px" }}
                  >
                    {contractorInspectionData.map((data, index) => (
                      <DashboardMiniDonutChart
                        key={index}
                        title={data.title}
                        data={data.data}
                        count={data.count}
                      />
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    width: "600px",
                    height: "220px",
                    overflow: "hidden",
                    paddingLeft: "20px",
                    paddingRight: "10px",
                  }}
                >
                  <div className="d-flex">
                    <div className="Rectangle-346"></div>
                    <p className="main-sub-title">재해유형별 개선현황</p>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <DashboardBarChart chartData={improveDisasterTypeData} />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Main;
