import React, { useState } from "react";
import attachFile from "../../assets/images/attach_file.png";
import component179 from "../../assets/images/Component-179.png";
import searchBtn from "../../assets/images/Component 110.png";
import { Button, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import DatePickerCustom from "../common/DatePickerCustom";
import { useNavigate } from "react-router-dom";
import CommentItem from "../common/CommentItem";

const RegularEducationComponent = () => {
  const rows = Array.from({ length: 15 });
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 초기 댓글 데이터 배열 설정
  const [comments, setComments] = useState(
    Array.from({ length: 3 }, (_, index) => ({
      author: `작성자 ${index + 1}`,
      date: `2024.08.12 15:0${index + 1}`,
      content: `댓글 내용 ${
        index + 1
      }: 오늘 발생한 작업장 사고에 대해 자세한 상황을 공유해 주실 수 있나요? 안전 조치가 제대로 이행되었는지 확인이 필요합니다.`,
    }))
  );

  // 입력된 댓글 내용
  const [newComment, setNewComment] = useState("");

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      // 댓글 추가
      setComments([
        ...comments,
        {
          author: `작성자 ${comments.length + 1}`,
          date: new Date()
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .slice(0, 16),
          content: newComment,
        },
      ]);
      // 입력 필드 초기화
      setNewComment("");
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  // 키 다운 핸들러
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지 (예: 폼 제출 등)
      handleAddComment(); // 댓글 추가
    }
  };

  const handleSearch = () => {
    //
  };
  return (
    <div className="d-flex" style={{ fontFamily: "LGSmart_H" }}>
      <div className="Notice_Component">
        <div className="d-flex">
          <div className="Rectangle-346"></div>
          <p className="main-sub-title">교육자료</p>
        </div>
        <div className="d-flex" style={{ paddingTop: "10px" }}>
          <Button
            style={{
              width: "140px",
              height: "34px",
              borderRadius: "500px",
              backgroundColor: "#29282d",
              paddingTop: "4px",
              marginRight: "10px",
            }}
            onClick={() => {
              navigate("/regularEducation");
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>
              정기안전보건교육
            </span>
          </Button>
          <Button
            style={{
              width: "140px",
              height: "34px",
              borderRadius: "500px",
              paddingTop: "4px",
              border: "solid 1px #d9d9d9",
              backgroundColor: "white",
              marginRight: "10px",
            }}
            onClick={() => {
              navigate("/specialEducation");
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: "bold", color: "#666" }}
            >
              특별안전보건교육
            </span>
          </Button>
          <Button
            style={{
              width: "140px",
              height: "34px",
              borderRadius: "500px",
              paddingTop: "4px",
              border: "solid 1px #d9d9d9",
              backgroundColor: "white",
            }}
            onClick={() => {
              navigate("/otherEducation");
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: "bold", color: "#666" }}
            >
              기타안전보건교육
            </span>
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "#e23465",
              borderColor: "white",
              color: "white",
              fontSize: "12px",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate("/regularEducationCreate");
            }}
          >
            등록
          </Button>
        </div>
        {/* 테이블 추가 */}
        <div
          style={{
            width: "810px",
            height: "640px",
            overflow: "hidden",
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
                  className="main-table main-table-title"
                  style={{ width: "65%" }}
                >
                  제목
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "10%" }}
                >
                  등록일
                </th>
                <th
                  className="main-table main-table-title"
                  style={{ width: "10%" }}
                >
                  수정일
                </th>
              </tr>
              {rows.map((_, index) => (
                <tr key={index} className="table-row">
                  <td
                    className="main-table main-table-row1"
                    style={{ color: "black" }}
                  >
                    asdf
                  </td>
                  <td className="main-table">
                    <div className="d-flex">
                      <div className="Ellipse-368">
                        <span className="N">N</span>
                      </div>
                      <span style={{ fontSize: "12px", marginLeft: "7px" }}>
                        평택 LG전자 화면 설계서 가이드 입니다.
                      </span>
                    </div>
                  </td>
                  <td className="main-table">asd</td>
                  <td className="main-table">asd</td>
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
      >
        {/* <img src={component179} /> */}
      </div>
      <div className="Notice_Component2" style={{ paddingTop: "60px" }}>
        <div>
          <div className="d-flex justify-content-end">
            <span
              style={{
                fontSize: "12px",
                color: "#444",
              }}
            >
              기간
            </span>
            <div
              style={{
                height: "30px",
                width: "130px",
                fontSize: "12px",
                marginTop: "-7px",
                marginLeft: "17px",
              }}
            >
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                //   className="form-control custom-date-picker"
                customInput={<DatePickerCustom />}
                dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
              />
            </div>
            <span
              style={{
                fontSize: "12px",
                marginLeft: "7px",
                marginRight: "-7px",
              }}
            >
              ~
            </span>
            <div
              style={{
                height: "30px",
                width: "130px",
                fontSize: "12px",
                marginTop: "-7px",
                marginLeft: "15px",
              }}
            >
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                //   className="form-control custom-date-picker"
                customInput={<DatePickerCustom />}
                dateFormat="yyyy/MM/dd" // 원하는 형식으로 변경 가능
              />
            </div>
            <div style={{ margin: "-7px 0 0 7px " }}>
              <img
                src={searchBtn}
                alt="Search"
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
                }}
                onClick={handleSearch}
              />
            </div>
          </div>
          <div
            style={{
              width: "110px",
              height: "32px",
              border: "1px solid #d9d9d9",
              padding: "3px 0 0 0",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "12px" }}>평택안전보건팀</span>
          </div>
        </div>
        <div className="d-flex" style={{ paddingTop: "20px" }}>
          <div style={{ flexBasis: "10%" }}>
            <span
              style={{
                fontSize: "14px",
                color: "#439899",
                textAlign: "left",
                fontWeight: "600",
                paddingLeft: "5px",
              }}
            >
              요청
            </span>
          </div>
          <div style={{ flexBasis: "80%" }}>
            <span
              className="d-flex"
              style={{ fontSize: "18px", fontWeight: "600", color: "#444" }}
            >
              <div className="Ellipse-369">
                <span className="N1">N</span>
              </div>
              평택 LG전자 화면 설계서 가이드 입니다.
            </span>
          </div>
          <div style={{ flexBasis: "10%" }}>
            <div style={{ height: "15px" }}>
              <span style={{ fontSize: "11px", color: "#666" }}>
                등록일: 24.07.14
              </span>
            </div>
            <div style={{ height: "15px" }}>
              <span style={{ fontSize: "11px", color: "#666" }}>
                수정일: 24.07.14
              </span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <div
            className="Rectangle-890 d-flex"
            style={{ borderTop: "2px solid black" }}
          >
            <div
              style={{
                flexBasis: "15%",
                padding: "10px 20px 0 0 ",
                textAlign: "center",
              }}
            >
              <span
                style={{ fontSize: "11px", color: "#444", paddingRight: "2px" }}
              >
                첨부파일
              </span>
              <span style={{ fontSize: "11px", color: "#e23465" }}>(3)</span>
            </div>
            <div style={{ flexBasis: "85%", paddingTop: "10px" }}>
              <div style={{ margin: "0 0 -5px 0" }}>
                <img src={attachFile} />{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#19358c",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  1234.jpg (26KB)
                </span>
              </div>
              <div style={{ margin: "0 0 -5px 0" }}>
                <img src={attachFile} />{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#19358c",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  1234.jpg (26KB)
                </span>
              </div>
              <div style={{ margin: "0 0 -5px 0" }}>
                <img src={attachFile} />{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#19358c",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  1234.jpg (26KB)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="Rectangle-895"> 게시물 내용</div>
        <div
          className="d-flex justify-content-end"
          style={{ marginBottom: "10px" }}
        >
          <Button
            style={{
              width: "70px",
              height: "30px",
              backgroundColor: "#edeef2",
              borderColor: "white",
              color: "black",
              fontSize: "12px",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate("/regularEducationUpdate");
            }}
          >
            수정
          </Button>
          <Button
            style={{
              width: "70px",
              height: "30px",
              backgroundColor: "#edeef2",
              borderColor: "white",
              color: "black",
              fontSize: "12px",
            }}
          >
            삭제
          </Button>
        </div>
        <div className="Rectangle-893">
          <div>
            <Input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터 키 핸들링
              style={{ height: "45px", fontSize: "12px" }}
              placeholder="댓글을 입력해주세요."
            />
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ paddingTop: "10px" }}
          >
            <div className="Frame-2901">
              <span className="reply-001 ">
                댓글 <span className="reply-002">{comments.length}</span>
              </span>
            </div>
            <Button
              style={{
                width: "70px",
                height: "30px",
                backgroundColor: "#e23465",
                borderColor: "white",
                color: "white",
                fontSize: "12px",
                marginRight: "0px",
              }}
              onClick={handleAddComment}
            >
              등록
            </Button>
          </div>
          {/* 댓글 리스트 */}
          <div className="Frame-2898">
            {comments.length === 0 ? (
              <p className="no-comments">댓글이 없습니다.</p>
            ) : (
              comments.map((comment, index) => (
                <CommentItem
                  key={index}
                  author={comment.author}
                  date={comment.date}
                  content={comment.content}
                  onDelete={() => handleDeleteComment(index)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularEducationComponent;
