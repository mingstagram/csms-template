import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button, Card, CardBody, Col, Input, Label } from "reactstrap";
import { styled } from "styled-components";
import "../../styles/projectStyle.css";
import searchBtn from "../../assets/images/Component 110.png";
import questionIcon from "../../assets/images/questionIcon.png";

const ColumnCards = ({ filter, setFilter }) => {
  const [highRiskTotalList, setHighRiskTotalList] = useState([]);
  const [highRiskTotal, setHighRiskTotal] = useState([]);
  const [riskTotal, setRiskTotal] = useState([]);
  const [level1Total, setLevel1Total] = useState([]);
  const [level2Total, setLevel2Total] = useState([]);
  const [level3Total, setLevel3Total] = useState([]);
  const [level4Total, setLevel4Total] = useState([]);
  const [level5Total, setLevel5Total] = useState([]);
  const [regularHighRiskTotal, setRegularHighRiskTotal] = useState([]);
  const [regularRiskTotal, setRegularRiskTotal] = useState([]);
  const [regularLevel1Total, setRegularLevel1Total] = useState([]);
  const [regularLevel2Total, setRegularLevel2Total] = useState([]);
  const [regularLevel3Total, setRegularLevel3Total] = useState([]);
  const [regularLevel4Total, setRegularLevel4Total] = useState([]);
  const [regularLevel5Total, setRegularLevel5Total] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const [searchMonth, setSearchMonth] = useState(null);
  const [searchYear, setSearchYear] = useState(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState(filter.searchYear);
  const [columnFilter, setColumnFilter] = useState({
    ...filter,
  });
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    // 상태 초기화
    setHighRiskTotal([]);
    setRiskTotal([]);
    setLevel1Total([]);
    setLevel2Total([]);
    setLevel3Total([]);
    setLevel4Total([]);
    setLevel5Total([]);
    setRegularHighRiskTotal([]);
    setRegularRiskTotal([]);
    setRegularLevel1Total([]);
    setRegularLevel2Total([]);
    setRegularLevel3Total([]);
    setRegularLevel4Total([]);
    setRegularLevel5Total([]);
    setCompanyName([]);
    setSelectedYear(filter.searchYear);

    // 데이터를 비동기적으로 호출합니다.
    const fetchData = async () => {
      await getHighRiskData(); // 수시 데이터 호출
      // await getRegularData(); // 정기 데이터 호출
      getRiskDateList(); // 리스크 날짜 리스트 호출
    };

    fetchData();
  }, [currentYear, currentMonth, filter, filter.searchYear]);

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

  const getHighRiskData = () => {
    const requestData = {
      ...filter, // 기존 filter 값들
      searchMonth: searchMonth, // searchMonth 추가
    };
    axios
      .post("/admin/api/find_freq_matrix_status", requestData)
      .then((res) => {
        if (res.data.code === "0000") {
          if (res.data.result.length > 0) {
            setHighRiskTotal((prevHighRiskTotal) => [
              ...prevHighRiskTotal,
              ...res.data.result.map((item) => item.highRiskLevel),
            ]);

            setRiskTotal((prevRiskTotal) => [
              ...prevRiskTotal,
              ...res.data.result.map((item) => item.riskTotal),
            ]);

            setLevel1Total((prevLevel1Total) => [
              ...prevLevel1Total,
              ...res.data.result.map((item) => item.level1),
            ]);

            setLevel2Total((prevLevel2Total) => [
              ...prevLevel2Total,
              ...res.data.result.map((item) => item.level2),
            ]);

            setLevel3Total((prevLevel3Total) => [
              ...prevLevel3Total,
              ...res.data.result.map((item) => item.level3),
            ]);

            setLevel4Total((prevLevel4Total) => [
              ...prevLevel4Total,
              ...res.data.result.map((item) => item.level4),
            ]);

            setLevel5Total((prevLevel5Total) => [
              ...prevLevel5Total,
              ...res.data.result.map((item) => item.level5),
            ]);

            setRegularRiskTotal((prevRegularRiskTotal) => [
              ...prevRegularRiskTotal,
              ...res.data.result.map((item) => item.regularRiskTotal),
            ]);
            setRegularLevel1Total((prevRegularLevel1Total) => [
              ...prevRegularLevel1Total,
              ...res.data.result.map((item) => item.regularLevel1),
            ]);
            setRegularLevel2Total((prevRegularLevel2Total) => [
              ...prevRegularLevel2Total,
              ...res.data.result.map((item) => item.regularLevel2),
            ]);
            setRegularLevel3Total((prevRegularLevel3Total) => [
              ...prevRegularLevel3Total,
              ...res.data.result.map((item) => item.regularLevel3),
            ]);
            setRegularLevel4Total((prevRegularLevel4Total) => [
              ...prevRegularLevel4Total,
              ...res.data.result.map((item) => item.regularLevel4),
            ]);
            setRegularLevel5Total((prevRegularLevel5Total) => [
              ...prevRegularLevel5Total,
              ...res.data.result.map((item) => item.regularLevel5),
            ]);

            setCompanyName((prevCompanyName) => [
              ...prevCompanyName,
              ...res.data.result.map((item) => {
                // 한글 여부를 확인하여 슬라이스하는 길이 결정
                const sliceLength = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(item.company)
                  ? 2
                  : 3;
                if (item.company === "CHO부문") return "CHO";
                else if (item.company === "H&A본부") return "H&A";
                else if (item.company === "생산기술원") return "생기원";
                else if (item.company === "사내협력사") return "협력사";
                else return item.company.slice(0, sliceLength);
              }),
            ]);
          }
        }
      })
      .catch(() => {});
  };

  // 천 단위 구분자 포함한 숫자 포맷 함수
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // const getRegularData = () => {
  //   axios
  //     .post("/admin/api/find_regular_matrix_status", filter)
  //     .then((res) => {
  //       if (res.data.code === "0000") {
  //         if (res.data.result.length > 0) {
  //           // 데이터를 설정하기 전에 확인
  //           const regularHighRisk = res.data.result.map(
  //             (item) => item.highRiskLevel
  //           );
  //           const regularRiskTotal = res.data.result.map(
  //             (item) => item.regularRiskTotal
  //           );
  //           const regularLevel1 = res.data.result.map((item) => item.level1);
  //           const regularLevel2 = res.data.result.map((item) => item.level2);
  //           const regularLevel3 = res.data.result.map((item) => item.level3);
  //           const regularLevel4 = res.data.result.map((item) => item.level4);
  //           const regularLevel5 = res.data.result.map((item) => item.level5);

  //           // 데이터 설정
  //           setRegularHighRiskTotal((prevRegularHighRiskTotal) => [
  //             ...prevRegularHighRiskTotal,
  //             ...regularHighRisk,
  //           ]);
  // setRegularRiskTotal((prevRegularRiskTotal) => [
  //   ...prevRegularRiskTotal,
  //   ...regularRiskTotal,
  // ]);
  // setRegularLevel1Total((prevRegularLevel1Total) => [
  //   ...prevRegularLevel1Total,
  //   ...regularLevel1,
  // ]);
  // setRegularLevel2Total((prevRegularLevel2Total) => [
  //   ...prevRegularLevel2Total,
  //   ...regularLevel2,
  // ]);
  // setRegularLevel3Total((prevRegularLevel3Total) => [
  //   ...prevRegularLevel3Total,
  //   ...regularLevel3,
  // ]);
  // setRegularLevel4Total((prevRegularLevel4Total) => [
  //   ...prevRegularLevel4Total,
  //   ...regularLevel4,
  // ]);
  // setRegularLevel5Total((prevRegularLevel5Total) => [
  //   ...prevRegularLevel5Total,
  //   ...regularLevel5,
  // ]);
  //         }
  //       }
  //     })
  //     .catch(() => {});
  // };

  const data = {
    series: [
      {
        name: "수시",
        data: riskTotal,
        color: "#d00042", // 빨간색
      },
      {
        name: "정기",
        data: regularRiskTotal,
        color: "#585858", // 진회색
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "40%", // 그래프 두께 조절 (픽셀 단위)
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      fill: {
        colors: ["#d00042", "#585858"], // 빨간색과 진회색 설정
      },
      xaxis: {
        categories: companyName, // 가로축 레이블 설정
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          rotate: 0, // 가로축 레이블의 회전 각도 (0은 회전하지 않음)
          style: {
            fontSize: "7.5px", // 글자 크기를 조절
            fontFamily: "LGSmart_H",
            marginBottom: "10px",
          },
          maxHeight: 120,
        },
        margin: 0,
      },
      yaxis: {
        opposite: false,
        tickAmount: 7, // 세로축 10단위로 설정
        labels: {
          rotate: 0, // 가로축 레이블의 회전 각도 (0은 회전하지 않음)
          style: {
            fontSize: "12px", // 글자 크기를 조절
            fontFamily: "LGSmart_H",
          },
        },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const riskTotalTooltip = numberWithCommas(riskTotal[dataPointIndex]);
          const level1TotalTooltip = numberWithCommas(
            level1Total[dataPointIndex]
          );
          const level2TotalTooltip = numberWithCommas(
            level2Total[dataPointIndex]
          );
          const level3TotalTooltip = numberWithCommas(
            level3Total[dataPointIndex]
          );
          const level4TotalTooltip = numberWithCommas(
            level4Total[dataPointIndex]
          );
          const level5TotalTooltip = numberWithCommas(
            level5Total[dataPointIndex]
          );

          // 정기 데이터가 존재하는지 확인하고 가져옵니다.
          const regularRiskTotalTooltip = numberWithCommas(
            regularRiskTotal[dataPointIndex] || 0
          );
          const regularLevel1TotalTooltip = numberWithCommas(
            regularLevel1Total[dataPointIndex] || 0
          );
          const regularLevel2TotalTooltip = numberWithCommas(
            regularLevel2Total[dataPointIndex] || 0
          );
          const regularLevel3TotalTooltip = numberWithCommas(
            regularLevel3Total[dataPointIndex] || 0
          );
          const regularLevel4TotalTooltip = numberWithCommas(
            regularLevel4Total[dataPointIndex] || 0
          );
          const regularLevel5TotalTooltip = numberWithCommas(
            regularLevel5Total[dataPointIndex] || 0
          );

          return (
            '<div class="custom-tooltip"><div style="margin:10px; font-family: LGSmart_H;">' +
            '<span class="company" style="font-family: LGSmart_H; font-size: 12px">' +
            "수시 위험성평가 총 <b style='color: red'>" +
            riskTotalTooltip +
            "</b> 건" +
            "<hr style='margin-top: 5px; margin-bottom: 5px'>" +
            '<div class="high-risk" style="font-family: LGSmart_H; font-size: 12px;">' +
            "5등급 - <b>" +
            level5TotalTooltip +
            "</b>건<br>" +
            "4등급 - <b>" +
            level4TotalTooltip +
            "</b>건<br>" +
            "3등급 - <b>" +
            level3TotalTooltip +
            "</b>건<br>" +
            "2등급 - <b>" +
            level2TotalTooltip +
            "</b>건<br>" +
            "1등급 - <b>" +
            level1TotalTooltip +
            "</b>건" +
            "</div>" +
            "<br>" +
            '<span class="company" style="font-family: LGSmart_H; font-size: 12px">' +
            "정기 위험성평가 총 <b style='color: grey'>" +
            regularRiskTotalTooltip +
            "</b> 건" +
            "<hr style='margin-top: 5px; margin-bottom: 5px'>" +
            '<div class="high-risk" style="font-family: LGSmart_H; font-size: 12px;">' +
            "5등급 - <b>" +
            regularLevel5TotalTooltip +
            "</b>건<br>" +
            "4등급 - <b>" +
            regularLevel4TotalTooltip +
            "</b>건<br>" +
            "3등급 - <b>" +
            regularLevel3TotalTooltip +
            "</b>건<br>" +
            "2등급 - <b>" +
            regularLevel2TotalTooltip +
            "</b>건<br>" +
            "1등급 - <b>" +
            regularLevel1TotalTooltip +
            "</b>건" +
            "</div>"
          );
        },
      },
    },
  };

  // 년도 선택 시에 호출되는 함수
  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    // setFilter({ ...filter, searchYear: selectedYear });
    setSearchYear(selectedYear);
    setSelectedYear(selectedYear);
  };

  // 월 선택 시에 호출되는 함수
  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value, 10);
    // setFilter({ ...filter, searchMonth: selectedMonth });
    setSearchMonth(selectedMonth);
  };

  // 검색 버튼 클릭 시에 호출되는 함수
  const handleSearch = () => {
    // filter를 사용하여 검색 로직 수행
    setFilter({ ...filter, searchYear: selectedYear });
  };

  return (
    <div className="Column_component1">
      <Label>
        <span
          className="Label-1"
          style={{
            marginRight: "5px",
            position: "relative",
          }}
        >
          본부별 위험성평가 현황
        </span>
        {/* <StyledImage
          src={questionIcon}
          onMouseOver={() => setPopupVisible(true)}
          onMouseLeave={() => setPopupVisible(false)}
        ></StyledImage>{" "}
        <b>{popupVisible && <Popup>내용 입력</Popup>}</b> */}
      </Label>
      <Col style={{ display: "flex", alignItems: "center" }}>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          style={{
            marginRight: "5px",
            fontSize: "12px",
            fontFamily: "LGSmart_H",
          }}
          // defaultValue={currentYear}
          value={selectedYear} // 선택된 값을 상태 변수로 설정
          onChange={handleYearChange}
        >
          {/* <option value={null} selected>
            전체
          </option> */}
          {yearList.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </Input>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          style={{
            marginRight: "5px",
            fontSize: "12px",
            fontFamily: "LGSmart_H",
          }}
          onChange={handleMonthChange}
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
          onClick={handleSearch}
        />
      </Col>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={266}
      />
    </div>
  );
};

export default ColumnCards;

const StyledImage = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 0px 3px 0px;
  object-fit: contain;
`;
const Popup = styled.div`
  position: absolute;
  top: 165px;
  left: 1630px;
  width: 200px;
  height: 70px;
  background-color: #f8f1eb;
  border-radius: 5px;
  border: solid 1px #dcdcdc;
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 12px;
  font-family: LGSmart_H;
`;
