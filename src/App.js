import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState } from "react";
import Setting from "./pages/setting/Setting.js";
import Regist from "./pages/regist/Regist.js";
import PasswordChange from "./pages/passwordChange/PasswordChange.js";
import Notice from "./pages/notice/Notice.js";
import Announce from "./pages/announce/Announce.js";
import DataResult from "./pages/council/DataResult.js";
import ImproveSuggest from "./pages/council/ImproveSuggest.js";
import ImproveSuggestWrite from "./pages/council/ImproveSuggestWrite.js";
import DataResultWrite from "./pages/council/DataResultWrite.js";
import Partner from "./pages/partner/Partner.js";
import PartnerCreate from "./pages/partner/PartnerCreate.js";
import Inspection from "./pages/inspection/Inspection.js";
import InspectionCreate from "./pages/inspection/InspectionCreate.js";
import SafetyHealth from "./pages/safetyHealth/SafetyHealth.js";
import SafetyHealthCreate from "./pages/safetyHealth/SafetyHealthCreate.js";
import RentalEquipment from "./pages/rentalEquipment/RentalEquipment.js";
import Qualification from "./pages/qualification/Qualification.js";
import QualificationCreate from "./pages/qualification/QualificationCreate.js";
import InspectionUpdate from "./pages/inspection/InspectionUpdate.js";
import InspectionDetail from "./pages/inspection/InspectionDetail.js";
import SafetyHealthDetail from "./pages/safetyHealth/SafetyHealthDetail.js";
import SafetyHealthUpdate from "./pages/safetyHealth/SafetyHealthUpdate.js";
import PartnerUpdate from "./pages/partner/PartnerUpdate.js";
import PartnerDetail from "./pages/partner/PartnerDetail.js";
import Organization from "./pages/organization/Organization.js";
import ShInformation from "./pages/shInformation/ShInformation.js";
import RegularEducation from "./pages/education/RegularEducation.js";
import SpecialEducation from "./pages/education/SpecialEducation.js";
import OtherEducation from "./pages/education/OtherEducation.js";
import RegularEducationCreate from "./pages/education/RegularEducationCreate.js";
import SpecialEducationCreate from "./pages/education/SpecialEducationCreate.js";
import OtherEducationCreate from "./pages/education/OtherEducationCreate.js";
import ShInformationCreate from "./pages/shInformation/ShInformationCreate.js";
import ContractorSh from "./pages/shManageBuild/ContractorSh.js";
import EmergencyPlan from "./pages/shManageBuild/EmergencyPlan.js";
import HazardManagement from "./pages/shManageBuild/HazardManagement.js";
import ShLeadership from "./pages/shManageBuild/ShLeadership.js";
import ShSystemImprove from "./pages/shManageBuild/ShSystemImprove.js";
import WorkerParticipation from "./pages/shManageBuild/WorkerParticipation.js";
import ContractorShCreate from "./pages/shManageBuild/ContractorShCreate.js";
import EmergencyPlanCreate from "./pages/shManageBuild/EmergencyPlanCreate.js";
import HazardManagementCreate from "./pages/shManageBuild/HazardManagementCreate.js";
import ShLeadershipCreate from "./pages/shManageBuild/ShLeadershipCreate.js";
import ShSystemImproveCreate from "./pages/shManageBuild/ShSystemImproveCreate.js";
import WorkerParticipationCreate from "./pages/shManageBuild/WorkerParticipationCreate.js";
import AnnounceUpdate from "./pages/announce/AnnounceUpdate.js";
import NoticeUpdate from "./pages/notice/NoticeUpdate.js";
import RegularEducationUpdate from "./pages/education/RegularEducationUpdate.js";
import SpecialEducationUpdate from "./pages/education/SpecialEducationUpdate.js";
import OtherEducationUpdate from "./pages/education/OtherEducationUpdate.js";
import DataResultUpdate from "./pages/council/DataResultUpdate.js";
import ImproveSuggestUpdate from "./pages/council/ImproveSuggestUpdate.js";
import ShInformationUpdate from "./pages/shInformation/ShInformationUpdate.js";
import QualificationUpdate from "./pages/qualification/QualificationUpdate.js";
import ContractorShUpdate from "./pages/shManageBuild/ContractorShUpdate.js";
import EmergencyPlanUpdate from "./pages/shManageBuild/EmergencyPlanUpdate.js";
import HazardManagementUpdate from "./pages/shManageBuild/HazardManagementUpdate.js";
import ShLeadershipUpdate from "./pages/shManageBuild/ShLeadershipUpdate.js";
import ShSystemImproveUpdate from "./pages/shManageBuild/ShSystemImproveUpdate.js";
import WorkerParticipationUpdate from "./pages/shManageBuild/WorkerParticipationUpdate.js";

function App() {
  // const routing = useRoutes(Themeroutes);
  // const [shouldRenderHeader, setShouldRenderHeader] = useAtom(
  //   shouldRenderHeaderState
  // );
  // const shouldRenderHeader = !window.location.pathname.includes("/login");

  const defaultUrl = process.env.PUBLIC_URL;
  const sessionStorage = window.sessionStorage;
  const username = sessionStorage.getItem("username");
  const companyId = sessionStorage.getItem("companyId");

  const [filter, setFilter] = useState({
    keyword: "",
    limit: 10,
    pageNum: 1,
    state: "1",
    workType: null,
    companyId: companyId === "admin" ? 1 : parseInt(companyId),
    divisionId: 0,
    departmentId: 0,
    searchYear: new Date().getFullYear(), //new Date().getFullYear(),
    searchMonth: null,
  });

  return (
    <div>
      {/* {shouldRenderHeader && <Header />} */}
      <Routes>
        <Route
          path={defaultUrl + "/"}
          element={<Dashboard filter2={filter} setFilter2={setFilter} />}
        />
        <Route path={defaultUrl + "/regist"} element={<Regist />} />
        <Route path={defaultUrl + "/setting"} element={<Setting />} />
        <Route path={defaultUrl + "/pwchange"} element={<PasswordChange />} />
        <Route path={defaultUrl + "/notice"} element={<Notice />} />
        <Route path={defaultUrl + "/noticeUpdate"} element={<NoticeUpdate />} />
        <Route path={defaultUrl + "/announce"} element={<Announce />} />
        <Route
          path={defaultUrl + "/announceUpdate"}
          element={<AnnounceUpdate />}
        />
        <Route path={defaultUrl + "/dataResult"} element={<DataResult />} />
        <Route path={defaultUrl + "/improve"} element={<ImproveSuggest />} />
        <Route
          path={defaultUrl + "/dataResultWrite"}
          element={<DataResultWrite />}
        />
        <Route
          path={defaultUrl + "/improveWrite"}
          element={<ImproveSuggestWrite />}
        />
        <Route
          path={defaultUrl + "/dataResultUpdate"}
          element={<DataResultUpdate />}
        />
        <Route
          path={defaultUrl + "/improveUpdate"}
          element={<ImproveSuggestUpdate />}
        />
        <Route path={defaultUrl + "/partner"} element={<Partner />} />
        <Route
          path={defaultUrl + "/partnerCreate"}
          element={<PartnerCreate />}
        />
        <Route
          path={defaultUrl + "/partnerDetail"}
          element={<PartnerDetail />}
        />
        <Route
          path={defaultUrl + "/partnerUpdate"}
          element={<PartnerUpdate />}
        />

        <Route path={defaultUrl + "/inspection"} element={<Inspection />} />
        <Route
          path={defaultUrl + "/inspectionCreate"}
          element={<InspectionCreate />}
        />
        <Route
          path={defaultUrl + "/inspectionUpdate"}
          element={<InspectionUpdate />}
        />
        <Route
          path={defaultUrl + "/inspectionDetail"}
          element={<InspectionDetail />}
        />

        <Route path={defaultUrl + "/safetyHealth"} element={<SafetyHealth />} />
        <Route
          path={defaultUrl + "/safetyHealthCreate"}
          element={<SafetyHealthCreate />}
        />
        <Route
          path={defaultUrl + "/safetyHealthDetail"}
          element={<SafetyHealthDetail />}
        />
        <Route
          path={defaultUrl + "/safetyHealthUpdate"}
          element={<SafetyHealthUpdate />}
        />

        <Route
          path={defaultUrl + "/rentalEquipment"}
          element={<RentalEquipment />}
        />
        <Route
          path={defaultUrl + "/qualification"}
          element={<Qualification />}
        />
        <Route
          path={defaultUrl + "/qualificationCreate"}
          element={<QualificationCreate />}
        />
        <Route
          path={defaultUrl + "/qualificationUpdate"}
          element={<QualificationUpdate />}
        />

        <Route path={defaultUrl + "/organization"} element={<Organization />} />
        <Route
          path={defaultUrl + "/regularEducation"}
          element={<RegularEducation />}
        />
        <Route
          path={defaultUrl + "/specialEducation"}
          element={<SpecialEducation />}
        />
        <Route
          path={defaultUrl + "/otherEducation"}
          element={<OtherEducation />}
        />
        <Route
          path={defaultUrl + "/regularEducationCreate"}
          element={<RegularEducationCreate />}
        />
        <Route
          path={defaultUrl + "/specialEducationCreate"}
          element={<SpecialEducationCreate />}
        />
        <Route
          path={defaultUrl + "/otherEducationCreate"}
          element={<OtherEducationCreate />}
        />
        <Route
          path={defaultUrl + "/regularEducationUpdate"}
          element={<RegularEducationUpdate />}
        />
        <Route
          path={defaultUrl + "/specialEducationUpdate"}
          element={<SpecialEducationUpdate />}
        />
        <Route
          path={defaultUrl + "/otherEducationUpdate"}
          element={<OtherEducationUpdate />}
        />
        <Route
          path={defaultUrl + "/shInformation"}
          element={<ShInformation />}
        />
        <Route
          path={defaultUrl + "/shInformationCreate"}
          element={<ShInformationCreate />}
        />
        <Route
          path={defaultUrl + "/shInformationUpdate"}
          element={<ShInformationUpdate />}
        />

        <Route path={defaultUrl + "/contractorSh"} element={<ContractorSh />} />
        <Route
          path={defaultUrl + "/emergencyPlan"}
          element={<EmergencyPlan />}
        />
        <Route
          path={defaultUrl + "/hazardManagement"}
          element={<HazardManagement />}
        />
        <Route path={defaultUrl + "/shLeadership"} element={<ShLeadership />} />
        <Route
          path={defaultUrl + "/shSystemImprove"}
          element={<ShSystemImprove />}
        />
        <Route
          path={defaultUrl + "/workerParticipation"}
          element={<WorkerParticipation />}
        />

        <Route
          path={defaultUrl + "/contractorShCreate"}
          element={<ContractorShCreate />}
        />
        <Route
          path={defaultUrl + "/emergencyPlanCreate"}
          element={<EmergencyPlanCreate />}
        />
        <Route
          path={defaultUrl + "/hazardManagementCreate"}
          element={<HazardManagementCreate />}
        />
        <Route
          path={defaultUrl + "/shLeadershipCreate"}
          element={<ShLeadershipCreate />}
        />
        <Route
          path={defaultUrl + "/shSystemImproveCreate"}
          element={<ShSystemImproveCreate />}
        />
        <Route
          path={defaultUrl + "/workerParticipationCreate"}
          element={<WorkerParticipationCreate />}
        />

        <Route
          path={defaultUrl + "/contractorShUpdate"}
          element={<ContractorShUpdate />}
        />
        <Route
          path={defaultUrl + "/emergencyPlanUpdate"}
          element={<EmergencyPlanUpdate />}
        />
        <Route
          path={defaultUrl + "/hazardManagementUpdate"}
          element={<HazardManagementUpdate />}
        />
        <Route
          path={defaultUrl + "/shLeadershipUpdate"}
          element={<ShLeadershipUpdate />}
        />
        <Route
          path={defaultUrl + "/shSystemImproveUpdate"}
          element={<ShSystemImproveUpdate />}
        />
        <Route
          path={defaultUrl + "/workerParticipationUpdate"}
          element={<WorkerParticipationUpdate />}
        />

        <Route path={defaultUrl + "/login"} element={<Login />} />
        {/* 기본 경로에 대한 Navigate 설정 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
