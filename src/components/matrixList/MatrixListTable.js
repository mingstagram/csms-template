import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImage } from "../../utils/UtilList";
import ImageModal from "../common/ImageModal";

const MatrixListTable = ({
  matrix,
  matrixFilter,
  filter,
  setMatrixFilter,
  companyId,
  onCheckboxChange,
  sort,
  titleLabel,
  selectedCheckbox,
  checkboxChecked,
  riskCheckboxChecked,
  limit,
  searchYear,
  searchMonth,
  setPictureShowModal,
}) => {
  const imgDownloadUrl = "/image/api/getImage/";
  const navigate = useNavigate();
  const [beforeImageUrls, setBeforeImageUrls] = useState([]);
  const [execImageUrls, setExecImageUrls] = useState([]);

  const [selectedBeforeImageUrl, setSelectedBeforeImageUrl] = useState(null);
  const [selectedExecImageUrl, setSelectedExecImageUrl] = useState(null);

  const openBeforeModal = (imageUrl) => {
    setSelectedBeforeImageUrl(imageUrl);
    setPictureShowModal(true);
  };

  const closeBeforeModal = (e) => {
    setSelectedBeforeImageUrl(null);
    setPictureShowModal(false);
  };

  const openExecModal = (imageUrl) => {
    setSelectedExecImageUrl(imageUrl);
    setPictureShowModal(true);
  };

  const closeExecModal = (e) => {
    setSelectedExecImageUrl(null);
    setPictureShowModal(false);
  };

  const handleRowClick = () => {
    navigate("/matrixList/detail", {
      state: {
        companyId: companyId,
        sort: sort,
        titleLabel: titleLabel,
        matrixFilter: matrixFilter,
        matrixId: matrix.id,
        pageNum: matrixFilter.pageNum,
        checkboxChecked: checkboxChecked,
        riskCheckboxChecked: riskCheckboxChecked,
        limit: limit,
        searchYear: searchYear,
        searchMonth: searchMonth,
      },
    });
  };

  useEffect(() => {
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
  }, [selectedCheckbox]);

  const commonCellStyle =
    matrix.curRiskGradeInt > 2
      ? { color: "#a50034", fontWeight: "bold", backgroundColor: "#f8f1eb" }
      : {};
  // 현재위험등급이 3등급 이상이지만 개선위험등급이 2등급 이하인경우
  // const commonCellStyle =
  //   matrix.improveRiskGradeInt <= 2
  //     ? {}
  //     : matrix.curRiskGradeInt > 2
  //     ? { color: "#a50034", fontWeight: "bold", backgroundColor: "#f8f1eb" }
  //     : {};

  return (
    <tr
      style={{
        height: "57px",
        fontSize: "12px",
        verticalAlign: "middle",
      }}
      onClick={handleRowClick}
    >
      <td
        style={{
          width: "50px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          type="checkbox"
          id={matrix.id}
          className="Check_Normal1"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            onCheckboxChange(matrix.id);
          }}
          checked={selectedCheckbox.includes(matrix.id)}
        ></input>
      </td>
      <td
        style={{
          width: "120px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.division}
      </td>
      <td
        style={{
          width: "120px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.department}
      </td>
      <td
        style={{
          width: "120px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix?.improveCompleted === "Y"
          ? "개선완료"
          : matrix?.improveCompleted === "N"
          ? "개선중"
          : ""}
      </td>
      <td
        style={{
          width: "130px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.regularRiskAssessmentDate}
      </td>
      <td
        style={{
          width: "130px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.freqRiskAssessmentDate}
      </td>
      <td
        style={{
          width: "100px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.freqRiskAssessmentType}
      </td>
      <td
        style={{
          width: "130px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.freqRiskSheeNumber}
      </td>
      <td
        style={{
          width: "180px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.processNumber}
      </td>
      <td
        style={{
          width: "130px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.processFacility}
      </td>
      <td
        style={{
          width: "300px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.detailWorkingEquipment}
      </td>
      <td
        style={{
          width: "90px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.harmfulAppField}
      </td>
      <td
        style={{
          width: "90px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.harmfulStatusCategory}
      </td>
      <td
        style={{
          width: "90px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.harmfulClassification}
      </td>
      <td
        style={{
          width: "130px",
          borderLeft: "none",
          borderRight: "none",
          ...commonCellStyle,
        }}
      >
        {matrix.harmfulCauseIdf}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.harmfulDangerousSituation}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.disasterType}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curSafetyMeasureType}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curSafetyActionContents}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curRiskPossibility}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curRiskImportance}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curRiskLevel}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curRiskGrade} &#9679;
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curHighRiskProc}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.curRiskDecsMeasure}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveMeasureType}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveDetailContents}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {beforeImageUrls.length > 0 && (
          <img
            src={imgDownloadUrl + beforeImageUrls[0]}
            alt={`Selected File Preview 1`}
            style={{
              width: "40px",
              height: "40px",
              flexGrow: "0",
              cursor: "pointer",
              ...commonCellStyle,
            }}
            onClick={(e) => {
              e.stopPropagation();
              openBeforeModal(imgDownloadUrl + beforeImageUrls[0]);
            }}
          />
        )}
        {/* 모달 */}
        {selectedBeforeImageUrl && (
          <ImageModal
            isOpen={true}
            onRequestClose={closeBeforeModal}
            imageUrls={beforeImageUrls}
            msg="개선 이전사진"
            sort="matrix-list"
          />
        )}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {execImageUrls.length > 0 && (
          <img
            src={imgDownloadUrl + execImageUrls[0]}
            alt={`Selected File Preview 1`}
            style={{
              width: "40px",
              height: "40px",
              flexGrow: "0",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openExecModal(imgDownloadUrl + execImageUrls[0]);
            }}
          />
        )}
        {/* 모달 */}
        {selectedExecImageUrl && (
          <ImageModal
            isOpen={true}
            onRequestClose={closeExecModal}
            imageUrls={execImageUrls}
            msg="개선 완료 사진"
            sort="matrix-list"
          />
        )}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveExecActionResult}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveExecDate}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveExecDept}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveExecManager}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveRiskPossibility}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveRiskImportance}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveRiskLevel}
      </td>
      <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.improveRiskGrade}
      </td>
      {/* <td
        style={{ borderLeft: "none", borderRight: "none", ...commonCellStyle }}
      >
        {matrix.remark}
      </td> */}
    </tr>
  );
};

export default MatrixListTable;
