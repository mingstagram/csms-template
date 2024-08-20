import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import menu1Icon from "../assets/images/menu1-icon.png";
import menu2Icon from "../assets/images/menu2-icon.png";
import menu3Icon from "../assets/images/menu3-icon.png";
import menu4Icon from "../assets/images/menu4-icon.png";
import menu1IconHover from "../assets/images/menu1-icon-hover.png";
import menu2IconHover from "../assets/images/menu2-icon-hover.png";
import menu3IconHover from "../assets/images/menu3-icon-hover.png";
import menu4IconHover from "../assets/images/menu4-icon-hover.png";
import { styled } from "styled-components";
import DonutCards from "../components/dashboard/DonutCards";
import axios from "axios";
import closeBtn from "../assets/images/close-fill@2x.png";
import { useLocation, useNavigate } from "react-router-dom";

const LeftHeader = ({ filter, setFilter }) => {
  const [menu1Hovered, setMenu1Hovered] = useState(false);
  const [menu2Hovered, setMenu2Hovered] = useState(false);
  const [menu3Hovered, setMenu3Hovered] = useState(false);
  const [menu4Hovered, setMenu4Hovered] = useState(false);

  const [menu1Expanded, setMenu1Expanded] = useState(false);
  const [menu2Expanded, setMenu2Expanded] = useState(false);
  const [menu3Expanded, setMenu3Expanded] = useState(false);
  const [menu4Expanded, setMenu4Expanded] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 활성화된 메뉴를 추적
  const getActiveMenuIndex = () => {
    switch (location.pathname) {
      case "/dashboard":
        return 1;
      case "/dashboard2":
        return 2;
      case "/dashboard3":
        return 3;
      case "/dashboard4":
        return 4;
      default:
        return null;
    }
  };

  const toggleMenu = (menuIndex) => {
    console.log(menuIndex);
    if (activeMenu === menuIndex) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuIndex);
    }
  };

  const handleMenuClick = (path, menuIndex) => {
    if (menuIndex === 1 || menuIndex === 2) {
      navigate(path);
    }
    toggleMenu(menuIndex);
  };

  // const toggleMenu = (menuIndex) => {
  //   setActiveMenu((prevActiveMenu) =>
  //     prevActiveMenu === menuIndex ? null : menuIndex
  //   );

  //   // switch (menuIndex) {
  //   //   case 1:
  //   //     navigate("/dashboard");
  //   //   case 2:
  //   //     navigate("/dashboard2");
  //   //   case 3:
  //   //     navigate("/dashboard3");
  //   //   case 4:
  //   //     navigate("/dashboard4");
  //   // }
  // };

  const [tooltipVisible, setTooltipVisible] = useState({});
  const hoverTimeouts = useRef({}); // 각 카드별 타이머를 관리하는 객체
  const [harmfulFilter, setHarmfulFilter] = useState({
    ...filter,
  });

  const handleMouseLeave = (companyId) => {
    // 마우스가 카드에서 떠날 때 타이머를 취소
    if (hoverTimeouts.current[companyId]) {
      clearTimeout(hoverTimeouts.current[companyId]);
    }
    setTooltipVisible((prevTooltipVisible) => ({
      ...prevTooltipVisible,
      [companyId]: false,
    }));
  };

  useEffect(() => {
    // 현재 URL 경로를 기반으로 활성화된 메뉴를 설정
    switch (location.pathname) {
      case "/dashboard":
        setActiveMenu(1);
        break;
      case "/dashboard2":
        setActiveMenu(2);
        break;
      case "/dashboard3":
        setActiveMenu(3);
        break;
      case "/dashboard4":
        setActiveMenu(4);
        break;
      default:
        setActiveMenu(null);
    }
  }, [location.pathname]);

  // const getLevelData = () => {
  //   axios
  //     .post("/admin/api/find_level_by_company", filter)
  //     .then((res) => {
  //       if (res.data.code === "0000") {
  //         SetLevelByCompany(res.data.result);
  //       }
  //     })
  //     .catch(() => {});
  // };

  const handleClose = (companyId) => {
    setTooltipVisible({ ...tooltipVisible, [companyId]: false });
  };

  return (
    <div className="LeftHeader_Component">
      <Row>
        <Col>
          <div
            className={`menu-item ${activeMenu === 1 ? "expanded" : ""}`}
            onMouseEnter={() =>
              setActiveMenu(activeMenu === 1 ? 1 : activeMenu)
            }
            onMouseLeave={() => setActiveMenu(activeMenu)}
            onClick={() => handleMenuClick("/dashboard", 1)}
          >
            <img
              src={activeMenu === 1 ? menu1IconHover : menu1Icon}
              alt="메인 아이콘"
              className="menu-icon"
            />
            <span>메인</span>
          </div>
          {/* {activeMenu === 1 && (
            <div className="submenu">
              <div className="submenu-item">메인1</div>
              <div className="submenu-item">메인2</div>
            </div>
          )} */}

          <div
            className={`menu-item ${activeMenu === 2 ? "expanded" : ""}`}
            onMouseEnter={() =>
              setActiveMenu(activeMenu === 2 ? 2 : activeMenu)
            }
            onMouseLeave={() => setActiveMenu(activeMenu)}
            onClick={() => handleMenuClick("/partner", 2)}
          >
            <img
              src={activeMenu === 2 ? menu2IconHover : menu2Icon}
              alt="협력사 아이콘"
              className="menu-icon"
            />
            <span>협력사</span>
          </div>
          {/* {activeMenu === 2 && (
            <div className="submenu">
              <div className="submenu-item">협력사1</div>
              <div className="submenu-item">협력사2</div>
            </div>
          )} */}

          <div
            className={`menu-item ${activeMenu === 3 ? "expanded" : ""}`}
            onMouseEnter={() =>
              setActiveMenu(activeMenu === 3 ? 3 : activeMenu)
            }
            onMouseLeave={() => setActiveMenu(activeMenu)}
            onClick={() => handleMenuClick("/dashboard3", 3)}
          >
            <img
              src={activeMenu === 3 ? menu3IconHover : menu3Icon}
              alt="산업안전보건법 아이콘"
              className="menu-icon"
            />
            <span>산업안전보건법</span>
          </div>
          {activeMenu === 3 && (
            <div className="submenu">
              <div
                className="submenu-item"
                onClick={() => {
                  navigate("/dataResult");
                }}
              >
                협의체
              </div>
              <div className="submenu-item">작업장 순회점검</div>
              <div className="submenu-item">합동안전보건점검</div>
              <div className="submenu-item">임대설비 현황</div>
            </div>
          )}

          <div
            className={`menu-item ${activeMenu === 4 ? "expanded" : ""}`}
            onMouseEnter={() =>
              setActiveMenu(activeMenu === 4 ? 4 : activeMenu)
            }
            onMouseLeave={() => setActiveMenu(activeMenu)}
            onClick={() => handleMenuClick("/dashboard4", 4)}
          >
            <img
              src={activeMenu === 4 ? menu4IconHover : menu4Icon}
              alt="중대재해처벌법 아이콘"
              className="menu-icon"
            />
            <span>중대재해처벌법</span>
          </div>
          {activeMenu === 4 && (
            <div className="submenu">
              <div className="submenu-item" style={{ fontSize: "10px" }}>
                적격 수급인 선정 평가
              </div>
              <div className="submenu-item" style={{ fontSize: "10px" }}>
                안전보건관리체계 구축
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LeftHeader;
