import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (data) => {
  return axios.post(`/api/top-doctor-home`, data);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = (data) => {
  return axios.post("/api/get-specialty", data);
};

const getAllSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = (data) => {
  return axios.post(`/api/get-clinic`, data);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const getBookingById = (bookingId) => {
  return axios.get(`/api/get-booking-by-id?bookingId=${bookingId}`);
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

const postCreateRemedy = (data) => {
  return axios.post("/api/create-remedy", data);
};

const cancelBooking = (data) => {
  return axios.post("/api/cancel-booking", data);
};

const postUserForgotPassword = (data) => {
  return axios.post("/api/user-forgot-password", data);
};

const postVerifyRetrievePassword = (data) => {
  return axios.post("/api/verify-retrieve-password", data);
};

//admin
const getWeeklyRevenue = () => {
  return axios.get(`/api/get-weekly-revenue`);
};

const getTotalNewUserDay = () => {
  return axios.get(`/api/get-total-new-user-day`);
};

const getTotalHealthAppointmentDone = () => {
  return axios.get(`/api/get-total-health-appointment-done`);
};

const getTotalDoctors = () => {
  return axios.get(`/api/get-total-doctor`);
};

const getTopThreeDoctorOfTheYear = () => {
  return axios.get(`/api/get-top-three-doctors-of-the-year`);
};

const getTopFourVipPatient = () => {
  return axios.get(`/api/get-top-four-vip-patient`);
};

const getMonthlyRevenueSpecialty = () => {
  return axios.get(`/api/get-monthly-revenue-specialty`);
};

const getHandleLoginGoogle = (data) => {
  return axios.post(`/api/login-google`, data);
};

const filterHistoriesPatient = (data) => {
  return axios.post(`/api/filter-history`, data);
};

const filterUsers = (data) => {
  return axios.post(`/api/filter-users`, data);
};

const editPassword = (data) => {
  return axios.post(`/api/edit-password-user`, data);
};

const filterRestoreUsers = (data) => {
  return axios.post(`/api/filter-restore-users`, data);
};

const handleRestoreUser = (data) => {
  return axios.post(`/api/handle-restore-user`, data);
};

const deleteRestoreUser = (data) => {
  return axios.post(`/api/delete-restore-user`, data);
};

export {
  getMonthlyRevenueSpecialty,
  getTopFourVipPatient,
  getTotalDoctors,
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  postUserForgotPassword,
  postVerifyRetrievePassword,
  cancelBooking,
  postCreateRemedy,
  getWeeklyRevenue,
  getTotalNewUserDay,
  getTotalHealthAppointmentDone,
  getTopThreeDoctorOfTheYear,
  getHandleLoginGoogle,
  getBookingById,
  filterHistoriesPatient,
  filterUsers,
  editPassword,
  filterRestoreUsers,
  handleRestoreUser,
  deleteRestoreUser,
};
