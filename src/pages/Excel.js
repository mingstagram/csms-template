import React, { useRef, useState } from "react";
import axios from "axios";

const ExcelUploadForm = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // 파일 상태 업데이트 또는 필요한 다른 작업 수행
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/excel/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드 시 Content-Type 설정
        },
      })
      .then((res) => {
        if (res.data.code === "0000") {
          alert("성공");
        }
      })
      .catch(() => alert("실패"));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div>
      <form encType="multipart/form-data">
        {/* 파일 선택 input (숨김) */}
        <input
          type="file"
          name="file"
          accept=".xls,.xlsx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* 파일 선택 및 업로드를 함께하는 버튼 */}
        <button type="button" onClick={handleUpload}>
          파일 선택 및 업로드
        </button>
      </form>
    </div>
  );
};

export default ExcelUploadForm;
