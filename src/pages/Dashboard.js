import { styled } from "styled-components";
import CenterContents from "./dashboard/CenterContents";
import LeftContents from "./dashboard/LeftContents";
import RightContents from "./dashboard/RightContents";
import Scrollbars from "react-custom-scrollbars";
import { useEffect, useState } from "react";
import Header from "../layouts/Header";
import LeftHeader from "../layouts/LeftHeader";
import Main from "./dashboard/Main";

const Dashboard = ({ filter2, setFilter2 }) => {
  const sessionStorage = window.sessionStorage;
  const username = sessionStorage.getItem("username");
  const companyId = sessionStorage.getItem("companyId");
  const [filter, setFilter] = useState({
    keyword: "",
    limit: 10,
    pageNum: 1,
    state: "1",
    workType: null,
    companyId: username === "admin" ? 1 : parseInt(companyId),
    divisionId: 0,
    departmentId: 0,
    searchYear: new Date().getFullYear(),
    searchMonth: null,
  });

  // const [filter2, setFilter2] = useState({
  //   keyword: "",
  //   limit: 10,
  //   pageNum: 1,
  //   state: "1",
  //   workType: null,
  //   companyId: 1,
  //   divisionId: 0,
  //   departmentId: 0,
  //   searchYear: null, //new Date().getFullYear(),
  //   searchMonth: null,
  // });
  useEffect(() => {}, [filter2]);
  return (
    <div>
      <Header filter={filter2} setFilter={setFilter2} />
      <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <Left>
          <LeftHeader filter={filter2} setFilter={setFilter2} />
        </Left>
        <Frame>
          <Center>
            <Main />
          </Center>
        </Frame>
      </div>
    </div>
  );
};

export default Dashboard;

const Frame = styled.div`
  display: flex;
  max-width: 1860px;
  margin: 10px auto 0;
`;

const Center = styled.div`
  margin: 0 30px;
`;

const Right = styled.div`
  width: 100vh;
`;
const Left = styled.div`
  flex: 1;
`;
