import React, { useState } from "react";
import closeFill from "../../assets/images/systems-close-fill@2x.png";
import plusIconNoBackgroundWhite from "../../assets/images/plus-icon-nobackground-white.png";
import styled from "styled-components";
import { Button, Input } from "reactstrap";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 투명한 회색 배경
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  z-index: 1001; // 모달창의 z-index는 배경보다 더 높게 설정
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const RentalCreateModal = ({ isOpen, onClose }) => {
  const [rows, setRows] = useState([{ id: 1 }]);

  // 버튼 클릭 시 row를 추가하는 함수
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  };

  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <ModalBackground>
      <ModalContainer>
        <div
          className="d-flex justify-content-end"
          style={{ marginRight: "-25px" }}
        >
          <img
            src={closeFill}
            onClick={() => {
              onClose();
              setRows([{ id: 1 }]);
            }}
            style={{ height: "26px", width: "26px", cursor: "pointer" }}
          />
        </div>
        <div className="d-flex">
          <div className="Rectangle-347" style={{ marginRight: "5px" }}></div>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            임대설비 현황 관리
          </span>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ paddingTop: "20px" }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            테크로스 환경
          </span>
          <Button
            onClick={addRow}
            style={{
              width: "74px",
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#439099",
              border: "0px",
              fontSize: "12px",
              padding: "3px 3px 2px 0px",
            }}
          >
            <img
              src={plusIconNoBackgroundWhite}
              style={{ width: "14px", height: "14px", marginTop: "-1px" }}
              alt="Plus Icon"
            />{" "}
            <span style={{ marginTop: "5px" }}>추가</span>
          </Button>
        </div>
        <div className="Rectangle-418" style={{ overflowY: "auto" }}>
          {rows.map((_, index) => (
            <div className="d-flex" style={{ marginTop: "10px" }}>
              <Input
                type="select"
                style={{ width: "210px", height: "30px", fontSize: "12px" }}
              >
                <option key={0} value={0}>
                  임대장비 선택
                </option>
              </Input>
              <Input
                type="text"
                style={{
                  width: "120px",
                  height: "30px",
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
                placeholder="수량 입력"
              />
            </div>
          ))}
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ paddingTop: "20px" }}
        >
          <Button
            style={{
              width: "119px",
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#edeef2",
              border: "0px",
              fontSize: "12px",
              color: "#444",
            }}
          >
            <span style={{ marginTop: "0px" }}>삭제</span>
          </Button>
          <Button
            style={{
              width: "119px",
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#edeef2",
              border: "0px",
              fontSize: "12px",
              color: "#444",
            }}
          >
            <span style={{ marginTop: "0px" }}>수정</span>
          </Button>
          <Button
            style={{
              width: "119px",
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "#e23465",
              border: "0px",
              fontSize: "12px",
              color: "white",
            }}
          >
            <span style={{ marginTop: "0px" }}>등록</span>
          </Button>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default RentalCreateModal;
