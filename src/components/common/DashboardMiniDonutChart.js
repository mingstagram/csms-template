import React from "react";
import Chart from "react-apexcharts";

const DashboardMiniDonutChart = ({ title, data, count }) => {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
    legend: {
      show: false, // 레이블 목록을 숨깁니다.
    },
    dataLabels: {
      enabled: false, // 각 항목에 데이터 레이블 표시를 숨깁니다.
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "12px",
              fontFamily: "LGSmart_H",
              fontWeight: "bold",
              color: "#000",
              offsetY: 5, // 세로 가운데 정렬을 위해 Y축 오프셋 설정
            },
            value: {
              show: false, // 수치를 숨깁니다.
            },
            total: {
              show: true,
              label: `${count}건`, // 여기서 count 값을 설정하여 "00건" 형태로 표시
              fontSize: "12px",
              fontFamily: "LGSmart_H",
              fontWeight: "bold",
              color: "#000",
              formatter: () => `${count}건`, // 가운데 표시할 텍스트 설정
            },
          },
        },
      },
    },
  };

  const series = data; // 예: [44, 55, 13, 33]

  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "LGSmart_H",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {title}
      </p>
      <Chart
        options={options}
        series={series}
        type="donut"
        width={130}
        height={130}
      />
    </div>
  );
};

export default DashboardMiniDonutChart;
