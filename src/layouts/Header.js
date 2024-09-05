import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/amplelogowhite.svg";
import user1 from "../assets/images/IC_User_Normal.png";
import setting from "../assets/images/IC_Setting_Normal.png";
import write_icon from "../assets/images/writeIcon.png";
import dataroom from "../assets/images/dataroom.png";
// import dataroom from "../assets/images/dataroom.png";
import lg_logo from "../assets/images/LG_logo_Gnb.png";
import adminIcon from "../assets/images/admin-icon.png";
import { styled } from "styled-components";
import axios from "axios";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [company, setCompany] = useState([]);
  const localStorage = window.localStorage;
  const sessionStorage = window.sessionStorage;
  const username = sessionStorage.getItem("username");
  const department = sessionStorage.getItem("department");
  const departmentId = sessionStorage.getItem("departmentId");
  const divisionId = sessionStorage.getItem("divisionId");
  const companyId = sessionStorage.getItem("companyId");
  const authority = sessionStorage.getItem("authority");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathname = url.pathname;
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const HandleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const HandlePasswordChangePage = () => {
    navigate("/pwchange");
  };

  const calculateWidth = (index) => {
    // 요소의 기본 너비
    let width = 160;
    // 요소의 개수에 따라 너비를 동적으로 계산
    if (company.length > 5) {
      width -= (company.length - 5) * 10;
    }
    return width;
  };

  useEffect(() => {
    // localStorage와 sessionStorage에서 토큰을 가져옴
    // const accessToken =
    //   localStorage.getItem("accessToken") ||
    //   sessionStorage.getItem("accessToken");
    // const refreshToken =
    //   localStorage.getItem("refreshToken") ||
    //   sessionStorage.getItem("refreshToken");
    // if (!accessToken && !refreshToken) {
    //   navigate("/login");
    // }
  }, []);

  return (
    <Navbar
      color="white"
      dark
      expand="md"
      style={{
        paddingBottom: "2px",
        paddingTop: "2px",
        border: "1px solid #d9d9d9",
      }}
    >
      <style>
        {`
        /* 크롬 브라우저에서 스크롤바 스타일을 지정합니다. */
        ::-webkit-scrollbar {
          width: 5px; /* 스크롤바의 너비를 조절합니다. */
        }

        ::-webkit-scrollbar-thumb {
          background-color: #bababa; /* 스크롤바의 색상 */
          border-radius: 3px; /* 스크롤바의 둥근 경계를 조절합니다. */
        }

        ::-webkit-scrollbar-track {
          background-color: #f8f9fa; /* 스크롤바 트랙의 색상 */
          border-radius: 3px; /* 스크롤바 트랙의 둥근 경계를 조절합니다. */
        }
      `}
      </style>
      <Container fluid>
        <Row
          className="align-items-center justify-content-between"
          style={{ height: "55px" }}
        >
          {/* Left Section */}
          <Col
            xs="auto"
            style={{ marginLeft: "10px" }}
            // style={{ fontSize: "19.5px", fontFamily: "LGSmart_H" }}
          >
            {/* <StyledLink
            onClick={() => {
              window.location.reload();
            }}
          >
            <div>LG디지털파크 위험성평가 Dashboard</div>
          </StyledLink> */}
            <span
              className="LG-Dash-Board1"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  marginRight: "35px",
                  marginLeft: "-20px",
                }}
              >
                <img src={lg_logo}></img>
              </span>
              <span style={{ fontSize: "21px" }}>LG전자(평택) CSMS</span>
            </span>
          </Col>

          {/* Center Section */}
          <Col
            xs="auto"
            className="d-flex"
            style={{
              marginLeft: "0px",
            }}
          ></Col>

          {/* Right Section */}
          <Col
            xs="auto"
            className="d-flex align-items-center"
            style={{ marginRight: "30px" }}
          >
            <StyledSpan
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/regist");
              }}
            >
              <StyledImage
                src={write_icon}
                alt="profile"
                style={{
                  marginBottom: "5px",
                  marginTop: "3px",
                }}
                title="등록"
              ></StyledImage>
              <span>등록</span>
            </StyledSpan>
            <StyledSpan
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/setting");
              }}
            >
              <StyledImage
                src={setting}
                alt="setting"
                style={{
                  marginBottom: "5px",
                  marginTop: "3px",
                }}
                title="설정"
              ></StyledImage>
              <span>설정</span>
            </StyledSpan>
            <StyledSpan style={{ cursor: "pointer" }}>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle tag="span">
                  <StyledImage
                    src={user1}
                    alt="profile"
                    title="개인정보"
                    style={{
                      marginBottom: "5px",
                      marginTop: "3px",
                    }}
                  />
                  <span>사용자</span>
                </DropdownToggle>
                <DropdownMenu
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    marginTop: "10px",
                  }}
                >
                  <DropdownItem onClick={HandlePasswordChangePage}>
                    <span className="Header_Label1">비밀번호 변경</span>
                  </DropdownItem>
                  <DropdownItem onClick={HandleLogout}>
                    <span className="Header_Label1">로그아웃</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </StyledSpan>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 5px 0px 0px;
  object-fit: contain;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StyledText = styled.p`
  text-align: center; /* 텍스트를 중앙에 정렬 */
  margin: 0;
  font-size: 10px;
  color: #333;
  font-family: "LGSmart_H";
`;

const StyledLinkWithImage = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000; /* 원하는 텍스트 색상으로 변경하세요 */
`;

const Image = styled.img`
  margin-right: 8px; /* 이미지와 텍스트 사이의 간격을 조절하세요 */
`;

const StyledLink = styled(Link)`
  color: black; /* 원하는 글자색으로 설정 */
  /* 다른 스타일 속성을 필요에 따라 추가할 수 있습니다 */
  text-decoration: none; /* 링크에 기본적으로 적용되는 밑줄 제거 */
  font-weight: bold; /* 글자를 두껍게 만들 수 있습니다 */
`;

const StyledDiv = styled.div`
  width: 2px;
  height: 14px;
  margin: 22px 24px 23px 22px;
  opacity: 0.3;
  background-color: #8f8f8f;
`;

const StyledSpan = styled.span`
  width: 100px;
  height: 15px;
  margin: 10px 12px 22px 0px;
  font-family: LGSmart_H;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #444;
`;

const StyledNavItem = styled(NavItem)`
  padding-left: 15px;
`;
