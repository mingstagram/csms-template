import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { Button } from "reactstrap";
import { PaginationData } from "../../data/atom";
import { RightArrow } from "../../assets/images/Component 106.png";
import { LeftArrow } from "../../assets/images/Component 107.png";
import "../../styles/projectStyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaginationDataroom = ({
  filter,
  setFilter,
  pageInfo,
  deleteButton,
  handleMultiFileDownload,
  selectedCheckbox,
  setSelectedCheckbox,
  selectedCheckboxFiles,
  setSelectedCheckboxFiles,
}) => {
  const [paginationData] = useAtom(PaginationData);
  const sessionStorage = window.sessionStorage;
  const departmentId = sessionStorage.getItem("departmentId");
  const username = sessionStorage.getItem("username");
  const authority = sessionStorage.getItem("authority");
  const midAuthority = sessionStorage.getItem("midAuthority");
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

  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // 파일 상태 업데이트 또는 필요한 다른 작업 수행
    if (!file) {
      alert("Please select a file.");
      return;
    }
    // 파일 용량 체크
    if (file.size > 50 * 1024 * 1024) {
      // 50MB를 bytes 단위로 변환
      alert("파일 크기는 50MB를 넘길 수 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("departmentId", username === "admin" ? 0 : departmentId);
    // setShowModal(true); // 모달 창 열기

    try {
      // 파일 업로드 요청
      const res = await axios.post("/dataroom/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드 시 Content-Type 설정
        },
      });

      if (res.data.code === "0000") {
        // setShowModal(false); // 모달 창 닫기
        alert("업로드 완료");
      } else {
        // setShowModal(false); // 모달 창 닫기
        alert(res.data.msg);
      }
    } catch (error) {
      // setShowModal(false); // 모달 창 닫기
      alert("업로드 실패 - 관리자 문의");
    } finally {
      window.location.reload();
    }
  };

  const handlePageChange = (pageNum) => {
    // 선택된 체크박스 ID 목록과 함께 필터 정보를 업데이트하여 다음 페이지로 전달
    const updatedFilter = {
      ...filter,
      selectedCheckbox: selectedCheckbox,
      selectedCheckboxFiles: selectedCheckboxFiles,
      pageNum: pageNum,
    };
    // 필터 정보를 업데이트한 후 페이지 이동
    setFilter(updatedFilter);
    paginationData.setPage(pageNum);
  };

  useEffect(() => {
    // isCheckboxChecked 값이 변경될 때마다 페이지 번호를 1로 설정
    setSelectedCheckbox(selectedCheckbox);
    setSelectedCheckboxFiles(selectedCheckboxFiles);
  }, [paginationData]);

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
      </div>
      <div>
        <form encType="multipart/form-data">
          {authority === "Y" && (
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
              onClick={() => {
                deleteButton();
              }}
            >
              선택 삭제
            </Button>
          )}

          <Button
            color="secondary" // 기존에는 "success"였음
            style={{
              marginRight: "10px",
              width: "180px",
              height: "36px",
              backgroundColor: "#edeef2",
              borderColor: "#edeef2",
              color: "black",
              fontSize: "14px",
              fontFamily: "LGSmart_H",
            }}
            onClick={handleMultiFileDownload}
          >
            선택 다운로드
          </Button>

          <input
            type="file"
            name="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
            onClick={handleUpload}
          >
            업로드
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaginationDataroom;
