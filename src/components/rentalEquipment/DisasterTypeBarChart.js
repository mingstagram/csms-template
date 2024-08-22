import React from "react";
import ReactApexChart from "react-apexcharts";

const DisasterTypeBarChart = ({ chartData }) => {
  const categories = chartData.map((item) => item.category);
  const values = chartData.map((item) => item.value);

  const options = {
    chart: {
      type: "bar",
      height: 300,
      width: 650,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "20%", // 막대의 굵기를 20%로 설정
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    fill: {
      opacity: 1,
      colors: ["#e23465"],
    },
    title: {
      align: "center",
    },
  };

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
        height={300}
        width={650}
      />
    </div>
  );
};

export default DisasterTypeBarChart;
