import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { PaginationData } from "../../data/atom";
import { RightArrow } from "../../assets/images/Component 106.png";
import { LeftArrow } from "../../assets/images/Component 107.png";
import "../../styles/projectStyle.css";
import plus_img from "../../assets/images/Component 148.png";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const PaginationMatrixList = ({
  filter,
  setFilter,
  pageInfo,
  onClick,
  titleLabel,
  stateSort,
  selectedCheckbox,
  setSelectedCheckbox,
  pageNum,
}) => {
  const navigate = useNavigate();
  const [paginationData] = useAtom(PaginationData);
  const numPages = Math.ceil(paginationData.countAll / filter.limit);
  let firstNum =
    filter.pageNum % 5 === 0
      ? filter.pageNum - 4
      : filter.pageNum - (filter.pageNum % 5) + 1;
  let lastNum =
    filter.pageNum % 5 === 0
      ? filter.pageNum
      : filter.pageNum - (filter.pageNum % 5) + 5;

  const handleCreateClick = () => {
    navigate("/matrixList/create", {
      state: {
        companyId: filter.companyId,
        titleLabel: titleLabel,
        divisionId: filter.divisionId,
        departmentId: filter.departmentId,
        stateSort: stateSort,
        matrixFilter: filter,
      },
    });
  };

  const handlePageChange = (pageNum) => {
    // 선택된 체크박스 ID 목록과 함께 필터 정보를 업데이트하여 다음 페이지로 전달
    const updatedFilter = {
      ...filter,
      selectedCheckbox: selectedCheckbox,
      pageNum: pageNum,
    };
    // 필터 정보를 업데이트한 후 페이지 이동
    setFilter(updatedFilter);
    paginationData.setPage(pageNum);
  };

  useEffect(() => {
    // isCheckboxChecked 값이 변경될 때마다 페이지 번호를 1로 설정
    setSelectedCheckbox(selectedCheckbox);
  }, [paginationData]);

  const arr = [...new Array(numPages)].map((_, i) => i + 1);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: "13px",
        marginTop: "10px",
      }}
    >
      <div className="pageFooter">
        {pageInfo.currentPage}페이지 {pageInfo.firstPage}-{pageInfo.lastPage}{" "}
        &nbsp;&nbsp;
      </div>
      <div style={{ marginRight: "auto" }}>
        <button
          className="Rectangle-331"
          onClick={() => {
            handlePageChange(filter.pageNum - 1);
          }}
          disabled={
            arr.slice(firstNum - 1, lastNum).length === 0 ||
            filter.pageNum === 1
          }
          outline
        >
          <b>{"<"}</b>
        </button>
        &nbsp;
        <button
          className="Rectangle-332"
          onClick={() => {
            handlePageChange(filter.pageNum + 1);
          }}
          disabled={
            arr.slice(firstNum - 1, lastNum).length === 0 ||
            filter.pageNum === numPages
          }
          outline
        >
          <b>&gt;</b>
        </button>
        <span
          className="Matrix_List_Title1"
          style={{
            color: "black",
            fontFamily: "LGSmart_H",
            fontSize: "12px",
            marginLeft: "20px",
          }}
        >
          {" "}
          총 {paginationData.countAll}개
        </span>
      </div>
      <div>
        <Button
          color="secondary" // 기존에는 "success"였음
          style={{
            marginRight: "10px",
            width: "140px",
            height: "36px",
            backgroundColor: "#edeef2",
            borderColor: "#edeef2",
            color: "black",
            fontSize: "14px",
            fontFamily: "LGSmart_H",
          }}
          onClick={onClick}
        >
          삭제하기
        </Button>
        <Button
          color="secondary" // 기존에는 "success"였음
          style={{
            width: "180px",
            height: "36px",
            backgroundColor: "#bb0841",
            borderColor: "#bb0841",
            color: "white",
            fontSize: "14px",
            fontFamily: "LGSmart_H",
          }}
          onClick={handleCreateClick}
        >
          <StyledImage src={plus_img} alt="Plus Image" /> 신규 작성하기
        </Button>
      </div>
    </div>
  );
};

export default PaginationMatrixList;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
`;
