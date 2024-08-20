import ReactModal from "react-modal";
import Modal from "react-modal";
import closeBtn from "../../assets/images/close-fill@2x.png";

// 커스텀 Confirm 모달 컴포넌트
const CustomConfirmModal = ({ isOpen, onRequestClose, onConfirm, msg }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          width: "460px",
          height: "280px",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column", // 세로로 배치
          // justifyContent: "center", // 수직 가운데 정렬
          textAlign: "center",
          fontFamily: "LGSmart",
          fontSize: "14px",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "-10px",
          marginBottom: "-10px",
        }}
      >
        <span
          style={{
            margin: 0,
            textAlign: "center",
            width: "100%",
          }}
        >
          <b>알림</b>
        </span>
        <img
          src={closeBtn}
          alt="Search"
          style={{
            width: "18px",
            height: "18px",
            cursor: "pointer", // 마우스 오버 시 커서를 손가락 모양으로 변경
          }}
          onClick={onRequestClose}
        />
      </div>
      <hr style={{ marginLeft: "-20px", marginRight: "-20px" }} />
      <b
        style={{
          marginBottom: "60px",
          marginTop: "40px",
          fontSize: "16px",
          fontFamily: "LGSmart",
        }}
      >
        {msg}
      </b>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            backgroundColor: "#edeef2",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "30%",
            alignSelf: "flex-end", // 아래로 정렬
            border: "1px solid #edeef2", // 테두리와 배경색 동일하게
            marginLeft: "12px",
          }}
          onClick={onRequestClose}
        >
          취소
        </button>
        <button
          style={{
            backgroundColor: "#bb0841",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "60%",
            alignSelf: "flex-end", // 아래로 정렬
            border: "1px solid #bb0841", // 테두리와 배경색 동일하게
            marginRight: "12px",
          }}
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default CustomConfirmModal;
