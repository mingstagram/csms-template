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
import SafetyHealthMng from "./pages/safetyHealthMng/SafetyHealthMng.js";
import SafetyHealthMngCreate from "./pages/safetyHealthMng/SafetyHealthMngCreate.js";
import InspectionUpdate from "./pages/inspection/InspectionUpdate.js";
import InspectionDetail from "./pages/inspection/InspectionDetail.js";
import SafetyHealthDetail from "./pages/safetyHealth/SafetyHealthDetail.js";
import SafetyHealthUpdate from "./pages/safetyHealth/SafetyHealthUpdate.js";
import PartnerUpdate from "./pages/partner/PartnerUpdate.js";
import PartnerDetail from "./pages/partner/PartnerDetail.js";

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
          path={defaultUrl + "/dashboard"}
          element={<Dashboard filter2={filter} setFilter2={setFilter} />}
        />
        <Route path={defaultUrl + "/regist"} element={<Regist />} />
        <Route path={defaultUrl + "/setting"} element={<Setting />} />
        <Route path={defaultUrl + "/pwchange"} element={<PasswordChange />} />
        <Route path={defaultUrl + "/notice"} element={<Notice />} />
        <Route path={defaultUrl + "/announce"} element={<Announce />} />
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
          path={defaultUrl + "/shManageBuild"}
          element={<SafetyHealthMng />}
        />
        <Route
          path={defaultUrl + "/shManageBuildCreate"}
          element={<SafetyHealthMngCreate />}
        />

        <Route path={defaultUrl + "/"} element={<Login />} />
        {/* 기본 경로에 대한 Navigate 설정 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
