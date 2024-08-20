import React from "react";
import Header from "../../layouts/Header";
import styled from "styled-components";
import LeftHeader from "../../layouts/LeftHeader";
import RegistComponent from "../../components/regist/RegistComponent";

const Regist = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <Left>
          <LeftHeader />
        </Left>
        <Frame>
          <Center>
            <RegistComponent />
          </Center>
        </Frame>
      </div>
    </div>
  );
};

export default Regist;

const Frame = styled.div`
  display: flex;
  max-width: 1810px;
  margin: 5px 20px 0 0;
`;

const Center = styled.div`
  margin: 0 0px;
`;

const Right = styled.div`
  width: 100vh;
`;
const Left = styled.div`
  flex: 1;
`;
