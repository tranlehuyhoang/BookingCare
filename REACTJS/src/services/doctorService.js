import axios from "../axios";

const filterDoctors = (data) => {
  return axios.post("/api/filter-doctors", data);
};

export { filterDoctors };
