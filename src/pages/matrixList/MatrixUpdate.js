import React, { useEffect, useRef, useState } from "react";
import "../../styles/projectStyle.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../layouts/Header";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import checkImg from "../../assets/images/checkImg.png";
import validateImg from "../../assets/images/information-line.png";
import axios from "axios";
import { styled } from "styled-components";
import {
  getAllDeptList,
  getAppFieldList,
  getAssessmentTypeList,
  getCauseIdfList,
  getClassificationList,
  getCompList,
  getCompanyData,
  getDeptList,
  getDisasterTypeList,
  getDivList,
  getMeasureTypeList,
  getStatusCategoryList,
} from "../../utils/CodeList";
import {
  dayChange,
  getImage,
  getRiskDateList,
  handleDelete,
  handleForm,
  monthChange,
  yearChange,
} from "../../utils/UtilList";
import CustomConfirmModal from "../../components/common/CustomConfirmModal";

const selectedImageStyle = {
  border: "2px solid #bb0841",
  // borderRadius: "5px", // 원하는 테두리 둥글기 적용
};

const MatrixUpdate = () => {
  // const { id, companyId } = useParams();
  const imgDownloadUrl = "/image/api/getImage/";
  const location = useLocation();
  const navigate = useNavigate();
  const { matrix, companyId, titleLabel, type } = location.state;
  const [departmentList, setDepartmentList] = useState([]);
  const [seletedDepartmentList, setSelectedDepartmentList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [disasterTypeList, setDisasterTypeList] = useState([]);
  const [riskAssessmentTypeList, setRiskAssessmentTypeList] = useState([]);
  const [measureTypeList, setMeasureTypeList] = useState([]);
  const [statusCategoryList, setStatusCategoryList] = useState([]);
  const [appFieldList, setAppFieldList] = useState([]);
  const [causeIdfList, setCauseIdfList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [divisionId, setDivisionId] = useState(0);
  const [departmentId, setDepartmentId] = useState(0);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const currentDay = new Date().getDay();
  const [searchMonth, setSearchMonth] = useState(currentMonth);
  const [searchYear, setSearchYear] = useState(currentYear);
  const [searchDay, setSearchDay] = useState(currentDay);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(matrix.companyId);
  const [selectedDivisionId, setSelectedDivisionId] = useState(
    matrix.divisionId
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(12); // 기본값 전체
  const [selectedDay, setSelectedDay] = useState(12); // 기본값 전체
  const [selectedBeforeFile, setSelectedBeforeFile] = useState([]);
  const [selectedExecFile, setSelectedExecFile] = useState([]);
  const [beforeImageUrls, setBeforeImageUrls] = useState([]);
  const [execImageUrls, setExecImageUrls] = useState([]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedBeforeImage, setSelectedBeforeImage] = useState(null);
  const [selectedExecImage, setSelectedExecImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedBeforeImage(index);
  };

  function extractNumberFromString(str) {
    const matches = str.match(/\d+/); // 정규 표현식을 사용하여 숫자 추출
    return matches ? parseInt(matches[0], 10) : null;
  }

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const isSelectedBeforeImage = (index) => {
    // 여기에서 선택 여부를 판단하는 로직을 추가하세요.
    // 예를 들어, 선택된 이미지의 인덱스와 현재 매핑되는 인덱스가 같으면 선택된 이미지로 판단할 수 있습니다.
    return index === selectedImageIndex;
  };

  const handleConfirm = () => {
    // 확인 버튼을 눌렀을 때의 동작 수행
    // 여기에서 API 호출 및 페이지 이동 등을 수행할 수 있습니다.
    // ...

    // 모달 닫기
    const sortValue = type === "matrixCopy" ? "create" : "update";
    handleForm({
      formData,
      setError,
      filter,
      navigate,
      sort: sortValue,
      selectedBeforeFile,
      selectedExecFile,
      beforeImageUrls,
      execImageUrls,
      titleLabel: titleLabel,
      matrixFilter: filter,
      riskRankingMatrixId: matrix.id,
    });
    setConfirmationModalOpen(false);
  };

  const handleFormSubmit = () => {
    // 사용자가 수정완료 버튼을 눌렀을 때의 동작
    // 모달 열기
    setConfirmationModalOpen(true);
  };

  const [formData, setFormData] = useState({
    id: matrix.id,
    regularRiskDateYear: parseInt(matrix.regularRiskDateYear, 10),
    regularRiskDateMonth: parseInt(matrix.regularRiskDateMonth, 10),
    companyId: matrix.companyId,
    divisionId: matrix.divisionId,
    departmentId: matrix.departmentId,
    regularRiskAssessmentDate: matrix.regularRiskAssessmentDate,
    processNumber: matrix.processNumber,
    processFacility: matrix.processFacility,
    detailWorkingEquipment: matrix.detailWorkingEquipment,
    harmfulAppFieldId: matrix.harmfulAppFieldId,
    harmfulStatusCategoryId: matrix.harmfulStatusCategoryId,
    harmfulClassificationId: matrix.harmfulClassificationId,
    harmfulCauseIdfId: matrix.harmfulCauseIdfId,
    harmfulDangerousSituation: matrix.harmfulDangerousSituation,
    disasterTypeId: matrix.disasterTypeId,
    curSafetyMeasureTypeId: matrix.curSafetyMeasureTypeId,
    curSafetyActionContents: matrix.curSafetyActionContents,
    curRiskPossibility: matrix.curRiskPossibility,
    curRiskImportance: matrix.curRiskImportance,
    curRiskLevel: matrix.curRiskLevel,
    curRiskGrade: matrix.curRiskGradeInt,
    curHighRiskProc: matrix.curHighRiskProc,
    curRiskDecsMeasure: matrix.curRiskDecsMeasure,
    // 선택형
    freqRiskAssessmentDate: matrix.freqRiskAssessmentDate,
    freqRiskAssessmentTypeId: matrix.freqRiskAssessmentTypeId,
    freqRiskSheeNumber: matrix.freqRiskSheeNumber,
    improveMeasureTypeId: matrix.improveMeasureTypeId,
    improveDetailContents: matrix.improveDetailContents,
    improveBeforePicture: matrix.improveBeforePicture,
    improveExecPicture: matrix.improveExecPicture,
    improveExecDate: matrix.improveExecDate,
    improveExecActionResult: matrix.improveExecActionResult,
    improveExecDeptId: matrix.improveExecDeptId,
    improveExecManager: matrix.improveExecManager,
    improveRiskPossibility: matrix.improveRiskPossibility,
    improveRiskImportance: matrix.improveRiskImportance,
    improveRiskLevel: matrix.improveRiskLevel,
    improveRiskGrade: matrix.improveRiskGradeInt,
    remark: matrix.remark,
    improveCompleted: matrix.improveCompleted,
  });

  let [regularSelectedYear, regularSelectedMonth, regularSelectedDay] = [
    0, 0, 0,
  ];
  let [freqSelectedYear, freqSelectedMonth, freqSelectedDay] = [0, 0, 0];
  let [improveSelectedYear, improveSelectedMonth, improveSelectedDay] = [
    0, 0, 0,
  ];

  if (formData.regularRiskAssessmentDate) {
    [regularSelectedYear, regularSelectedMonth, regularSelectedDay] =
      formData.regularRiskAssessmentDate.split("-").map(Number);
  }

  if (formData.freqRiskAssessmentDate) {
    [freqSelectedYear, freqSelectedMonth, freqSelectedDay] =
      formData.freqRiskAssessmentDate.split("-").map(Number);
  }

  if (formData.improveExecDate) {
    [improveSelectedYear, improveSelectedMonth, improveSelectedDay] =
      formData.improveExecDate.split("-").map(Number);
  }

  const [rangeValue1, setRangeValue1] = useState(formData.curRiskPossibility);
  const [rangeValue2, setRangeValue2] = useState(formData.curRiskImportance);
  const [rangeValue3, setRangeValue3] = useState(
    formData.improveRiskPossibility
  );
  const [rangeValue4, setRangeValue4] = useState(
    formData.improveRiskImportance
  );

  const handleInputChange = (formName, value) => {
    setFormData({
      ...formData,
      [formName]: value,
    });
  };

  const handleBeforeFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*"; // 파일 타입에 맞게 변경
    input.onchange = (e) => {
      const files = Array.from(e.target.files);

      const validExtensions = [".png", ".jpg"];
      const invalidFiles = files.filter(
        (file) => !validExtensions.includes(file.name.toLowerCase().slice(-4))
      );
      if (invalidFiles.length > 0) {
        alert("이미지 파일은 PNG 또는 JPG 형식이어야 합니다.");
        return;
      }

      if (files.length > 3) {
        alert("사진은 3장이상 등록할수없습니다.");
        return;
      }
      setSelectedBeforeFile(files);
    };
    input.click();
  };

  const handleExecFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*"; // 파일 타입에 맞게 변경
    input.onchange = (e) => {
      const files = Array.from(e.target.files);

      const validExtensions = [".png", ".jpg"];
      const invalidFiles = files.filter(
        (file) => !validExtensions.includes(file.name.toLowerCase().slice(-4))
      );
      if (invalidFiles.length > 0) {
        alert("이미지 파일은 PNG 또는 JPG 형식이어야 합니다.");
        return;
      }

      if (files.length > 3) {
        alert("사진은 3장이상 등록할수없습니다.");
        return;
      }
      setSelectedExecFile(files);
    };
    input.click();
  };

  const handleRangeChange1 = (e) => {
    setRangeValue1(e.target.value);
    handleInputChange("curRiskPossibility", parseInt(e.target.value, 10));
  };
  const handleRangeChange2 = (e) => {
    setRangeValue2(e.target.value);
    handleInputChange("curRiskImportance", parseInt(e.target.value, 10));
  };
  const handleRangeChange3 = (e) => {
    setRangeValue3(e.target.value);
    handleInputChange("improveRiskPossibility", parseInt(e.target.value, 10));
  };
  const handleRangeChange4 = (e) => {
    setRangeValue4(e.target.value);
    handleInputChange("improveRiskImportance", parseInt(e.target.value, 10));
  };

  const [filter, setFilter] = useState({
    keyword: "",
    limit: 10,
    pageNum: 1,
    state: "1",
    workType: null,
    companyId: companyId,
    divisionId: 0,
    departmentId: 0,
    searchYear: null, //new Date().getFullYear(),
    searchMonth: null,
  });

  useEffect(() => {
    getCompanyData({ filter, setCompanyName });
    getDeptList({
      selectedDivisionId,
      setSelectedDepartmentList,
    });
    getAllDeptList(setDepartmentList);
    getDivList({ selectedCompanyId, setDivisionList });
    getCompList(setCompanyList);
    getDisasterTypeList(setDisasterTypeList);
    getAssessmentTypeList(setRiskAssessmentTypeList);
    getMeasureTypeList(setMeasureTypeList);
    getStatusCategoryList(setStatusCategoryList);
    getAppFieldList(setAppFieldList);
    getCauseIdfList(setCauseIdfList);
    getClassificationList({ setClassificationList });
    getRiskDateList({ setYearList, setMonthList, setDayList });
    getImage({
      setImageUrls: setExecImageUrls,
      matrixId: matrix.id,
      sort: "improveExecPicture",
    });
    getImage({
      setImageUrls: setBeforeImageUrls,
      matrixId: matrix.id,
      sort: "improveBeforePicture",
    });
  }, [selectedCompanyId, selectedDivisionId]);

  const handleDivisionChange = (event) => {
    const selectedDivisionId = parseInt(event.target.value, 10);
    // setFilter({ ...filter, searchYear: selectedYear });
    setSelectedDivisionId(selectedDivisionId);
    handleInputChange("divisionId", selectedDivisionId);
  };

  const handleCompanyChange = (event) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setSelectedCompanyId(selectedCompanyId);
    handleInputChange("companyId", selectedCompanyId);
  };

  const regularRiskYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    regularRiskUpdateData(year, selectedMonth, selectedDay);
  };

  const regularRiskMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    regularRiskUpdateData(selectedYear, month, selectedDay);
  };

  const regularRiskDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    regularRiskUpdateData(selectedYear, selectedMonth, day);
  };

  const regularRiskUpdateData = (year, month, day) => {
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setFormData({
      ...formData,
      regularRiskAssessmentDate: formattedDate,
      regularRiskDateYear: parseInt(year, 10),
      regularRiskDateMonth: parseInt(month, 10),
    });
  };

  const freqRiskYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    freqRiskUpdateData(year, selectedMonth, selectedDay);
  };

  const freqRiskMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    freqRiskUpdateData(selectedYear, month, selectedDay);
  };

  const freqRiskDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    freqRiskUpdateData(selectedYear, selectedMonth, day);
  };

  const freqRiskUpdateData = (year, month, day) => {
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setFormData({
      ...formData,
      freqRiskAssessmentDate: formattedDate,
    });
  };

  const improveRiskYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    improveUpdateData(year, selectedMonth, selectedDay);
  };

  const improveRiskMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    improveUpdateData(selectedYear, month, selectedDay);
  };

  const improveRiskDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    improveUpdateData(selectedYear, selectedMonth, day);
  };

  const improveUpdateData = (year, month, day) => {
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setFormData({
      ...formData,
      improveExecDate: formattedDate,
    });
  };

  const calculateRiskGrade = (riskLevel) => {
    if (riskLevel >= 1 && riskLevel <= 2) {
      return 1;
    } else if (riskLevel >= 3 && riskLevel <= 8) {
      return 2;
    } else if (riskLevel >= 9 && riskLevel <= 16) {
      return 3;
    } else if (riskLevel >= 17 && riskLevel <= 20) {
      return 4;
    } else if (riskLevel >= 21 && riskLevel <= 25) {
      return 5;
    } else {
      return 0; // 예외 처리: 범위에 해당하지 않는 경우
    }
  };

  return (
    <div>
      <Header filter={filter} setFilter={setFilter} />
      <div className="Matrix_Detail_Component1">
        <Row className="Detail_Table1">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // 컨테이너 내에서 공간을 최대한 나누어 정렬
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              className="Matrix_List_Title1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <b>{titleLabel} 위험성평가</b>
              <span
                style={{
                  color: "#d00042",
                  fontFamily: "LGSmart_H",
                  fontSize: "12px",
                  marginLeft: "20px",
                  marginRight: "5px",
                }}
              >
                * 필수항목
              </span>{" "}
              {/* <span
                style={{
                  color: "#666",
                  fontFamily: "LGSmart_H",
                  fontSize: "12px",
                  marginLeft: "20px",
                  marginRight: "5px",
                }}
              >
                평가정보 없음
              </span>{" "}
              <Input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              /> */}
              {error && (
                <div className="Write_Validation1">
                  <span className="Validation_Label1">
                    <img
                      alt="validate"
                      style={{ width: "15px" }}
                      src={validateImg}
                    />{" "}
                    {error} 작성해주세요!
                  </span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                color="secondary"
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#edeef2",
                  borderColor: "#edeef2",
                  color: "black",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                이전
              </Button>

              {type === "matrixCopy" ? (
                <Button
                  color="secondary"
                  style={{
                    marginRight: "10px",
                    width: "180px",
                    height: "36px",
                    backgroundColor: "#bb0841",
                    borderColor: "#bb0841",
                    color: "white",
                    fontSize: "12px",
                    fontFamily: "LGSmart_H",
                  }}
                  onClick={handleFormSubmit}
                  // onClick={() => {
                  //   handleForm({
                  //     formData,
                  //     setError,
                  //     filter,
                  //     navigate,
                  //     sort: "create",
                  //   });
                  // }}
                >
                  <img alt="write" style={{ width: "18px" }} src={checkImg} />{" "}
                  작성완료
                </Button>
              ) : (
                <Button
                  color="secondary"
                  style={{
                    marginRight: "10px",
                    width: "180px",
                    height: "36px",
                    backgroundColor: "#bb0841",
                    borderColor: "#bb0841",
                    color: "white",
                    fontSize: "12px",
                    fontFamily: "LGSmart_H",
                  }}
                  onClick={handleFormSubmit}
                  // onClick={() => {
                  //   handleForm({
                  //     formData,
                  //     setError,
                  //     filter,
                  //     navigate,
                  //     sort: "update",
                  //   });
                  // }}
                >
                  수정완료
                </Button>
              )}
              {/* 커스텀 Confirm 모달 */}
              <CustomConfirmModal
                isOpen={isConfirmationModalOpen}
                onRequestClose={() => setConfirmationModalOpen(false)}
                onConfirm={handleConfirm}
                msg={
                  type === "matrixCopy"
                    ? "해당 위험성평가 내용을 신규 등록하시겠습니까?"
                    : "해당 위험성평가 내용을 수정하시겠습니까?"
                }
              />
            </div>
          </div>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="p-1">
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "-10px",
                }}
              >
                <div className="Ellipse_2"></div>
                <div className="Detail_Font1">기본정보</div>
              </div>
              <hr />
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_3"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042", fontWeight: "bold" }}
                >
                  본부
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="select"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={handleCompanyChange}
                    value={formData.companyId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {companyList.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </Input>
                </span>
              </div>
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_3"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042", fontWeight: "bold" }}
                >
                  담당
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="select"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                    }}
                    onChange={handleDivisionChange}
                    value={formData.divisionId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {(selectedCompanyId != null || selectedCompanyId !== 0) &&
                      divisionList.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                  </Input>
                </span>
              </div>
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_3"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042", fontWeight: "bold" }}
                >
                  부서명
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="select"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "departmentId",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={formData.departmentId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {(selectedDivisionId != null || selectedDivisionId !== 0) &&
                      seletedDepartmentList.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                  </Input>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "40px",
                  marginBottom: "20px",
                }}
              >
                <div className="Ellipse_3"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042", fontWeight: "bold" }}
                >
                  정기위험성평가 평가일
                </span>
                <span
                  className="Detail_Font3"
                  style={{ flex: 2, display: "flex" }}
                >
                  <Input
                    id="exampleSelectYear"
                    name="selectYear"
                    type="select"
                    style={{
                      marginRight: "10px",
                      width: "100px",
                      height: "30px",
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                    }}
                    value={regularSelectedYear}
                    onChange={regularRiskYearChange}
                  >
                    {yearList.map((year) => (
                      <option key={year} value={year}>
                        {year}년
                      </option>
                    ))}
                  </Input>
                  <Input
                    id="exampleSelectMonth"
                    name="selectMonth"
                    type="select"
                    style={{
                      marginRight: "10px",
                      width: "80px",
                      height: "30px",
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                    }}
                    onChange={regularRiskMonthChange}
                    value={regularSelectedMonth}
                  >
                    <option value={12}>전체</option>
                    {monthList.map((month) => (
                      <option key={month} value={month}>
                        {month}월
                      </option>
                    ))}
                  </Input>
                  <Input
                    id="exampleSelectMonth"
                    name="selectMonth"
                    type="select"
                    style={{
                      marginRight: "10px",
                      width: "80px",
                      height: "30px",
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                    }}
                    onChange={regularRiskDayChange}
                    value={regularSelectedDay}
                  >
                    <style></style>
                    <option value={12}>전체</option>
                    {dayList.map((day) => (
                      <option key={day} value={day}>
                        {day}일
                      </option>
                    ))}
                  </Input>
                  {/* {matrix.regularRiskAssessmentDate} */}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "-10px",
                }}
              >
                <div className="Ellipse_2"></div>
                <div className="Detail_Font1">수시위험성평가</div>
              </div>
              <hr />
              <div
                style={{
                  display: isCheckboxChecked ? "none" : "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "40px",
                  }}
                >
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    수시위험성평가 평가일
                  </span>
                  <span
                    className="Detail_Font3"
                    style={{ flex: 2, display: "flex" }}
                  >
                    <Input
                      id="exampleSelectYear"
                      name="selectYear"
                      type="select"
                      style={{
                        marginRight: "10px",
                        width: "100px",
                        height: "30px",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      value={freqSelectedYear}
                      onChange={freqRiskYearChange}
                    >
                      {yearList.map((year) => (
                        <option key={year} value={year}>
                          {year}년
                        </option>
                      ))}
                    </Input>
                    <Input
                      id="exampleSelectMonth"
                      name="selectMonth"
                      type="select"
                      style={{
                        marginRight: "10px",
                        width: "80px",
                        height: "30px",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onChange={freqRiskMonthChange}
                      value={freqSelectedMonth}
                    >
                      <option value={12}>전체</option>
                      {monthList.map((month) => (
                        <option key={month} value={month}>
                          {month}월
                        </option>
                      ))}
                    </Input>
                    <Input
                      id="exampleSelectMonth"
                      name="selectMonth"
                      type="select"
                      style={{
                        marginRight: "10px",
                        width: "80px",
                        height: "30px",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onChange={freqRiskDayChange}
                      value={freqSelectedDay}
                    >
                      <option value={12}>전체</option>
                      {dayList.map((day) => (
                        <option key={day} value={day}>
                          {day}일
                        </option>
                      ))}
                    </Input>
                  </span>
                </div>
                <div style={{ display: "flex", height: "40px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    수시위험성평가 유형
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_SelectBox1"
                      name="select"
                      type="select"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "freqRiskAssessmentTypeId",
                          parseInt(e.target.value, 10)
                        )
                      }
                      value={formData.freqRiskAssessmentTypeId}
                    >
                      <option key={0} value={0}>
                        전체
                      </option>
                      {riskAssessmentTypeList.map((risk) => (
                        <option key={risk.id} value={risk.id}>
                          {risk.name}
                        </option>
                      ))}
                    </Input>
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "40px",
                    marginBottom: "30px",
                  }}
                >
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    수시위험성평가 <br />
                    SHEE Portal 등록번호
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_InputBox1"
                      id="freqRiskSheeNumber"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange("freqRiskSheeNumber", e.target.value)
                      }
                      value={formData.freqRiskSheeNumber}
                    />
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "-10px",
                }}
              >
                <div className="Ellipse_2"></div>
                <div className="Detail_Font1">공정(작업) 및 위험 정보</div>
              </div>
              <hr />
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_3"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042", fontWeight: "bold" }}
                >
                  공정번호
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    id="processNumber"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange("processNumber", e.target.value)
                    }
                    value={formData.processNumber}
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "65px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  공정(설비)명 (작업내용)
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    id="processFacility"
                    type="textarea"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                      height: "50px",
                    }}
                    onChange={(e) =>
                      handleInputChange("processFacility", e.target.value)
                    }
                    value={formData.processFacility}
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "60px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  세부작업활동 또는 작업장비
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    type="textarea"
                    id="detailWorkingEquipment"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                      height: "50px",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "detailWorkingEquipment",
                        e.target.value
                      )
                    }
                    value={formData.detailWorkingEquipment}
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 적용분야
                </span>
                <span
                  className="Detail_Font3"
                  style={{
                    flex: 2,
                  }}
                >
                  <FormGroup
                    style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}
                  >
                    {appFieldList.map((appField) => (
                      <FormGroup check key={appField.id}>
                        <Label check>
                          <Input
                            type="radio"
                            name="harmfulAppFieldId"
                            value={appField.id}
                            onChange={(e) =>
                              handleInputChange(
                                "harmfulAppFieldId",
                                parseInt(e.target.value, 10)
                              )
                            }
                            checked={formData.harmfulAppFieldId === appField.id}
                          />
                          {appField.name}
                        </Label>
                      </FormGroup>
                    ))}
                  </FormGroup>
                </span>
              </div>
            </div>
          </Col>
          <Col>
            <div className="p-1">
              <div
                style={{
                  display: "flex",
                  height: "40px",
                }}
              >
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 상태구분
                </span>
                <span
                  className="Detail_Font3"
                  style={{
                    flex: 2,
                  }}
                >
                  <FormGroup
                    style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}
                  >
                    {statusCategoryList.map((status) => (
                      <FormGroup check key={status.id}>
                        <Label check>
                          <Input
                            type="radio"
                            name="harmfulStatusCategoryId"
                            value={status.id}
                            onChange={(e) =>
                              handleInputChange(
                                "harmfulStatusCategoryId",
                                parseInt(e.target.value, 10)
                              )
                            }
                            checked={
                              formData.harmfulStatusCategoryId === status.id
                            }
                          />
                          {status.name}
                        </Label>
                      </FormGroup>
                    ))}
                  </FormGroup>
                </span>
              </div>
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_3"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042", fontWeight: "bold" }}
                >
                  유해위험요인 위험분류
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="select"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "harmfulClassificationId",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={formData.harmfulClassificationId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {classificationList.map((classification) => (
                      <option key={classification.id} value={classification.id}>
                        {classification.name}
                      </option>
                    ))}
                  </Input>
                </span>
              </div>
              <div style={{ display: "flex", height: "60px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인
                  <br />
                  위험발생상황 및 결과
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    type="textarea"
                    id="harmfulDangerousSituation"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                      height: "50px",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "harmfulDangerousSituation",
                        e.target.value
                      )
                    }
                    value={formData.harmfulDangerousSituation}
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 요인파악
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="harmfulCauseIdfId"
                    id="harmfulCauseIdfId"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "harmfulCauseIdfId",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={formData.harmfulCauseIdfId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {causeIdfList.map((cause) => (
                      <option key={cause.id} value={cause.id}>
                        {cause.name}
                      </option>
                    ))}
                  </Input>
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  재해유형
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="disasterTypeId"
                    id="disasterTypeId"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "disasterTypeId",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={formData.disasterTypeId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {disasterTypeList.map((disaster) => (
                      <option key={disaster.id} value={disaster.id}>
                        {disaster.name}
                      </option>
                    ))}
                  </Input>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "-10px",
                }}
              >
                <div className="Ellipse_2"></div>
                <div className="Detail_Font1">안전보건조치 정보(As Is)</div>
              </div>
              <hr />
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 안전보건조치 대책유형
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    name="curSafetyMeasureTypeId"
                    id="curSafetyMeasureTypeId"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "curSafetyMeasureTypeId",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={formData.curSafetyMeasureTypeId}
                  >
                    <option key={0} value={0}>
                      전체
                    </option>
                    {measureTypeList.map((measure) => (
                      <option key={measure.id} value={measure.id}>
                        {measure.name}
                      </option>
                    ))}
                  </Input>
                </span>
              </div>
              <div style={{ display: "flex", height: "60px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 안전보건조치 조치내용
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    type="textarea"
                    id="curSafetyActionContents"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                      height: "50px",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "curSafetyActionContents",
                        e.target.value
                      )
                    }
                    value={formData.curSafetyActionContents}
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 2 }}>
                  현재 위험성 가능성(빈도)
                </span>
                <span className="Detail_Font3" style={{ flex: 1 }}>
                  <Input
                    className="Risk_InputBox2"
                    id="curRiskPossibility"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                      textAlign: "center",
                    }}
                    value={rangeValue1}
                    readOnly
                    onChange={(e) =>
                      handleInputChange(
                        "curRiskPossibility",
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </span>
                <span className="Detail_Font3" style={{ flex: 3 }}>
                  <span className="Risk_Label1">1</span>
                  <InputRange
                    type="range"
                    percent={rangeValue1 * 10} // Adjust the scale based on your requirements
                    defaultValue={rangeValue1}
                    min={1}
                    max={5}
                    onChange={handleRangeChange1}
                  />
                  <span className="Risk_Label2">5</span>
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 2 }}>
                  현재 위험성 중대성(강도)
                </span>
                <span className="Detail_Font3" style={{ flex: 1 }}>
                  <Input
                    className="Risk_InputBox2"
                    id="curRiskImportance"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                      textAlign: "center",
                    }}
                    value={rangeValue2}
                    readOnly
                    onChange={(e) =>
                      handleInputChange(
                        "curRiskImportance",
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </span>
                <span className="Detail_Font3" style={{ flex: 3 }}>
                  <span className="Risk_Label1">1</span>
                  <InputRange
                    type="range"
                    percent={rangeValue2 * 10} // Adjust the scale based on your requirements
                    defaultValue={rangeValue2}
                    min={1}
                    max={5}
                    onChange={handleRangeChange2}
                  />
                  <span className="Risk_Label2">5</span>
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험성 위험성수준
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    id="curRiskLevel"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "curRiskLevel",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={
                      rangeValue1 === null || rangeValue2 === null
                        ? null
                        : rangeValue1 * rangeValue2
                    }
                    disabled
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험 등급
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_InputBox1"
                    id="curRiskGrade"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        "curRiskGrade",
                        parseInt(e.target.value, 10)
                      )
                    }
                    value={
                      rangeValue1 === null || rangeValue2 === null
                        ? null
                        : calculateRiskGrade(rangeValue1 * rangeValue2)
                    }
                    disabled
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 High Risk 공정
                </span>
                <span
                  className="Detail_Font3"
                  style={{
                    flex: 2,
                  }}
                >
                  <FormGroup
                    style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}
                  >
                    <FormGroup check key={"High Risk"}>
                      <Label check>
                        <Input
                          type="radio"
                          name="curHighRiskProc"
                          value={"High Risk"}
                          onChange={(e) =>
                            handleInputChange("curHighRiskProc", e.target.value)
                          }
                          disabled
                          checked={
                            rangeValue1 === null || rangeValue2 === null
                              ? false
                              : calculateRiskGrade(rangeValue1 * rangeValue2) >=
                                3
                          }
                        />
                        High Risk
                      </Label>
                    </FormGroup>
                    <FormGroup check key={"N/A"}>
                      <Label check>
                        <Input
                          type="radio"
                          name="curHighRiskProc"
                          value={"N/A"}
                          onChange={(e) =>
                            handleInputChange("curHighRiskProc", e.target.value)
                          }
                          disabled
                          checked={
                            rangeValue1 === null || rangeValue2 === null
                              ? false
                              : calculateRiskGrade(rangeValue1 * rangeValue2) <
                                3
                          }
                        />
                        N/A
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험성 감소대책
                </span>
                <span
                  className="Detail_Font3"
                  style={{
                    flex: 2,
                  }}
                >
                  <FormGroup
                    style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}
                  >
                    <FormGroup check key={"N/A"}>
                      <Label check>
                        <Input
                          type="radio"
                          name="curRiskDecsMeasure"
                          value={"N/A"}
                          onChange={(e) =>
                            handleInputChange(
                              "curRiskDecsMeasure",
                              e.target.value
                            )
                          }
                          checked={formData.curRiskDecsMeasure === "N/A"}
                        />
                        N/A
                      </Label>
                    </FormGroup>
                    <FormGroup check key={"Y"}>
                      <Label check>
                        <Input
                          type="radio"
                          name="curRiskDecsMeasure"
                          value={"Y"}
                          onChange={(e) =>
                            handleInputChange(
                              "curRiskDecsMeasure",
                              e.target.value
                            )
                          }
                          checked={formData.curRiskDecsMeasure === "Y"}
                        />
                        Y
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </span>
              </div>
            </div>
          </Col>
          <Col>
            <div className="p-1">
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "-10px",
                }}
              >
                <div className="Ellipse_2"></div>
                <div className="Detail_Font1">안전보건조치 정보(To Be)</div>
              </div>
              <hr />
              <div
                style={{
                  display: isCheckboxChecked ? "none" : "",
                }}
              >
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선 대책 유형
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_SelectBox1"
                      name="improveMeasureTypeId"
                      id="curSafetyMeasureType"
                      type="select"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "improveMeasureTypeId",
                          parseInt(e.target.value, 10)
                        )
                      }
                      value={formData.improveMeasureTypeId}
                    >
                      <option key={0} value={0}>
                        전체
                      </option>
                      {measureTypeList.map((measure) => (
                        <option key={measure.id} value={measure.id}>
                          {measure.name}
                        </option>
                      ))}
                    </Input>
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선 세부내용
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_InputBox1"
                      id="improveDetailContents"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "improveDetailContents",
                          e.target.value
                        )
                      }
                      defaultValue={formData.improveDetailContents}
                    />
                  </span>
                </div>
                <div style={{ display: "flex", height: "60px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1.25 }}>
                    개선 이전 사진
                  </span>
                  <span className="Detail_Font3" style={{ flex: 1 }}>
                    <Button
                      color="secondary"
                      style={{
                        marginRight: "10px",
                        width: "60px",
                        height: "30px",
                        backgroundColor: "#747579",
                        borderColor: "#747579",
                        color: "white",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onClick={handleBeforeFileSelect}
                    >
                      업로드
                    </Button>
                    <Button
                      color="secondary"
                      style={{
                        marginRight: "10px",
                        width: "60px",
                        height: "30px",
                        backgroundColor: "#edeef2",
                        borderColor: "#edeef2",
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onClick={() => {
                        handleDelete({
                          setSelectedFile: setSelectedBeforeFile,
                          imageUrls: beforeImageUrls,
                          setImageUrls: setBeforeImageUrls,
                        });
                      }}
                    >
                      삭제
                    </Button>
                    {/* {matrix.improveBeforePicture} */}
                  </span>
                  <span
                    className="Detail_Font3"
                    style={{ flex: 1.5, display: "flex" }}
                  >
                    {type !== "matrixCopy"
                      ? (beforeImageUrls.length > 0 ? beforeImageUrls : [])
                          .concat(selectedBeforeFile)
                          .map((item, index) => (
                            <div key={index}>
                              {item instanceof File ? (
                                <img
                                  src={URL.createObjectURL(item)}
                                  alt={`Selected File Preview ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                    flexGrow: "0",
                                    ...(selectedBeforeImage === index &&
                                      selectedImageStyle),
                                  }}
                                  // onClick={() => handleImageClick(index)}
                                />
                              ) : (
                                <img
                                  src={imgDownloadUrl + item}
                                  alt={`Selected File Preview ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                    flexGrow: "0",
                                    ...(selectedBeforeImage === index &&
                                      selectedImageStyle),
                                  }}
                                  // onClick={() => handleImageClick(index)}
                                />
                              )}
                            </div>
                          ))
                      : selectedBeforeFile.map((file, index) => (
                          <div key={index}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Selected File Preview ${index + 1}`}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                flexGrow: "0",
                              }}
                            />
                          </div>
                        ))}
                    {/* <button onClick={handleBeforeUpload}>test</button> */}
                  </span>
                </div>
                <div style={{ display: "flex", height: "60px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1.25 }}>
                    개선 완료 사진
                  </span>
                  <span className="Detail_Font3" style={{ flex: 1 }}>
                    <Button
                      color="secondary"
                      style={{
                        marginRight: "10px",
                        width: "60px",
                        height: "30px",
                        backgroundColor: "#747579",
                        borderColor: "#747579",
                        color: "white",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onClick={handleExecFileSelect}
                    >
                      업로드
                    </Button>
                    <Button
                      color="secondary"
                      style={{
                        marginRight: "10px",
                        width: "60px",
                        height: "30px",
                        backgroundColor: "#edeef2",
                        borderColor: "#edeef2",
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onClick={() => {
                        handleDelete({
                          setSelectedFile: setSelectedExecFile,
                          imageUrls: execImageUrls,
                          setImageUrls: setExecImageUrls,
                        });
                      }}
                    >
                      삭제
                    </Button>
                    {/* {matrix.improveExecPicture} */}
                  </span>
                  <span
                    className="Detail_Font3"
                    style={{ flex: 1.5, display: "flex" }}
                  >
                    {type != "matrixCopy"
                      ? (execImageUrls.length > 0 ? execImageUrls : [])
                          .concat(selectedExecFile)
                          .map((item, index) => (
                            <div key={index}>
                              {item instanceof File ? (
                                <img
                                  src={URL.createObjectURL(item)}
                                  alt={`Selected File Preview ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                    flexGrow: "0",
                                    ...(selectedExecImage === index &&
                                      selectedImageStyle),
                                  }}
                                  // onClick={() => handleImageClick(index)} 이미지 선택시 테두리효과
                                />
                              ) : (
                                <img
                                  src={imgDownloadUrl + item}
                                  alt={`Selected File Preview ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                    flexGrow: "0",
                                    ...(selectedExecImage === index &&
                                      selectedImageStyle),
                                  }}
                                  // onClick={() => handleImageClick(index)} 이미지 선택시 테두리효과
                                />
                              )}
                            </div>
                          ))
                      : selectedExecFile.map((file, index) => (
                          <div key={index}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Selected File Preview ${index + 1}`}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                flexGrow: "0",
                              }}
                            />
                          </div>
                        ))}
                    {/* <button onClick={handleBeforeUpload}>test</button> */}
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선실행 조치결과
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_InputBox1"
                      id="improveExecActionResult"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "improveExecActionResult",
                          e.target.value
                        )
                      }
                      defaultValue={formData.improveExecActionResult}
                    />
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선실행 일정
                  </span>
                  <span
                    className="Detail_Font3"
                    style={{ flex: 2, display: "flex" }}
                  >
                    <Input
                      id="exampleSelectYear"
                      name="selectYear"
                      type="select"
                      style={{
                        marginRight: "10px",
                        width: "100px",
                        height: "30px",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      defaultValue={currentYear}
                      onChange={improveRiskYearChange}
                      value={improveSelectedYear}
                    >
                      {yearList.map((year) => (
                        <option key={year} value={year}>
                          {year}년
                        </option>
                      ))}
                    </Input>
                    <Input
                      id="exampleSelectMonth"
                      name="selectMonth"
                      type="select"
                      style={{
                        marginRight: "10px",
                        width: "80px",
                        height: "30px",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onChange={improveRiskMonthChange}
                      value={improveSelectedMonth}
                    >
                      <option value={0}>전체</option>
                      {monthList.map((month) => (
                        <option key={month} value={month}>
                          {month}월
                        </option>
                      ))}
                    </Input>
                    <Input
                      id="exampleSelectMonth"
                      name="selectMonth"
                      type="select"
                      style={{
                        marginRight: "10px",
                        width: "80px",
                        height: "30px",
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                      }}
                      onChange={improveRiskDayChange}
                      value={improveSelectedDay}
                    >
                      <style></style>
                      <option value={0}>전체</option>
                      {dayList.map((day) => (
                        <option key={day} value={day}>
                          {day}일
                        </option>
                      ))}
                    </Input>
                    {/* {matrix.improveExecDate} */}
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선실행 담당부서
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_SelectBox1"
                      name="improveExecDeptId"
                      id="improveExecDeptId"
                      type="select"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "improveExecDeptId",
                          parseInt(e.target.value, 10)
                        )
                      }
                      value={formData.improveExecDeptId}
                    >
                      <option key={0} value={0}>
                        전체
                      </option>
                      {departmentList.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </Input>
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선실행 담당자
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_InputBox1"
                      id="improveExecManager"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange("improveExecManager", e.target.value)
                      }
                      value={formData.improveExecManager}
                    />
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 2 }}>
                    개선 위험성 가능성(빈도)
                  </span>
                  <span className="Detail_Font3" style={{ flex: 1 }}>
                    <Input
                      className="Risk_InputBox2"
                      id="improveRiskPossibility"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                        textAlign: "center",
                      }}
                      value={rangeValue3}
                      readOnly
                      onChange={(e) =>
                        handleInputChange(
                          "improveRiskPossibility",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </span>
                  <span className="Detail_Font3" style={{ flex: 3 }}>
                    <span className="Risk_Label1">1</span>
                    <InputRange
                      type="range"
                      percent={rangeValue3 * 10} // Adjust the scale based on your requirements
                      defaultValue={rangeValue3 === null ? 1 : rangeValue3}
                      min={1}
                      max={5}
                      onChange={handleRangeChange3}
                      // value={inputData.strength}
                      // onChange={(e) => {
                      //   setInputData({ ...inputData, strength: e.target.value });
                      // }}
                    />
                    <span className="Risk_Label2">5</span>
                  </span>
                  {/* <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix.improveRiskPossibility}
                </span> */}
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 2 }}>
                    개선 위험성 중대성(강도)
                  </span>
                  <span className="Detail_Font3" style={{ flex: 1 }}>
                    <Input
                      className="Risk_InputBox2"
                      id="improveRiskImportance"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                        textAlign: "center",
                      }}
                      value={rangeValue4}
                      readOnly
                      onChange={(e) =>
                        handleInputChange(
                          "improveRiskImportance",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </span>
                  <span className="Detail_Font3" style={{ flex: 3 }}>
                    <span className="Risk_Label1">1</span>
                    <InputRange
                      type="range"
                      percent={rangeValue4 * 10} // Adjust the scale based on your requirements
                      defaultValue={rangeValue4 === null ? 1 : rangeValue4}
                      min={1}
                      max={5}
                      onChange={handleRangeChange4}
                      // value={inputData.strength}
                      // onChange={(e) => {
                      //   setInputData({ ...inputData, strength: e.target.value });
                      // }}
                    />
                    <span className="Risk_Label2">5</span>
                  </span>
                  {/* <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix.improveRiskImportance}
                </span> */}
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선 위험성 수준
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_InputBox1"
                      id="improveRiskLevel"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "improveRiskLevel",
                          parseInt(e.target.value, 10)
                        )
                      }
                      value={
                        rangeValue3 === null || rangeValue3 === null
                          ? null
                          : rangeValue3 * rangeValue4
                      }
                      disabled
                    />
                  </span>
                </div>
                <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선 위험 등급
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_InputBox1"
                      id="improveRiskGrade"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          "improveRiskGrade",
                          parseInt(e.target.value, 10)
                        )
                      }
                      value={
                        rangeValue3 === null || rangeValue3 === null
                          ? null
                          : calculateRiskGrade(rangeValue3 * rangeValue4)
                      }
                      disabled
                    />
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "45px",
                    display:
                      (matrix?.improveMeasureTypeId &&
                        matrix?.improveMeasureTypeId !== "") ||
                      (matrix?.improveDetailContents &&
                        matrix?.improveDetailContents !== "") ||
                      (matrix?.improveExecActionResult &&
                        matrix?.improveExecActionResult !== "") ||
                      (matrix?.improveExecDate &&
                        matrix?.improveExecDate !== "") ||
                      (matrix?.improveExecDeptId &&
                        matrix?.improveExecDeptId !== "") ||
                      (matrix?.improveExecManager &&
                        matrix?.improveExecManager !== "") ||
                      (matrix?.improveRiskPossibility &&
                        matrix?.improveRiskPossibility !== "") ||
                      (matrix?.improveRiskImportance &&
                        matrix?.improveRiskImportance !== "") ||
                      (matrix?.improveRiskLevel &&
                        matrix?.improveRiskLevel !== "") ||
                      (matrix?.improveRiskGrade &&
                        matrix?.improveRiskGrade !== "")
                        ? "flex"
                        : "none",
                  }}
                >
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    비고
                  </span>
                  <span className="Detail_Font3" style={{ flex: 2 }}>
                    <Input
                      className="Risk_SelectBox1"
                      id="improveCompleted"
                      type="select"
                      style={{
                        fontSize: "12px",
                        fontFamily: "LGSmart_H",
                        flex: 2,
                        margin: "0px 5px 7px 0",
                      }}
                      onChange={(e) =>
                        handleInputChange("improveCompleted", e.target.value)
                      }
                      value={formData.improveCompleted}
                    >
                      <option key={""} value={""} selected>
                        개선상태 선택
                      </option>
                      <option key={"N"} value={"N"}>
                        개선중
                      </option>
                      <option key={"Y"} value={"Y"}>
                        개선완료
                      </option>
                    </Input>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MatrixUpdate;

const InputRange = styled.input`
  cursor: pointer;
  width: 200px;
  height: 2px;
  appearance: none;
  font-size: 14px;
  vertical-align: bottom;

  background: linear-gradient(
    to right,
    #bb0841 0%,
    #d9d9d9 ${(props) => Math.min(props.percent)}%,
    // 최대 100%로 제한
    #d9d9d9 ${(props) => Math.min(props.percent)}%,
    // 최대 100%로 제한
    #d9d9d9 100%
  );

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #d00042;
    border: none;
    height: 15px;
    width: 5px;
    margin-top: -0px;
  }
`;
