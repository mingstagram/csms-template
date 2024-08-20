import React from "react";
import "../../styles/projectStyle.css";
import calendar from "../../assets/images/calendar.png";

const DatePickerCustom = React.forwardRef(({ value, onClick }, ref) => (
  <div
    style={{
      position: "relative",
      width: "130px", // input 창 너비
      height: "30px", // input 창 높이
    }}
  >
    <input
      type="text"
      value={value}
      onClick={onClick}
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        paddingRight: "30px", // 이미지 공간을 확보하기 위해 오른쪽 패딩 추가
        boxSizing: "border-box",
        fontSize: "12px",
      }}
      className="custom-date-picker"
      readOnly // 날짜 선택 input 필드는 사용자가 직접 입력할 수 없도록 설정
    />
    <img
      src={calendar} // 여기에 이미지 경로 입력
      alt="calendar icon"
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "15px",
        height: "15px",
        pointerEvents: "none", // 이미지 클릭을 막음
      }}
    />
  </div>
));

export default DatePickerCustom;
