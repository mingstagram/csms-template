import React from "react";
import ReactApexChart from "react-apexcharts";

const RentalEquipmentBarChart = ({ chartData }) => {
  // X축 라벨과 Y축 데이터를 추출
  const categories = chartData.map((item) => item.category);
  const values = chartData.map((item) => item.value);

  // ApexCharts 설정
  const options = {
    chart: {
      type: "bar",
      height: 380,
      width: 600,
    },
    plotOptions: {
      bar: {
        horizontal: false, // 수직 막대 차트
        columnWidth: "20%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {},
    fill: {
      opacity: 1,
      colors: ["#439099"], // 막대 색상 설정
    },
    title: {
      align: "center",
    },
  };

  // 차트에 표시할 데이터
  const series = [
    {
      name: "Value",
      data: values,
    },
  ];

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={380}
        width={650}
      />
    </div>
  );
};

export default RentalEquipmentBarChart;
