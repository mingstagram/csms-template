import React from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../../components/dashboard/SalesChart";
import Feeds from "../../components/dashboard/Feeds";
import ProjectTables from "../../components/dashboard/ProjectTable";
import TopCards from "../../components/dashboard/TopCards";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { styled } from "styled-components";
import DonutCards from "../../components/dashboard/DonutCards";
import ColumnCards from "../../components/dashboard/ColumnCards";
import AreaCards from "../../components/dashboard/AreaCards";

const RightContents = ({ filter, setFilter }) => {
  return (
    <div>
      <Row>
        <Col>
          <ColumnCards filter={filter} setFilter={setFilter} />
          {/* <ColumnCards /> */}
          <AreaCards filter={filter} setFilter={setFilter} />
        </Col>
      </Row>
    </div>
  );
};

export default RightContents;
