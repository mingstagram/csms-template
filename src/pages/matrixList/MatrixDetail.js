import React, { useEffect, useState } from "react";
import "../../styles/projectStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import { Button, Col, Row } from "reactstrap";
import axios from "axios";
import { getImage } from "../../utils/UtilList";
import ImageModal from "../../components/common/ImageModal";

const MatrixDetail = () => {
  const imgDownloadUrl = "/image/api/getImage/";
  const sessionStorage = window.sessionStorage;
  const sessionUsername = sessionStorage.getItem("username");
  const sessionCompanyId = sessionStorage.getItem("companyId");
  const sessionDivisionId = sessionStorage.getItem("divisionId");
  const sessionDepartmentId = sessionStorage.getItem("departmentId");
  const authority = sessionStorage.getItem("authority");
  const midAuthority = sessionStorage.getItem("midAuthority");
  // const { id, companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    matrixFilter,
    companyId,
    titleLabel,
    matrixId,
    stateSort,
    pageNum,
    checkboxChecked,
    riskCheckboxChecked,
    limit,
    searchYear,
    searchMonth,
  } = location.state;
  const [maintainPageNum, setMaintainPageNum] = useState(pageNum);
  const [matrix, setMatrix] = useState(null);
  const [beforeImageUrls, setBeforeImageUrls] = useState([]);
  const [execImageUrls, setExecImageUrls] = useState([]);

  const [selectedBeforeImageUrl, setSelectedBeforeImageUrl] = useState(null);
  const [selectedExecImageUrl, setSelectedExecImageUrl] = useState(null);

  const openBeforeModal = (imageUrl) => {
    setSelectedBeforeImageUrl(imageUrl);
  };

  const closeBeforeModal = () => {
    setSelectedBeforeImageUrl(null);
  };

  const openExecModal = (imageUrl) => {
    setSelectedExecImageUrl(imageUrl);
  };

  const closeExecModal = () => {
    setSelectedExecImageUrl(null);
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

  const [paramValue, setParamValue] = useState({
    ...matrixFilter,
    matrixId: matrixId,
  });

  useEffect(() => {
    getMatrixData();
    getImage({
      setImageUrls: setExecImageUrls,
      matrixId,
      sort: "improveExecPicture",
    });
    getImage({
      setImageUrls: setBeforeImageUrls,
      matrixId,
      sort: "improveBeforePicture",
    });
  }, []);

  const getMatrixData = () => {
    axios
      .post("/admin/api/find_matrix_detail", paramValue)
      .then((res) => {
        if (res.data.code === "0000") {
          setMatrix(res.data.result);
        }
      })
      .catch((error) => {
        console.error("Error in axios post:", error); // 오류 로그 추가
      });
  };

  const handleUpdateClick = () => {
    // console.log(sessionUsername)
    // console.log(sessionUsername === matrix?.department);
    if (
      authority === "Y" ||
      (midAuthority === "Y" && Number(sessionCompanyId) === Number(companyId))
    ) {
      navigate("/matrixList/update", {
        state: {
          matrix: matrix,
          companyId: companyId,
          titleLabel: titleLabel,
        },
      });
    } else {
      if (sessionUsername === matrix?.department) {
        navigate("/matrixList/update", {
          state: {
            matrix: matrix,
            companyId: companyId,
            titleLabel: titleLabel,
          },
        });
      } else {
        alert("권한이 없습니다.");
        return;
      }
    }
  };

  const handleMatrixCopyClick = () => {
    navigate("/matrixList/update", {
      state: {
        matrix: matrix,
        companyId: companyId,
        titleLabel: titleLabel,
        type: "matrixCopy",
      },
    });
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
            <div className="Matrix_List_Title1">
              <b>{titleLabel} 위험성평가</b>
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
                  const dataToSend = {
                    companyId: matrixFilter.companyId,
                    divisionId: matrixFilter.divisionId,
                    departmentId: matrixFilter.departmentId,
                    sort: stateSort,
                    divisionName: titleLabel,
                    departmentName: titleLabel,
                    titleLabel: titleLabel,
                    maintainPageNum: pageNum,
                    checkboxChecked: checkboxChecked,
                    riskCheckboxChecked: riskCheckboxChecked,
                    limit: limit,
                    searchYear: searchYear,
                    searchMonth: searchMonth,
                  };
                  navigate("/matrixList", { state: dataToSend });
                }}
              >
                목록
              </Button>

              <Button
                color="secondary"
                style={{
                  marginRight: "10px",
                  width: "140px",
                  height: "36px",
                  backgroundColor: "#747579",
                  borderColor: "#747579",
                  color: "white",
                  fontSize: "12px",
                  fontFamily: "LGSmart_H",
                }}
                onClick={handleMatrixCopyClick}
              >
                평가표 복사
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
                onClick={handleUpdateClick}
              >
                수정하기
              </Button>
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
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  본부
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.company}
                </span>
              </div>
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  담당
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.division}
                </span>
              </div>
              <div style={{ display: "flex", height: "40px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  부서명
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.department}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "40px",
                  marginBottom: "20px",
                }}
              >
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  정기위험성평가 평가일
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.regularRiskAssessmentDate}
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
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  수시위험성평가 평가일
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.freqRiskAssessmentDate}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  수시위험성평가 유형
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.freqRiskAssessmentType}
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
                <span
                  className="Detail_Font3"
                  style={{ flex: 2, verticalAlign: "middle" }}
                >
                  {matrix?.freqRiskSheeNumber}
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
                <div className="Detail_Font1">공정(작업) 및 위험 정보</div>
              </div>
              <hr />
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  공정번호
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.processNumber}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  공정(설비)명 (작업내용)
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.processFacility}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  세부작업활동 또는 작업장비
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.detailWorkingEquipment}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 적용분야
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.harmfulAppField}
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
                  marginBottom: "10px",
                }}
              >
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 상태구분
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.harmfulStatusCategory}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 위험분류
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.harmfulClassification}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 위험발생상황 및 결과
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.harmfulDangerousSituation}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  유해위험요인 요인파악
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.harmfulCauseIdf}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span
                  className="Detail_Font2"
                  style={{ flex: 1, color: "#d00042" }}
                >
                  재해유형
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.disasterType}
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
                  {matrix?.curSafetyMeasureType}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 안전보건조치 조치내용
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curSafetyActionContents}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험성 가능성(빈도)
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curRiskPossibility}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험성 중대성(강도)
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curRiskImportance}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험성 위험성수준
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curRiskLevel}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험 등급
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curRiskGrade}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 High Risk 공정
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curHighRiskProc}
                </span>
              </div>
              <div style={{ display: "flex", height: "50px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  현재 위험성 감소대책
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.curRiskDecsMeasure}
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
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 대책 유형
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveMeasureType}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 세부내용
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveDetailContents}
                </span>
              </div>
              <div style={{ display: "flex", height: "70px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 이전 사진
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {beforeImageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={imgDownloadUrl + url}
                      alt={`Selected File Preview ${index + 1}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                        flexGrow: "0",
                        cursor: "pointer", // 마우스 오버 시 포인터 모양으로 변경
                      }}
                      onClick={() => openBeforeModal(imgDownloadUrl + url)}
                    />
                  ))}
                </span>
                {/* 모달 */}
                {selectedBeforeImageUrl && (
                  <ImageModal
                    isOpen={true}
                    onRequestClose={closeBeforeModal}
                    imageUrls={selectedBeforeImageUrl}
                    msg="개선 이전사진"
                    sort="matrix-detail"
                  />
                )}
              </div>
              <div style={{ display: "flex", height: "70px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 완료 사진
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {execImageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={imgDownloadUrl + url}
                      alt={`Selected File Preview ${index + 1}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                        flexGrow: "0",
                        cursor: "pointer", // 마우스 오버 시 포인터 모양으로 변경
                      }}
                      onClick={() => openExecModal(imgDownloadUrl + url)}
                    />
                  ))}
                  {/* 모달 */}
                  {selectedExecImageUrl && (
                    <ImageModal
                      isOpen={true}
                      onRequestClose={closeExecModal}
                      imageUrls={selectedExecImageUrl}
                      msg="개선 완료 사진"
                      sort="matrix-detail"
                    />
                  )}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선실행 조치결과
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveExecActionResult}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선실행 일정
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveExecDate}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선실행 담당부서
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveExecDept}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선실행 담당자
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveExecManager}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 위험성 가능성(빈도)
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveRiskPossibility}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 위험성 중대성(강도)
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveRiskImportance}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 위험성 수준
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveRiskLevel}
                </span>
              </div>
              <div style={{ display: "flex", height: "45px" }}>
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선 위험 등급
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveRiskGrade}
                </span>
              </div>
              <div
                style={{
                  display:
                    (matrix?.curHighRiskProc &&
                      matrix?.curHighRiskProc !== "") ||
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
                  height: "45px",
                }}
              >
                <div className="Ellipse_1"></div>
                <span className="Detail_Font2" style={{ flex: 1 }}>
                  개선상태
                </span>
                <span className="Detail_Font3" style={{ flex: 2 }}>
                  {matrix?.improveCompleted === "Y"
                    ? "개선완료"
                    : matrix?.improveCompleted === "N"
                    ? "개선중"
                    : ""}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MatrixDetail;
