import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import menu1Icon from "../assets/images/menu1-icon.png";
import menu2Icon from "../assets/images/menu2-icon.png";
import menu3Icon from "../assets/images/menu3-icon.png";
import menu4Icon from "../assets/images/menu4-icon.png";
import menu1IconHover from "../assets/images/menu1-icon-hover.png";
import menu2IconHover from "../assets/images/menu2-icon-hover.png";
import menu3IconHover from "../assets/images/menu3-icon-hover.png";
import menu4IconHover from "../assets/images/menu4-icon-hover.png";

const LeftHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    console.log(path.startsWith("/inspection"));
    if (
      path.startsWith("/dataResult") ||
      path.startsWith("/improve") ||
      path.startsWith("/inspection") ||
      path.startsWith("/safetyHealth") ||
      path.startsWith("/rentalEquipment")
    ) {
      setActiveMenu(3);
      setActiveSubMenu(path);
    } else if (
      path.startsWith("/qualification") ||
      path.startsWith("/shManageBuild")
    ) {
      setActiveMenu(4);
      setActiveSubMenu(path);
    } else {
      switch (path) {
        case "/dashboard":
          setActiveMenu(1);
          break;
        case "/partner":
          setActiveMenu(2);
          break;
        default:
          setActiveMenu(null);
      }
      setActiveSubMenu(null);
    }
  }, [location.pathname]);

  const handleMenuClick = (menuIndex) => {
    if (menuIndex === 3 || menuIndex === 4) {
      // Only toggle menu without navigating
      setActiveMenu((prevActiveMenu) =>
        prevActiveMenu === menuIndex ? null : menuIndex
      );
    } else {
      // Navigate to the URL
      if (menuIndex === 1) {
        navigate("/dashboard");
      } else if (menuIndex === 2) {
        navigate("/partner");
      }
      setActiveMenu(menuIndex);
    }
  };

  const handleSubMenuClick = (path) => {
    console.log(path);
    navigate(path);
    setActiveSubMenu(path); // Update the active sub-menu
  };

  return (
    <div className="LeftHeader_Component">
      <Row>
        <Col>
          <div
            className={`menu-item ${activeMenu === 1 ? "expanded" : ""}`}
            onClick={() => handleMenuClick(1)}
          >
            <img
              src={activeMenu === 1 ? menu1IconHover : menu1Icon}
              alt="메인 아이콘"
              className="menu-icon"
            />
            <span>메인</span>
          </div>

          <div
            className={`menu-item ${activeMenu === 2 ? "expanded" : ""}`}
            onClick={() => handleMenuClick(2)}
          >
            <img
              src={activeMenu === 2 ? menu2IconHover : menu2Icon}
              alt="협력사 아이콘"
              className="menu-icon"
            />
            <span>협력사</span>
          </div>

          <div
            className={`menu-item ${activeMenu === 3 ? "expanded" : ""}`}
            onClick={() => handleMenuClick(3)}
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
                className={`submenu-item ${
                  activeSubMenu?.startsWith("/dataResult") ||
                  activeSubMenu?.startsWith("/improve")
                    ? "active"
                    : ""
                }`}
                onClick={() => handleSubMenuClick("/dataResult")}
              >
                협의체
              </div>
              <div
                className={`submenu-item ${
                  activeSubMenu?.startsWith("/inspection") ? "active" : ""
                }`}
                onClick={() => handleSubMenuClick("/inspection")}
              >
                작업장 순회점검
              </div>
              <div
                className={`submenu-item ${
                  activeSubMenu?.startsWith("/safetyHealth") ? "active" : ""
                }`}
                onClick={() => handleSubMenuClick("/safetyHealth")}
              >
                합동안전보건점검
              </div>
              <div
                className={`submenu-item ${
                  activeSubMenu?.startsWith("/rentalEquipment") ? "active" : ""
                }`}
                onClick={() => handleSubMenuClick("/rentalEquipment")}
              >
                임대설비 현황
              </div>
            </div>
          )}

          <div
            className={`menu-item ${activeMenu === 4 ? "expanded" : ""}`}
            onClick={() => handleMenuClick(4)}
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
              <div
                className={`submenu-item ${
                  activeSubMenu?.startsWith("/qualification") ? "active" : ""
                }`}
                onClick={() => handleSubMenuClick("/qualification")}
                style={{ fontSize: "10px" }}
              >
                적격 수급인 선정 평가
              </div>
              <div
                className={`submenu-item ${
                  activeSubMenu?.startsWith("/shManageBuild") ? "active" : ""
                }`}
                onClick={() => handleSubMenuClick("/shManageBuild")}
                style={{ fontSize: "10px" }}
              >
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
