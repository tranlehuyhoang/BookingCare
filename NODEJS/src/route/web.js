import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import adminController from "../controllers/adminController";
import drugController from "../controllers/drugController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.post("/api/edit-password-user", userController.handleEditPassword);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.post("/api/user-forgot-password", userController.postForgotPassword);
  router.post(
    "/api/verify-retrieve-password",
    userController.postVerifyRetrievePassword
  );
  router.get("/api/allcode", userController.getAllCode);

  //google signin
  router.post("/api/login-google", userController.handleLoginGoogle);
  router.post("/api/filter-users", userController.filterUsers);
  router.post("/api/filter-restore-users", userController.filterRestoreUsers);
  router.post("/api/handle-restore-user", userController.handleRestoreUser);
  router.post("/api/delete-restore-user", userController.deleteRestoreUser);

  router.post("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.get("/api/get-booking-by-id", doctorController.getBookingById);
  router.post("/api/send-remedy", doctorController.sendRemedy);
  router.post("/api/create-remedy", doctorController.createRemedy);
  router.post("/api/cancel-booking", doctorController.cancelBooking);
  router.post("/api/filter-doctors", doctorController.filterDoctors);

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );
  router.post("/api/filter-history", patientController.filterHistory);

  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.post("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.post("/api/filter-specialties", specialtyController.filterSpecialties);
  router.get("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.post("/api/edit-specialty", specialtyController.updateSpecialtyData);

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.post("/api/get-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.post("/api/filter-clinics", clinicController.filterClinics);
  router.post("/api/edit-clinic", clinicController.updateClinicData);
  router.get("/api/delete-clinic", clinicController.deleteClinic);

  //admin
  router.get("/api/get-weekly-revenue", adminController.getWeeklyRevenue);
  router.get("/api/get-total-new-user-day", adminController.getTotalNewUserDay);
  router.get(
    "/api/get-total-health-appointment-done",
    adminController.getTotalHealthAppointmentDone
  );
  router.get("/api/get-total-doctor", adminController.getTotalDoctor);
  router.get(
    "/api/get-top-three-doctors-of-the-year",
    adminController.getTopThreeDoctorsOfTheYear
  );
  router.get(
    "/api/get-top-four-vip-patient",
    adminController.getTopFourVipPatient
  );
  router.get(
    "/api/get-monthly-revenue-specialty",
    adminController.getMonthlyRevenueSpecialty
  );

  //admin drug
  router.post("/api/filter-drugs", drugController.filter);
  router.post("/api/create-new-drug", drugController.handleCreateNewDrug);
  router.put("/api/edit-drug", drugController.handleEditDrug);
  router.delete("/api/delete-drug", drugController.handleDeleteDrug);
  router.get("/api/get-drug-by-id", drugController.getDrugInfoById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
