import React from "react";
import styled from "styled-components";
import Header from "../../layouts/Header";
import LeftHeader from "../../layouts/LeftHeader";
import ShInformationUpdateComponent from "../../components/shInformation/ShInformationUpdateComponent";

const ShInformationUpdate = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <Left>
          <LeftHeader />
        </Left>
        <Frame>
          <Center>
            <ShInformationUpdateComponent />
          </Center>
        </Frame>
      </div>
    </div>
  );
};

export default ShInformationUpdate;

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
