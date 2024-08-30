import React from "react";
import { Button } from "reactstrap"; // 예시로 Reactstrap을 사용했습니다. 필요에 따라 변경하세요.

const CommentItem = ({ author, date, content, onDelete }) => {
  return (
    <div className="comment-item">
      <div className="comment-header d-flex justify-content-between">
        <span className="comment-author">{author}</span>
        <span className="comment-date">{date}</span>
      </div>
      <div className="comment-body d-flex">
        <div className="comment-content">{content}</div>
        <div className="comment-actions">
          <Button
            className="comment-action-button"
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
              fontSize: "12px",
              color: "black",
            }}
          >
            수정
          </Button>
          <Button
            className="comment-action-button"
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
              fontSize: "12px",
              color: "black",
            }}
            onClick={onDelete}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
