import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import { Container } from "reactstrap";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Excel from "./pages/Excel";
import Login from "./pages/Login";
import { useAtom } from "jotai";
import { shouldRenderHeaderState } from "../src/data/atom.js";
import Signup from "./pages/Signup";
import MatrixList from "./pages/matrixList/MatrixList";
import MatrixDetail from "./pages/matrixList/MatrixDetail";
import { useState } from "react";
import MatrixUpdate from "./pages/matrixList/MatrixUpdate";
import MatrixCreate from "./pages/matrixList/MatrixCreate";
import Setting from "./pages/setting/Setting.js";
import Privacy from "./pages/Privacy";
import Dataroom from "./pages/dataroom/Dataroom.js";
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
        <Route path={defaultUrl + "/inspection"} element={<Inspection />} />

        <Route path={defaultUrl + "/about"} element={<About />} />
        <Route path={defaultUrl + "/excel"} element={<Excel />} />
        <Route path={defaultUrl + "/signup"} element={<Signup />} />
        <Route path={defaultUrl + "/"} element={<Login />} />
        <Route path={defaultUrl + "/matrixList"} element={<MatrixList />} />
        <Route path={defaultUrl + "/privacy"} element={<Privacy />} />
        <Route
          path={defaultUrl + "/matrixList/detail"}
          element={<MatrixDetail />}
        />
        <Route
          path={defaultUrl + "/matrixList/update"}
          element={<MatrixUpdate />}
        />
        <Route
          path={defaultUrl + "/matrixList/create"}
          element={<MatrixCreate />}
        />
        <Route path={defaultUrl + "/dataroom"} element={<Dataroom />} />
        {/* 기본 경로에 대한 Navigate 설정 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
