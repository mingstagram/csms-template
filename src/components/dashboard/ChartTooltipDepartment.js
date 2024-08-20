import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartTooltipDepartment = ({ ranking, filter, clickMatrix }) => {
  const [levelByCompany, SetLevelByCompany] = useState([]);
  const defaultData = [100];
  const value = ranking.departmentId;
  const [filterPopup, setFilterPopup] = useState({
    ...filter,
    sort: "department",
    departmentId: value,
  });

  useEffect(() => {
    getLevelData();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getLevelData = () => {
    axios
      .post("/admin/api/find_level_by_div", filterPopup)
      .then((res) => {
        if (res.data.code === "0000") {
          SetLevelByCompany(res.data.result);
        }
      })
      .catch(() => {});
  };
  //   const data = [111, 222, 333, 444, 555];
  const data = [
    levelByCompany?.level5 || 0,
    levelByCompany?.level4 || 0,
    levelByCompany?.level3 || 0,
    levelByCompany?.level2 || 0,
    levelByCompany?.level1 || 0,
  ];
  const options = {
    chart: {
      type: "donut",
    },
    title: {
      text: levelByCompany.department + " 통계",
      align: "center",
      style: {
        fontSize: "14px", // 원하는 폰트 크기
        fontFamily: "LGSmart_H", // 원하는 폰트 패밀리
        textAlign: "center", // 제목 가운데 정렬
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
        },
      },
    },
    colors: ["#d00042", "#FF8000", "#FFBF00", "#585858", "#BDBDBD"],
    labels: ["5등급", "4등급", "3등급", "2등급", "1등급"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        // 숫자 포맷 설정: 천 단위마다 쉼표
        if (typeof val === "number") {
          return numberWithCommas(opts.w.globals.series[opts.seriesIndex]);
        }
        return val; // 다른 데이터 라벨은 그대로 반환
      },

      style: {
        fontFamily: "LGSmart_H",
        fontSize: "12px", // 데이터 라벨의 폰트 크기
        colors: ["#000", "#000", "#000", "#FFF", "#000"], // 각 데이터 라벨의 기본 색상
      },
      dropShadow: {
        enabled: false, // 그림자 효과를 비활성화
      },
    },
    legend: {
      position: "right", // 범례를 오른쪽에 표시
      fontFamily: "LGSmart_H", // 범례에 사용할 폰트 패밀리 설정
      fontSize: "14px", // 범례의 폰트 크기 설정
      labels: {
        colors: undefined, // 각 범례 라벨의 기본 색상
        useSeriesColors: true, // 범례 라벨이 시리즈의 색상을 사용하도록 설정
      },
      markers: {
        width: 12,
        height: 12,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 50,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div onClick={clickMatrix}>
      <ReactApexChart
        options={options}
        series={data}
        type="donut"
        height={140}
      />
    </div>
  );
};

export default ChartTooltipDepartment;
