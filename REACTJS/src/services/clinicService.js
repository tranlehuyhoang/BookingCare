import axios from "../axios";

const filterClinics = (data) => {
  return axios.post("/api/filter-clinics", data);
};

const updateClinicData = (data) => {
  return axios.post("/api/edit-clinic", data);
};

const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const deleteClinic = (data) => {
  return axios.get(`/api/delete-clinic?id=${data.id}`);
};

export { filterClinics, updateClinicData, getDetailClinicById, deleteClinic };
