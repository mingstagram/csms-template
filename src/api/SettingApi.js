import axios from "axios";

export const updateContents = (contents) => {
  return axios.post("/setting/api/question", { contents });
};

export const saveWorkType = (workType) => {
  return axios.post("/setting/api/work_type", {
    name: workType,
    displaySeq: 0,
  });
};

export const deleteWorkType = (id) => {
  return axios.put(`/setting/api/work_type/${id}`);
};

export const getWorkTypes = () => {
  return axios.get("/setting/api/work_types");
};

export const updateWorkType = (workType) => {
  return axios.put("/setting/api/work_type", {
    id: workType.id,
    name: workType.name,
    displaySeq: 0,
  });
};

export const getRentalEquipments = () => {
  return axios.get("/setting/api/rental_equipments");
};

export const saveRentalEquipment = (rentalEquipment) => {
  return axios.post("/setting/api/rental_equipment", { name: rentalEquipment });
};

export const deleteRentalEquipment = (id) => {
  return axios.put(`/setting/api/rental_equipment/${id}`);
};

export const updateRentalEquipment = (rentalEquipment) => {
  return axios.put("/setting/api/rental_equipment", {
    id: rentalEquipment.id,
    name: rentalEquipment.name,
  });
};

export const getDisasterTypes = () => {
  return axios.get("/setting/api/disaster_types");
};
