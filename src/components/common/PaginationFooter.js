import { useAtom } from "jotai";
import React from "react";
import { Button } from "reactstrap";
import { PaginationData } from "../../data/atom";
import { RightArrow } from "../../assets/images/Component 106.png";
import { LeftArrow } from "../../assets/images/Component 107.png";
import "../../styles/projectStyle.css";
import { useNavigate } from "react-router-dom";

const PaginationFooter = ({ filter, pageInfo }) => {
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

  const arr = [...new Array(numPages)].map((_, i) => i + 1);

  const handleClick = () => {
    const dataToSend = { state: filter.companyId };
    navigate("/matrixList", { state: dataToSend });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: "13px",
        height: "40px",
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
            paginationData.setPage(filter.pageNum - 1);
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
            paginationData.setPage(filter.pageNum + 1);
          }}
          disabled={
            arr.slice(firstNum - 1, lastNum).length === 0 ||
            filter.pageNum === numPages
          }
          outline
        >
          <b>&gt;</b>
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;
