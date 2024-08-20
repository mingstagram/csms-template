import React from "react";
import ReactApexChart from "react-apexcharts";

const DashboardDonutChart = ({ data }) => {
  const options = {
    // 데이터 시리즈
    options: {
      plotOptions: {
        pie: {
          donut: {
            size: "40%",
          },
        },
      },
      chart: {
        type: "donut", // 도넛 차트
        fontFamily: "LGSmart_H", // 폰트 패밀리 설정
      },
      labels: [
        "Category A",
        "Category B",
        "Category C",
        "Category D",
        "Category E",
        "Category F",
        "Category G",
        "Category H",
        "Category I",
        "Category J",
      ], // 각 항목의 레이블
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "LGSmart_H", // 폰트 패밀리 설정
          fontSize: "12px", // 폰트 크기 설정
        },
        formatter: function (val, opts) {
          const label = opts.w.globals.labels[opts.seriesIndex]; // 레이블 이름 가져오기
          const quantity = opts.w.globals.series[opts.seriesIndex]; // 수량 가져오기
          return `${label} ${quantity}`; // "이름 수량" 형식으로 반환
        },
      },
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
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options.options}
        series={data}
        type="donut"
        height={200}
      />
    </div>
  );
};

export default DashboardDonutChart;
