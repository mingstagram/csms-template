import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CompanyItem from "./CompanyItem";
import axios from "axios";
import { Button } from "reactstrap";

const CompanyList = ({ companyList, setCompanyList }) => {
  const [companies, setCompanies] = useState([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false); // 순서 변경 여부 상태 추가

  //   useEffect(() => {
  //     // Fetch companies from backend
  //     fetch("/admin/api/find_all_company")
  //       .then((response) => response.json())
  //       .then((data) => setCompanies(data));
  //   }, []);
  useEffect(() => {
    axios
      .get("/admin/api/find_all_company")
      .then((res) => {
        if (res.data.code === "0000") {
          setCompanies(res.data.result);
        }
      })
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  const moveCompany = (fromIndex, toIndex) => {
    const updatedCompanies = [...companies];
    const [movedCompany] = updatedCompanies.splice(fromIndex, 1);
    updatedCompanies.splice(toIndex, 0, movedCompany);
    setCompanies(updatedCompanies);
    setIsOrderChanged(true); // 순서 변경 시 상태 변경
  };

  const updateOrder = () => {
    axios
      .post("/admin/api/company_order", companies)
      .then((res) => {
        if (res.data.code === "0000" && res.data.result) {
          setCompanies(res.data.result);
          alert("변경 완료");
          window.location.reload();
        } else {
          alert("변경에 실패했습니다. 다시 시도해주세요.");
        }
        setIsOrderChanged(false); // 업데이트 후 상태 초기화
      })
      .catch((error) => {
        console.error("There was an error updating the order!", error);
      });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {companies.map((company, index) => (
        <CompanyItem
          key={company.id}
          index={index}
          company={company}
          moveCompany={moveCompany}
        />
      ))}
      {isOrderChanged && ( // 순서가 변경되었을 때만 설정 버튼 표시
        <Button
          color="secondary"
          style={{
            width: "110px",
            height: "30px",
            backgroundColor: "#edeef2",
            borderColor: "#edeef2",
            color: "black",
            fontSize: "12px",
            fontFamily: "LGSmart_H",
            marginLeft: "5px",
          }}
          onClick={updateOrder}
        >
          순서 변경
        </Button>
      )}
    </DndProvider>
  );
};

export default CompanyList;
