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
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  FormGroup,
  Label,
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
  getRiskDateList,
  handleDelete,
  handleFileSelect,
  handleForm,
  monthChange,
  yearChange,
} from "../../utils/UtilList";
import CustomConfirmModal from "../../components/common/CustomConfirmModal";

const MatrixCreate = () => {
  // const { id, companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    companyId,
    titleLabel,
    divisionId,
    departmentId,
    stateSort,
    matrixFilter,
  } = location.state;
  const sessionStorage = window.sessionStorage;
  const sessionUsername = sessionStorage.getItem("username");
  const sessionCompanyId = sessionStorage.getItem("companyId");
  const sessionDivisionId = sessionStorage.getItem("divisionId");
  const sessionDepartmentId = sessionStorage.getItem("departmentId");
  const authority = sessionStorage.getItem("authority");
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
  // const [divisionId, setDivisionId] = useState(0);
  // const [departmentId, setDepartmentId] = useState(0);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
  const currentDay = new Date().getDay();
  const [searchMonth, setSearchMonth] = useState(currentMonth);
  const [searchYear, setSearchYear] = useState(currentYear);
  const [searchDay, setSearchDay] = useState(currentDay);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [rangeValue1, setRangeValue1] = useState(null);
  const [rangeValue2, setRangeValue2] = useState(null);
  const [rangeValue3, setRangeValue3] = useState(null);
  const [rangeValue4, setRangeValue4] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(0);
  const [selectedDivisionId, setSelectedDivisionId] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(12); // 기본값 전체
  const [selectedDay, setSelectedDay] = useState(12); // 기본값 전체
  const [divisionName, setDivisionName] = useState();
  const [departmentName, setDepartmentName] = useState();
  const [selectedBeforeFile, setSelectedBeforeFile] = useState([]);
  const [selectedExecFile, setSelectedExecFile] = useState([]);

  const handleBeforeUpload = () => {
    if (selectedBeforeFile.length === 0) {
      alert("개선이전사진을 등록해주세요.");
      return;
    }

    const formData = new FormData();
    selectedBeforeFile.forEach((file, index) => {
      formData.append(`file`, file);
    });
    formData.append("test", "test");

    axios
      .post("/image/api/upload", formData)
      .then((res) => {})
      .catch(() => {});
  };

  const handleExecUpload = () => {
    if (selectedExecFile.length === 0) {
      alert("개선완료사진을 등록해주세요.");
      return;
    }

    const formData = new FormData();
    selectedExecFile.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleConfirm = () => {
    // 확인 버튼을 눌렀을 때의 동작 수행
    // 여기에서 API 호출 및 페이지 이동 등을 수행할 수 있습니다.
    // ...
    // 모달 닫기

    handleForm({
      formData,
      setError,
      filter: createMatrixFilter,
      navigate,
      sort: "create",
      selectedBeforeFile,
      selectedExecFile,
      titleLabel: titleLabel,
      matrixFilter: matrixFilter,
      stateSort: stateSort,
    });
    setConfirmationModalOpen(false);
  };

  const handleFormSubmit = () => {
    // 사용자가 수정완료 버튼을 눌렀을 때의 동작
    // 모달 열기
    setConfirmationModalOpen(true);
  };

  const [formData, setFormData] = useState({
    regularRiskDateYear: currentYear,
    companyId: 0,
    divisionId: 0,
    departmentId: 0,
    regularRiskAssessmentDate: null,
    processNumber: null,
    processFacility: null,
    detailWorkingEquipment: null,
    harmfulAppFieldId: 0,
    harmfulStatusCategoryId: 0,
    harmfulClassificationId: 0,
    harmfulCauseIdfId: 0,
    harmfulDangerousSituation: null,
    disasterTypeId: 0,
    curSafetyMeasureTypeId: 0,
    curSafetyActionContents: null,
    curRiskPossibility: null,
    curRiskImportance: null,
    curRiskLevel: null,
    curRiskGrade: null,
    curHighRiskProc: null,
    curRiskDecsMeasure: null,
    // 선택형
    freqRiskAssessmentDate: null,
    freqRiskAssessmentTypeId: null,
    freqRiskSheeNumber: null,
    improveMeasureTypeId: null,
    improveDetailContents: null,
    improveBeforePictures: [],
    improveExecPictures: [],
    improveExecDate: null,
    improveExecActionResult: null,
    improveExecDeptId: null,
    improveExecManager: null,
    improveRiskPossibility: null,
    improveRiskImportance: null,
    improveRiskLevel: null,
    improveRiskGrade: null,
    remark: null,
    improveCompleted: null,
  });

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
      setFormData({
        ...formData,
        improveBeforePictures: files,
      });
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
        alert("사진은 3장이상 등록할 수 없습니다.");
        return;
      }

      setSelectedExecFile(files);
      setFormData({
        ...formData,
        improveExecPictures: files,
      });
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

  const [createMatrixFilter, setCreateMatrixFilter] = useState({
    ...filter,
    divisionId: divisionId,
    departmentId: departmentId,
    searchYear: null, //new Date().getFullYear(),
    searchMonth: null,
    sort: stateSort,
  });

  useEffect(() => {
    getCompanyData({ filter, setCompanyName });
    if (sessionUsername !== "admin") {
      getDeptList({
        selectedDivisionId: sessionDivisionId,
        setSelectedDepartmentList,
      });
      getDivList({ selectedCompanyId: sessionCompanyId, setDivisionList });
      setFormData({
        ...formData,
        companyId: sessionCompanyId,
        divisionId: sessionDivisionId,
        departmentId: sessionDepartmentId,
      });
    } else {
      getDeptList({
        selectedDivisionId,
        setSelectedDepartmentList,
      });
      getDivList({ selectedCompanyId, setDivisionList });
    }

    // setFormData({
    //   ...formData,
    //   curRiskLevel: document.getElementById("curRiskLevel").value,
    //   curRiskGrade: document.getElementById("curRiskGrade").value,
    // });
    // getAllDeptList(setDepartmentList);
    getCompList({ setCompanyList });
    getDisasterTypeList(setDisasterTypeList);
    getAssessmentTypeList(setRiskAssessmentTypeList);
    getMeasureTypeList(setMeasureTypeList);
    getStatusCategoryList(setStatusCategoryList);
    getAppFieldList(setAppFieldList);
    getCauseIdfList(setCauseIdfList);
    getClassificationList({ setClassificationList });
    getRiskDateList({ setYearList, setMonthList, setDayList });
    // setSelectedCompanyId(companyId);
    // setSelectedDivisionId(divisionId);
  }, [selectedCompanyId, selectedDivisionId]);

  const handleDivisionChange = (event) => {
    const selectedDivisionId = parseInt(event.target.value, 10);
    setSelectedDivisionId(selectedDivisionId);

    // divisionList에서 id와 divisionId가 일치하는 항목을 찾음
    const selectedDivision = divisionList.find(
      (division) => division.id === selectedDivisionId
    );
    // 찾은 항목이 있다면 해당 divisionName을 설정
    if (selectedDivision) {
      setDivisionName(selectedDivision.name);
    }
    handleInputChange("divisionId", selectedDivisionId);
  };

  const handleDepartmentChange = (event) => {
    const selectedDepartmentId = parseInt(event.target.value, 10);
    setSelectedDepartmentId(selectedDepartmentId);

    // divisionList에서 id와 divisionId가 일치하는 항목을 찾음
    const selectedDepartment = departmentList.find(
      (department) => department.id === selectedDepartmentId
    );

    // 찾은 항목이 있다면 해당 divisionName을 설정
    if (selectedDepartment) {
      const { departmentName } = selectedDepartment.name;
      setDepartmentName(departmentName);
    }
    handleInputChange("departmentId", selectedDepartmentId);
  };

  const handleCompanyChange = (event) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setSelectedCompanyId(selectedCompanyId);
    handleInputChange("companyId", selectedCompanyId);
    // setDivisionId(selectedDivisionId);
  };

  const regularRiskYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    regularRiskUpdateData(year, selectedMonth, selectedDay);
    const selectedYear = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      regularRiskDateYear: selectedYear,
    });
  };

  const regularRiskMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    regularRiskUpdateData(selectedYear, month, selectedDay);
    const selectedMonth = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      regularRiskDateMonth: selectedMonth,
    });
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
    if (riskLevel === null) {
      return null;
    } else if (riskLevel >= 1 && riskLevel <= 2) {
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
              <b>{titleLabel} 위험성평가 신규 작성</b>
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
              {/* <Input
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
                목록
              </Button>

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
              {/* 커스텀 Confirm 모달 */}
              <CustomConfirmModal
                isOpen={isConfirmationModalOpen}
                onRequestClose={() => setConfirmationModalOpen(false)}
                onConfirm={handleConfirm}
                msg="해당 위험성평가 내용을 신규 등록하시겠습니까?"
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
              <div
                style={{ display: "flex", height: "40px", color: "#d00042" }}
              >
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
                    value={authority === "Y" ? undefined : sessionCompanyId}
                    onChange={handleCompanyChange}
                    disabled={authority === "Y" ? false : true}
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
                    value={authority === "Y" ? undefined : sessionDivisionId}
                    onChange={handleDivisionChange}
                    disabled={authority === "Y" ? false : true}
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
                    value={authority === "Y" ? undefined : sessionDepartmentId}
                    onChange={handleDepartmentChange}
                    disabled={authority === "Y" ? false : true}
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
                      fontFamily: "LGSmart_H-Regular",
                    }}
                    defaultValue={currentYear}
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
                      fontFamily: "LGSmart_H-Regular",
                    }}
                    onChange={regularRiskMonthChange}
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
                      fontFamily: "LGSmart_H-Regular",
                    }}
                    onChange={regularRiskDayChange}
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
                        fontFamily: "LGSmart_H-Regular",
                      }}
                      defaultValue={currentYear}
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
                        fontFamily: "LGSmart_H-Regular",
                      }}
                      onChange={freqRiskMonthChange}
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
                        fontFamily: "LGSmart_H-Regular",
                      }}
                      onChange={freqRiskDayChange}
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
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "55px" }}>
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
              <div style={{ display: "flex", height: "50px" }}>
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
              <div style={{ display: "flex", height: "50px" }}>
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
                  />
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
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
                    defaultValue={1}
                    min={1}
                    max={5}
                    onChange={handleRangeChange1}
                  />
                  <span className="Risk_Label2">5</span>
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
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
                    defaultValue={1}
                    min={1}
                    max={5}
                    onChange={handleRangeChange2}
                  />
                  <span className="Risk_Label2">5</span>
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
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
              <div style={{ display: "flex", height: "50px" }}>
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
              <div style={{ display: "flex", height: "50px" }}>
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
              <div style={{ display: "flex", height: "50px" }}>
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
                        />
                        Y
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </span>
                {/* <span className="Detail_Font3" style={{ flex: 2 }}>
                  <Input
                    className="Risk_SelectBox1"
                    id="curRiskDecsMeasure"
                    name="select"
                    type="select"
                    style={{
                      fontSize: "12px",
                      fontFamily: "LGSmart_H",
                      flex: 2,
                      margin: "0px 5px 7px 0",
                    }}
                    onChange={(e) =>
                      handleInputChange("curRiskDecsMeasure", e.target.value)
                    }
                  >
                    <option key={"N/A"} value={"N/A"}>
                      N/A
                    </option>
                    <option key={"Y"} value={"Y"}>
                      Y
                    </option>
                  </Input>
                </span> */}
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
                    />
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "70px",
                  }}
                >
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
                          sort: "create",
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
                    {selectedBeforeFile.map((file, index) => (
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
                <div style={{ display: "flex", height: "70px" }}>
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
                          sort: "create",
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
                    {selectedExecFile.map((file, index) => (
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
                        fontFamily: "LGSmart_H-Regular",
                      }}
                      defaultValue={currentYear}
                      onChange={improveRiskYearChange}
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
                        fontFamily: "LGSmart_H-Regular",
                      }}
                      onChange={improveRiskMonthChange}
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
                        fontFamily: "LGSmart_H-Regular",
                      }}
                      onChange={improveRiskDayChange}
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
                    />
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
                      defaultValue={1}
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
                      defaultValue={1}
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
                {/* <div style={{ display: "flex", height: "45px" }}>
                  <div className="Ellipse_1"></div>
                  <span className="Detail_Font2" style={{ flex: 1 }}>
                    개선상태
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
                    >
                      <option key={"N"} value={"N"}>
                        개선중
                      </option>
                      <option key={"Y"} value={"Y"}>
                        개선완료
                      </option> 
                    </Input>
                  </span>
                </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MatrixCreate;

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
