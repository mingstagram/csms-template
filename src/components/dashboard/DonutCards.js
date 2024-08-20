import { Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import axios from "axios";
import { color } from "chart.js/helpers";

const DonutCards = ({ levelByCompany, onCardClick, filter }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [harmfulFilter, setHarmfulFilter] = useState({
    ...filter,
  });
  const [harmfulClassficationCompanyList, setHarmfulClassficationCompanyList] =
    useState([]);

  const handleMouseOver = (grade) => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  // 본부별 위험요인 리스트
  const getHarmfulClassificationByCompany = ({ companyId, curRiskGrade }) => {
    setHarmfulFilter({
      ...filter,
      companyId,
      curRiskGrade,
    });
    axios
      .post("/admin/api/find_harmful_classification_company", {
        ...filter,
        companyId,
        curRiskGrade,
      })
      .then((res) => {
        if (res.data.code === "0000") {
          setHarmfulClassficationCompanyList(res.data.result);
        }
      })
      .catch(() => {});
  };
  const data = {
    series: [
      levelByCompany.level5,
      levelByCompany.level4,
      levelByCompany.level3,
      levelByCompany.level2,
      levelByCompany.level1,
    ],
    options: {
      chart: {
        type: "donut",
      },
      title: {
        text: levelByCompany.company,
        style: {
          fontSize: "14px", // 제목의 폰트 크기
          fontFamily: "LGSmart_H",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "40%",
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
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const label = w.globals.labels[seriesIndex];
          const color = w.config.colors[seriesIndex];
          const textColor = label === "2등급" ? "#FFF" : "#000";

          // 데이터 값 포맷: 천 단위 쉼표 추가
          const formattedValue = numberWithCommas(series[seriesIndex]);

          return `<div style="padding: 5px; color: ${textColor}; background-color: ${color}; font-family: LGSmart_H; font-size: 12px; border-radius: 5px;">
                    <strong>${label}: ${formattedValue}</strong>
                  </div>`;
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
              fontFamily: "LGSmart_H", // 모바일 버전에서도 같은 폰트 패밀리 사용
              fontSize: "12px", // 모바일에서도 같은 폰트 크기 사용
            },
          },
        },
      ],
      annotations: {
        text: {
          x: "50%",
          y: "50%",
          text: levelByCompany.company,
          fontSize: "12px", // 도넛 내부 텍스트의 폰트 크기
          fontFamily: "LGSmart_H",
          textAlign: "center",
        },
      },
    },
  };

  // 천 단위 구분자 포함한 숫자 포맷 함수
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      className="Donut_component1"
      onMouseOver={() => {
        handleMouseOver("1등급");
      }}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
    >
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="donut"
        height={155}
      />
    </div>
  );
};

export default DonutCards;
