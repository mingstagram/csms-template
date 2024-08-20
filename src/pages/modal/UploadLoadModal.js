import React from "react";
import "../../styles/modal.css"; // 모달 스타일을 포함하는 CSS 파일
import { ClockLoader } from "react-spinners";
import spinner1 from "../../assets/images/Spinner1.gif";

const UploadLoadModal = ({ msg }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>
          {msg} <img src={spinner1} style={{ width: "50px", height: "50px" }} />
        </p>
      </div>
    </div>
  );
};

export default UploadLoadModal;
