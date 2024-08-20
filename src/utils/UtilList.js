import axios from "axios";

export const getRiskDateList = ({ setYearList, setMonthList, setDayList }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  const monthsByYear = years.map((year) => {
    return Array.from({ length: 12 }, (_, index) => index + 1);
  });

  // 현재 월의 마지막 날짜를 구하기 위한 함수
  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  // 현재 연도와 월에 대한 일(day) 배열 생성
  const currentMonth = new Date().getMonth() + 1; // 현재 월
  const daysInCurrentMonth = Array.from(
    { length: getLastDayOfMonth(currentYear, currentMonth) },
    (_, index) => index + 1
  );

  setYearList(years);
  setMonthList(monthsByYear[0]);
  setDayList(daysInCurrentMonth);
};

export const handleForm = ({
  formData,
  setError,
  filter,
  navigate,
  sort,
  titleLabel,
  selectedBeforeFile,
  selectedExecFile,
  beforeImageUrls,
  execImageUrls,
  riskRankingMatrixId,
  matrixFilter,
  stateSort,
}) => {
  // if (formData.companyId === 0) {
  //   setError("본부를");
  // } else if (formData.divisionId === 0) {
  //   setError("담당을");
  // } else if (formData.departmentId === 0) {
  //   setError("부서명을");
  // } else if (formData.regularRiskAssessmentDate === null) {
  //   setError("정기위험성평가 평가일을");
  // } else if (formData.processNumber === null) {
  //   setError("공정번호를");
  // } else if (formData.processFacility === null) {
  //   setError("공정(설비)명 (작업내용)을");
  // } else if (formData.detailWorkingEquipment === null) {
  //   setError("세부작업활동 또는 작업장비를");
  // } else if (formData.harmfulAppFieldId === 0) {
  //   setError("유해위험요인 적용분야를");
  // } else if (formData.harmfulStatusCategoryId === 0) {
  //   setError("유해위험요인 상태구분을");
  // } else if (formData.harmfulClassificationId === 0) {
  //   setError("유해위험요인 위험분류를");
  // } else if (formData.harmfulCauseIdfId === 0) {
  //   setError("유해위험요인 요인파악을");
  // } else if (formData.harmfulDangerousSituation === null) {
  //   setError("유해위험요인 위험발생상황 및 결과를");
  // } else if (formData.disasterTypeId === 0) {
  //   setError("재해유형을");
  // } else if (formData.curSafetyMeasureTypeId === 0) {
  //   setError("현재 안전보건조치 대책유형을");
  // } else if (formData.curSafetyActionContents === null) {
  //   setError("현재 안전보건조치 조치내용을");
  // } else if (formData.curRiskPossibility === null) {
  //   setError("현재 위험성 가능성(빈도)를");
  // } else if (formData.curRiskImportance === null) {
  //   setError("현재 위험성 중대성(강도)를");
  // } else if (formData.curRiskLevel === null) {
  //   setError("현재 위험성 수준을");
  // } else if (formData.curRiskGrade === null) {
  //   setError("현재 위험성 등급을");
  // } else if (formData.curHighRiskProc === null) {
  //   setError("현재 HighRisk 공정을");
  // } else if (formData.curRiskDecsMeasure === null) {
  //   setError("현재 위험성 감소대책을");
  // } else {

  const handleUpdateSuccess = () => {
    // 화면 업데이트 로직을 여기에 작성
    alert("수정완료");
    navigate(-1);
  };

  if (formData.companyId === 0 || formData.companyId === null) {
    setError("본부를");
  } else if (formData.divisionId === 0 || formData.divisionId === null) {
    setError("담당을");
  } else if (formData.departmentId === 0 || formData.departmentId === null) {
    setError("부서명을");
  } else if (
    formData.regularRiskAssessmentDate === null ||
    formData.regularRiskAssessmentDate.trim() === ""
  ) {
    setError("정기위험성평가 평가일을");
  } else if (
    formData.processNumber === null ||
    formData.processNumber.trim() === ""
  ) {
    setError("공정번호를");
  } else if (
    formData.harmfulClassificationId === 0 ||
    formData.harmfulClassificationId === null
  ) {
    setError("유해위험요인 위험분류를");
  } else {
    if (sort === "create") {
      setError(null);
      //   const result = window.confirm(
      //     "해당 위험성평가 내용을 신규 등록하시겠습니까?"
      //   );
      axios
        .post("/admin/api/write_matrix", formData)
        .then((res) => {
          if (res.data.code === "0000") {
            const formBeforeData = new FormData();
            selectedBeforeFile.forEach((file, index) => {
              formBeforeData.append(`file`, file);
            });
            formBeforeData.append("riskRankingMatrixId", res.data.result);
            formBeforeData.append("sort", "improveBeforePicture");
            axios
              .post("/image/api/upload", formBeforeData)
              .then((res) => {
                if (res.data.code === "0000") {
                  // 처리 성공시 수행할 작업
                }
              })
              .catch(() => {
                alert("개선 이전사진 업로드에 문제가 생겼습니다.");
              });

            const formExecData = new FormData();
            if (selectedExecFile.length > 0) {
              selectedExecFile.forEach((file, index) => {
                formExecData.append(`file`, file);
              });
              formExecData.append("riskRankingMatrixId", res.data.result);
              formExecData.append("sort", "improveExecPicture");
              axios
                .post("/image/api/upload", formExecData)
                .then((res) => {
                  if (res.data.code === "0000") {
                    // 처리 성공시 수행할 작업
                  }
                })
                .catch(() => {
                  alert("개선 완료사진 업로드에 문제가 생겼습니다.");
                });
            }
          }

          // const dataToSend = {
          //   companyId: filter.companyId,
          //   divisionId: filter.divisionId,
          //   departmentId: filter.departmentId,
          //   titleLabel: titleLabel,
          // };
          // navigate("/matrixList/detail", {
          //   state: {
          //     companyId: filter.companyId,
          //     titleLabel: titleLabel,
          //     matrixFilter: matrixFilter,
          //     matrixId: res.data.result,
          //     stateSort: stateSort,
          //   },
          // });
          navigate(-1);
        })
        .catch(() => {
          alert("신규 작성하는데 문제가 생겼습니다.");
        });
    } else if (sort === "update") {
      setError(null);
      //   const result = window.confirm("해당 위험성평가 내용을 수정하시겠습니까?");
      axios
        .post("/admin/api/update_matrix", formData)
        .then((res) => {
          if (res.data.code === "0000") {
            const formBeforeData = new FormData();
            selectedBeforeFile.forEach((file, index) => {
              formBeforeData.append(`file`, file);
            });
            formBeforeData.append("riskRankingMatrixId", riskRankingMatrixId);
            formBeforeData.append("sort", "improveBeforePicture");
            formBeforeData.append("savedImages", beforeImageUrls);
            axios
              .post("/image/api/upload", formBeforeData)
              .then((res) => {
                if (res.data.code === "0000") {
                  // 처리 성공시 수행할 작업
                }
              })
              .catch(() => {
                alert("개선 이전사진 업로드에 문제가 생겼습니다.");
              });

            const formExecData = new FormData();
            selectedExecFile.forEach((file, index) => {
              formExecData.append(`file`, file);
            });
            formExecData.append("riskRankingMatrixId", riskRankingMatrixId);
            formExecData.append("sort", "improveExecPicture");
            formExecData.append("savedImages", execImageUrls);
            axios
              .post("/image/api/upload", formExecData)
              .then((res) => {
                if (res.data.code === "0000") {
                  // 처리 성공시 수행할 작업
                }
              })
              .catch(() => {
                alert("개선 완료사진 업로드에 문제가 생겼습니다.");
              });
          }
          handleUpdateSuccess();
        })
        .catch(() => {
          alert("수정하는데 문제가 생겼습니다.");
        });
    }
  }
};

export const yearChange = ({
  event,
  setSelectedYear,
  updateData,
  selectedMonth,
  selectedDay,
}) => {
  const year = event.target.value;
  setSelectedYear(year);
  updateData(year, selectedMonth, selectedDay);
};

export const monthChange = ({
  event,
  setSelectedMonth,
  updateData,
  selectedYear,
  selectedDay,
}) => {
  const month = event.target.value;
  setSelectedMonth(month);
  updateData(selectedYear, month, selectedDay);
};

export const dayChange = ({
  event,
  setSelectedDay,
  updateData,
  selectedYear,
  selectedMonth,
}) => {
  const day = event.target.value;
  setSelectedDay(day);
  updateData(selectedYear, selectedMonth, day);
};

export const handleFileSelect = ({ setSelectedFile }) => {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.accept = "image/*"; // 파일 타입에 맞게 변경
  input.onchange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("사진은 3장이상 등록할수없습니다.");
      return;
    }
    setSelectedFile(files);
  };
  input.click();
};

export const handleDelete = ({
  setSelectedFile,
  imageUrls,
  setImageUrls,
  sort,
}) => {
  if (window.confirm("사진을 삭제하시겠습니까?")) {
    if (sort === "create") {
      setSelectedFile([]);
    } else {
      setImageUrls([]);
      setSelectedFile([]);
    }
  }
};

export const getImage = ({ setImageUrls, matrixId, sort }) => {
  axios
    .post("/image/api/get_image", null, {
      params: {
        riskRankingMatrixId: matrixId,
        sort: sort,
      },
    })
    .then((res) => {
      if (res.data.code === "0000") {
        const images = res.data.result;
        setImageUrls(images);
      }
    })
    .catch((error) => {
      console.error("Error in axios post:", error);
    });
};
