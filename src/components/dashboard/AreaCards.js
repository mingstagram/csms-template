import axios from "axios";
// import { Chart } from "chart.js";
import Chart from "react-apexcharts";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import searchBtn from "../../assets/images/Component 110.png";
import questionIcon from "../../assets/images/questionIcon.png";
import "../../styles/projectStyle.css";
import {
  getAllDivList,
  getCompList,
  getDeptList,
  getDivList,
} from "../../utils/CodeList";
import { getRiskDateList } from "../../utils/UtilList";
import styled from "styled-components";

const AreaCards = ({ filter, setFilter }) => {
  const [highRiskTotal, setHighRiskTotal] = useState({});
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const [searchMonth, setSearchMonth] = useState(12);
  const [searchYear, setSearchYear] = useState(new Date().getFullYear());
  // const [filter, setFilter] = useState({
  //   keyword: "",
  //   limit: 10,
  //   pageNum: 1,
  //   state: "1",
  //   workType: null,
  //   companyId: 0,
  //   divisionId: 0,
  //   departmentId: 0,
  //   searchYear: new Date().getFullYear(),
  //   searchMonth: null,
  // });
  const [companyList, setCompanyList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [companyId, setCompanyId] = useState(filter.companyId);
  const [divisionId, setDivisionId] = useState(filter.divisionId);
  const [departmentId, setDepartmentId] = useState(filter.department);
  const [selectedYear, setSelectedYear] = useState(filter.searchYear);
  const [selectedCompanyId, setSelectedCompanyId] = useState(filter.companyId);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    getMonthRiskData();
    getRiskDateList({ setYearList, setMonthList, setDayList });
    getCompList({ setCompanyList });
    // getAllDivList({ setDivisionList });
    getDivList({
      selectedCompanyId: filter.companyId,
      setDivisionList: setDivisionList,
    });
    getDeptList({
      selectedDivisionId: divisionId,
      setSelectedDepartmentList: setDepartmentList,
    });
    setSelectedYear(filter.searchYear);
    setSelectedCompanyId(filter.companyId);
    if (filter.init) {
      setDivisionId(0);
      setDepartmentId(0);
      if (divisionSelectRef.current) {
        divisionSelectRef.current.selectedIndex = 0;
      }
      if (departmentSelectRef.current) {
        departmentSelectRef.current.selectedIndex = 0;
      }
      setFilter({
        ...filter,
        init: false,
      });
    }
  }, [
    currentYear,
    currentMonth,
    filter,
    divisionId,
    companyId,
    filter.searchYear,
    filter.companyId,
  ]);

  const getMonthRiskData = () => {
    const requestData = {
      ...filter, // 기존 filter 값들
      divisionId: divisionId,
      departmentId: departmentId,
    };

    axios
      .post("/admin/api/find_freq_month_risk_data", requestData)
      .then((res) => {
        if (res.data.code === "0000") {
          setHighRiskTotal(res.data.result);
        }
      })
      .catch(() => {});
  };

  // useRef를 사용하여 DOM 요소 참조 생성
  const divisionSelectRef = useRef(null);
  const departmentSelectRef = useRef(null);

  // 년도 선택 시에 호출되는 함수
  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSearchYear(selectedYear);
    setSelectedYear(selectedYear);
    setDivisionId(0);
    setDepartmentId(0);
    if (divisionSelectRef.current) {
      divisionSelectRef.current.selectedIndex = 0;
    }
    if (departmentSelectRef.current) {
      departmentSelectRef.current.selectedIndex = 0;
    }
  };

  const handleCompanyChange = (event) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setCompanyId(selectedCompanyId);
    setDivisionId(0);
    setDepartmentId(0); // divisionSelect와 departmentSelect를 초기화
    if (divisionSelectRef.current) {
      divisionSelectRef.current.selectedIndex = 0;
    }
    if (departmentSelectRef.current) {
      departmentSelectRef.current.selectedIndex = 0;
    }
  };

  const handleDivisionChange = (event) => {
    const selectedDivisionId = parseInt(event.target.value, 10);
    setDivisionId(selectedDivisionId);
    setDepartmentId(0);
    // departmentSelect를 초기화
    if (departmentSelectRef.current) {
      departmentSelectRef.current.selectedIndex = 0;
    }
  };

  const handleDepartment = (event) => {
    const selectedDeptId = parseInt(event.target.value, 10);
    setDepartmentId(selectedDeptId);
  };

  // 검색 버튼 클릭 시에 호출되는 함수
  const handleSearch = () => {
    // filter를 사용하여 검색 로직 수행
    console.log(filter);
    setFilter({
      ...filter,
      searchYear: selectedYear,
    });
  };

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const dataValues = [
    highRiskTotal?.month1Total ?? 0,
    highRiskTotal?.month2Total ?? 0,
    highRiskTotal?.month3Total ?? 0,
    highRiskTotal?.month4Total ?? 0,
    highRiskTotal?.month5Total ?? 0,
    highRiskTotal?.month6Total ?? 0,
    highRiskTotal?.month7Total ?? 0,
    highRiskTotal?.month8Total ?? 0,
    highRiskTotal?.month9Total ?? 0,
    highRiskTotal?.month10Total ?? 0,
    highRiskTotal?.month11Total ?? 0,
    highRiskTotal?.month12Total ?? 0,
  ];

  const categories =
    filter.searchYear !== new Date().getFullYear()
      ? months
      : months.slice(0, currentMonth);
  const data =
    filter.searchYear !== new Date().getFullYear()
      ? dataValues
      : dataValues.slice(0, currentMonth);

  const chartoptions = {
    series: [
      {
        name: "수시",
        data: data,
        color: "#d00042",
        strokeColors: "#d00042", // Marker border color
        markers: {
          size: 5,
          colors: ["#d00042"], // 빨간색 마커
          strokeColors: "#d00042",
          strokeWidth: 2,
          hover: {
            size: 6,
            fillColors: ["#d00042"],
          },
        },
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "straight",
        width: 1,
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: "10px", // Adjust the font size of x-axis labels
            fontFamily: "LGSmart_H", // Change the font family
          },
        },
        axisTicks: {
          show: false, // Hide the axis ticks
        },
        axisBorder: {
          show: false, // Hide the axis border
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "10px", // Adjust the font size of x-axis labels
            fontFamily: "LGSmart_H", // Change the font family
          },
        },
      },
      // markers: {
      //   size: 5, // Marker size
      //   colors: ["#ffffff"], // Marker color (can be an array if different colors are needed)
      //   strokeColors: "#d00042", // Marker border color
      //   strokeWidth: 2, // Marker border width
      //   hover: {
      //     size: 6, // Marker size on hover
      //     fillColors: ["#d00042"],
      //   },
      // },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          // const companyNameTooltip = companyName[dataPointIndex];
          const highRiskTotalTooltip =
            highRiskTotal[`month${dataPointIndex + 1}Total`];
          const level1TotalTooltip =
            highRiskTotal[`month${dataPointIndex + 1}Level1`];
          const level2TotalTooltip =
            highRiskTotal[`month${dataPointIndex + 1}Level2`];
          const level3TotalTooltip =
            highRiskTotal[`month${dataPointIndex + 1}Level3`];
          const level4TotalTooltip =
            highRiskTotal[`month${dataPointIndex + 1}Level4`];
          const level5TotalTooltip =
            highRiskTotal[`month${dataPointIndex + 1}Level5`];

          return (
            '<div class="custom-tooltip"><div style="margin:10px; font-family: LGSmart_H;">' +
            '<span class="company" style="font-family: LGSmart_H; font-size: 12px">' +
            "Freq Risk 총 <b style='color: red'>" +
            highRiskTotalTooltip +
            "</b> 건 " +
            "</span>" +
            "<hr style='margin-top: 5px; margin-bottom: 5px'>" +
            '<span class="high-risk" style="font-family: LGSmart_H; font-size: 12px">' +
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
            "</b>건</span>" +
            "</div></div>"
          );
        },
      },
    },
  };

  return (
    <div className="Area_component1">
      <Label>
        <span
          className="Label-2"
          style={{ marginRight: "5px", position: "relative" }}
        >
          월별 수시위험성평가 현황
        </span>
        {/* <StyledImage
          src={questionIcon}
          onMouseOver={() => setPopupVisible(true)}
          onMouseLeave={() => setPopupVisible(false)}
        ></StyledImage>
        <b>{popupVisible && <Popup>내용 입력</Popup>}</b> */}
      </Label>
      <Row style={{ marginBottom: "5px" }}>
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
            value={selectedYear} // 선택된 값을 상태 변수로 설정
            onChange={handleYearChange}
          >
            {yearList.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </Input>
          <Input
            sm={8}
            id="exampleSelect"
            name="select"
            type="select"
            style={{
              marginRight: "10px",
              fontSize: "12px",
              fontFamily: "LGSmart_H",
              alignContent: "center",
            }}
            value={selectedCompanyId}
            onChange={(event) => handleCompanyChange(event)}
            className="custom-select"
            disabled
          >
            <option key={0} value={0} selected>
              본부 전체
            </option>
            {companyList.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Input>
          {/* <Button color="secondary">link</Button> */}
        </Col>
      </Row>
      <Row>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Input
            sm={4}
            id="divisionSelect"
            name="select"
            type="select"
            style={{
              marginRight: "5px",
              fontSize: "12px",
              fontFamily: "LGSmart_H",
            }}
            onChange={(event) => handleDivisionChange(event)}
            value={divisionId}
            ref={divisionSelectRef} // useRef를 통해 DOM 요소 참조
          >
            <option key={0} value={0} selected>
              담당 전체
            </option>
            {divisionList.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </Input>
          <Input
            sm={4}
            id="departmentSelect"
            name="select"
            type="select"
            style={{
              marginRight: "5px",
              fontSize: "12px",
              fontFamily: "LGSmart_H",
            }}
            onChange={(event) => handleDepartment(event)}
            value={departmentId}
            ref={departmentSelectRef} // useRef를 통해 DOM 요소 참조
          >
            <option key={0} value={0} selected>
              부서 전체
            </option>
            {departmentList.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
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
      </Row>
      {/* <ReactApexChart
          options={data.options}
          series={data.series}
          type="area"
          height={265}
        /> */}
      <Chart
        type="area"
        width="100%"
        height={266}
        options={chartoptions.options}
        series={chartoptions.series}
      ></Chart>
    </div>
  );
};

export default AreaCards;

const StyledImage = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 0px 3px 0px;
  object-fit: contain;
`;

const Popup = styled.div`
  position: absolute;
  top: 565px;
  left: 1650px;
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
