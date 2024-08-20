import React from "react";
import ReactApexChart from "react-apexcharts";

const DashboardBarChart = ({ chartData }) => {
  // 카테고리와 데이터를 분리
  const categories = chartData.map((item) => item.category);
  const seriesData1 = chartData.map((item) => item.value1); // 첫 번째 값
  const seriesData2 = chartData.map((item) => item.value2); // 두 번째 값

  const chartOptions = {
    series: [
      {
        name: "Series 1",
        data: seriesData1, // 첫 번째 시리즈 데이터
      },
      {
        name: "Series 2",
        data: seriesData2, // 두 번째 시리즈 데이터
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 215, // 차트 높이
        width: 530, // 차트 너비
        fontFamily: "LGSmart_H", // 폰트 패밀리 설정
      },
      plotOptions: {
        bar: {
          horizontal: false, // 수평 막대 그래프가 아닌 수직 막대 그래프
          columnWidth: "55%",
          endingShape: "rounded", // 막대의 끝 부분 모양
        },
      },
      dataLabels: {
        enabled: false, // 데이터 레이블 표시 여부
      },
      xaxis: {
        categories: categories, // 카테고리
        labels: {
          style: {
            fontFamily: "LGSmart_H", // 폰트 패밀리 설정
            fontSize: "11px", // 폰트 크기 설정
            colors: "#888", // 텍스트 색상 설정
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "LGSmart_H", // 폰트 패밀리 설정
            fontSize: "12px", // 폰트 크기 설정
          },
        },
      },
      colors: ["#e23465", "#797979"], // 각 시리즈 색상
      legend: {
        fontFamily: "LGSmart_H", // 폰트 패밀리 설정
        fontSize: "12px", // 폰트 크기 설정
      },
      tooltip: {
        style: {
          fontFamily: "LGSmart_H", // 폰트 패밀리 설정
          fontSize: "12px", // 폰트 크기 설정
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        height={222}
        width={530}
      />
    </div>
  );
};

export default DashboardBarChart;
