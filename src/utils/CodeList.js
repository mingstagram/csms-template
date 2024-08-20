import axios from "axios";
import { useState } from "react";

export const getCompanyData = ({ filter, setCompanyName }) => {
  axios
    .get("/admin/api/find_all_company")
    .then((res) => {
      if (res.data.code === "0000") {
        const matchingCompany = res.data.result.find(
          (company) => company.id === filter.companyId
        );
        if (matchingCompany) {
          // 찾은 객체의 name 값을 사용
          const companyName = matchingCompany.name;
          setCompanyName(companyName);
        }
      }
    })
    .catch(() => {});
};

export const getClassificationList = ({ setClassificationList }) => {
  axios
    .post("/admin/api/find_harmful_classification_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setClassificationList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getCauseIdfList = (setCauseIdfList) => {
  axios
    .post("/admin/api/find_harmful_cause_idf_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setCauseIdfList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getAppFieldList = (setAppFieldList) => {
  axios
    .post("/admin/api/find_harmful_app_field_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setAppFieldList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getStatusCategoryList = (setStatusCategoryList) => {
  axios
    .post("/admin/api/find_harmful_status_category_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setStatusCategoryList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getMeasureTypeList = (setMeasureTypeList) => {
  axios
    .post("/admin/api/find_measure_type_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setMeasureTypeList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getAssessmentTypeList = (setRiskAssessmentTypeList) => {
  axios
    .post("/admin/api/find_risk_assessment_type_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setRiskAssessmentTypeList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getDisasterTypeList = (setDisasterTypeList) => {
  axios
    .post("/admin/api/find_disaster_type_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setDisasterTypeList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getCompList = ({ setCompanyList }) => {
  axios
    .post("/admin/api/find_company_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setCompanyList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getDivList = ({ selectedCompanyId, setDivisionList }) => {
  axios
    .post("/admin/api/find_selected_division_list", {
      companyId: selectedCompanyId,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setDivisionList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getAllDivList = ({ setDivisionList }) => {
  axios
    .post("/admin/api/find_all_division_list")
    .then((res) => {
      if (res.data.code === "0000") {
        setDivisionList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getAllDeptList = (setDepartmentList) => {
  const adminDept = {
    id: 1,
    companyId: 1,
    divisionId: 1,
    name: "평택안전보건팀",
    isDeleted: "N",
  };
  axios
    .post("/admin/api/find_all_department_list")
    .then((res) => {
      if (res.data.code === "0000") {
        const allDepts = [...res.data.result, adminDept];
        setDepartmentList(allDepts);
      }
    })
    .catch(() => {});
};

export const getDeptList = ({
  selectedDivisionId,
  setSelectedDepartmentList,
}) => {
  axios
    .post("/admin/api/find_department_list", {
      divisionId: selectedDivisionId,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setSelectedDepartmentList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getDeptListByCompanyId = ({
  selectedCompanyId,
  setSelectedDepartmentList,
}) => {
  if (selectedCompanyId === "admin") {
    return;
  }
  axios
    .post("/admin/api/find_department_list_by_companyId", {
      companyId: selectedCompanyId,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setSelectedDepartmentList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getUserList = ({ setUserList, authority }) => {
  axios
    .post("/user/api/find_user_list", {
      authority: authority,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setUserList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getUserMidAuthorityList = ({
  setUserMidAuthorityList,
  midAuthority,
}) => {
  axios
    .post("/user/api/find_user_mid_authority_list", {
      midAuthority: midAuthority,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setUserMidAuthorityList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getInitUserList = ({ setInitUserList }) => {
  axios
    .post("/user/api/find_user_list", {
      authority: null,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setInitUserList(res.data.result);
      }
    })
    .catch(() => {});
};

export const getApprovalUserList = ({ setApprovalUserList, approval }) => {
  axios
    .post("/user/api/find_approval_user_list", {
      approval: approval,
    })
    .then((res) => {
      if (res.data.code === "0000") {
        setApprovalUserList(res.data.result);
      }
    })
    .catch(() => {});
};
