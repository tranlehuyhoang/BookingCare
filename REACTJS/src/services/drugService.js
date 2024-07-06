import axios from "../axios";

const filterDrugs = (data) => {
  return axios.post("/api/filter-drugs", data);
};

const createDrug = (data) => {
  return axios.post("/api/create-new-drug", data);
};

const deleteDrugById = (drugId) => {
  return axios.delete("/api/delete-drug", {
    data: {
      id: drugId,
    },
  });
};

const getDrugInfoById = (inputId) => {
  return axios.get(`/api/get-drug-by-id?drugId=${inputId}`);
};

const editDrug = (inputData) => {
  return axios.put("/api/edit-drug", inputData);
};

export { filterDrugs, deleteDrugById, createDrug, getDrugInfoById, editDrug };
