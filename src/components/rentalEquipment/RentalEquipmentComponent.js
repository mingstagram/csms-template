import React, { useState } from "react";
import searchBtn from "../../assets/images/Component 110.png";
import component210 from "../../assets/images/component-210.png";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import RentalEquipmentBarChart from "./RentalEquipmentBarChart";
import DisasterTypeBarChart from "./DisasterTypeBarChart";
import RentalCreateModal from "./RentalCreateModal";

const RentalEquipmentComponent = () => {
  const rows = Array.from({ length: 10 });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const rentalEquipmentData = [
    { category: "Rental 1", value: 30 },
    { category: "Rental 2", value: 40 },
    { category: "Rental 3", value: 45 },
    { category: "Rental 4", value: 50 },
    { category: "Rental 5", value: 49 },
    { category: "Rental 6", value: 60 },
    { category: "Rental 7", value: 70 },
    { category: "Rental 8", value: 91 },
    { category: "Rental 9", value: 125 },
    { category: "Rental 10", value: 130 },
    { category: "Rental 11", value: 140 },
    { category: "Rental 12", value: 150 },
    { category: "Rental 13", value: 160 },
    { category: "Rental 14", value: 170 },
  ];

  const disasterTypeData = [
    { category: "Partner 1", value: 24 },
    { category: "Partner 2", value: 6 },
    { category: "Partner 3", value: 2 },
    { category: "Partner 4", value: 9 },
    { category: "Partner 5", value: 3 },
    { category: "Partner 6", value: 1 },
    { category: "Partner 7", value: 4 },
    { category: "Partner 8", value: 4 },
    { category: "Partner 9", value: 11 },
    { category: "Partner 10", value: 1 },
  ];

  return (
    <div className="d-flex" style={{ fontFamily: "LGSmart_H" }}>
      <div className="Rental_Component1">
        <div className="d-flex">
          <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            임대설비 현황
          </span>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ paddingTop: " 10px" }}
        >
          <div>
            <Button
              color="secondary"
              style={{
                width: "140px",
                height: "30px",
                backgroundColor: "#edeef2",
                borderColor: "white",
                color: "black",
                fontSize: "12px",
                fontFamily: "LGSmart_H",
                marginRight: "13px",
              }}
            >
              샘플파일 다운로드
            </Button>
            <Button
              color="secondary"
              style={{
                width: "140px",
                height: "30px",
                backgroundColor: "#e23465",
                borderColor: "white",
                color: "white",
                fontSize: "12px",
                fontFamily: "LGSmart_H",
              }}
              onClick={openModal}
            >
              등록
            </Button>
          </div>
          <div className="d-flex">
            <Input
              type="select"
              style={{
                height: "30px",
                width: "146px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              <option key={0} value={0}>
                업체명 선택
              </option>
            </Input>
            <div style={{ margin: "-7px 0 0 7px " }}>
              <img
                src={searchBtn}
                alt="Search"
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
                }}
                // onClick={handleSearch}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            height: "72vh",
            paddingTop: "10px",
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
                  className="notice-table notice-table-title"
                  style={{ width: "15%" }}
                >
                  업체명
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "20%" }}
                >
                  임대설비
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "10%", textAlign: "center" }}
                >
                  수량
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "35%", textAlign: "center" }}
                >
                  대여기계 안전보건조치 확인서
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "10%", textAlign: "center" }}
                >
                  등록일
                </th>
                <th
                  className="notice-table notice-table-title"
                  style={{ width: "10%", textAlign: "center" }}
                >
                  수정일
                </th>
              </tr>
              {rows.map((_, index) => (
                <tr key={index} className="table-row">
                  <td className="main-table">큐원에이트</td>
                  <td className="main-table">
                    <div className="d-flex">
                      <div className="Ellipse-368">
                        <span className="N">N</span>
                      </div>
                      <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                        로봇랩핑기
                      </span>
                    </div>
                  </td>
                  <td className="main-table" style={{ textAlign: "center" }}>
                    1
                  </td>
                  <td
                    className="main-table"
                    style={{ textAlign: "center", cursor: "pointer" }}
                  >
                    <img src={component210} />
                  </td>
                  <td className="main-table" style={{ textAlign: "center" }}>
                    24.08.21
                  </td>
                  <td className="main-table" style={{ textAlign: "center" }}>
                    24.08.21
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "13px",
            height: "40px",
            paddingTop: "10px",
          }}
        >
          <div className="pageFooter">
            {/* {pageInfo.currentPage}페이지 {pageInfo.firstPage}-{pageInfo.lastPage}{" "} */}
            1페이지 1-15 &nbsp;&nbsp;
          </div>
          <div style={{ marginRight: "auto" }}>
            <button
              className="Rectangle-331"
              style={{ paddingTop: "2px" }}
              //   onClick={() => {
              //     paginationData.setPage(filter.pageNum - 1);
              //   }}
              //   disabled={
              //     arr.slice(firstNum - 1, lastNum).length === 0 ||
              //     filter.pageNum === 1
              //   }
              outline
            >
              <b>{"<"}</b>
            </button>
            &nbsp;
            <button
              className="Rectangle-332"
              style={{ paddingTop: "2px" }}
              //   onClick={() => {
              //     paginationData.setPage(filter.pageNum + 1);
              //   }}
              //   disabled={
              //     arr.slice(firstNum - 1, lastNum).length === 0 ||
              //     filter.pageNum === numPages
              //   }
              outline
            >
              <b>&gt;</b>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "8px",
          display: "flex", // Flexbox 사용
          alignItems: "center", // 세로 가운데 정렬
          marginRight: "-3px",
          marginLeft: "3px",
        }}
      ></div>
      <div className="Rental_Component2">
        <div
          style={{
            flexDirection: "column",
            height: "50%", // 전체 높이 설정
          }}
        >
          <div className="d-flex">
            <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              재해유형별 개선현황
            </span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <DisasterTypeBarChart chartData={disasterTypeData} />
          </div>
        </div>

        <div
          style={{
            flexDirection: "column",
            height: "50%", // 전체 높이 설정
          }}
        >
          <div className="d-flex">
            <div className="Rectangle-346" style={{ marginRight: "5px" }}></div>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              임대설비별 임대 현황
            </span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <RentalEquipmentBarChart chartData={rentalEquipmentData} />
          </div>
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      <RentalCreateModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default RentalEquipmentComponent;
