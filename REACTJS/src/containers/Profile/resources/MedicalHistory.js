import { useRef, useState, useEffect } from "react";
import "../scss/MedicalHistory.scss";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Modal } from "reactstrap";
import moment from "moment";
import { filterHistoriesPatient } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function MedicalHistory() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [histories, setHistories] = useState([]);
  const [previewImgURL, setPreviewImgURL] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [units, setUnits] = useState([
    { key: "pill", valueVi: "Viên", valueEn: "Pill" },
    { key: "package", valueVi: "Gói", valueEn: "Package" },
    { key: "bottle", valueVi: "Chai", valueEn: "Bottle" },
    { key: "tube", valueVi: "Ống", valueEn: "Tube" },
    { key: "set", valueVi: "Bộ", valueEn: "Set" },
  ]);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  useEffect(async () => {
    console.log("userInfo", userInfo);
    if (userInfo && userInfo.id) {
      setPatientId(userInfo.id);
    }
    await handleFilterHistoriesByDate(userInfo.id, startDate, endDate);
  }, []);

  const handleOnchangeDate = (event, type) => {
    if (type == "startDate") {
      setStartDate(event.target.value);
    } else {
      setEndDate(event.target.value);
    }
    if (startDate) console.log("startDate", startDate);
  };

  const handleResetDate = async () => {
    setStartDate("");
    setEndDate("");
    await handleFilterHistoriesByDate(userInfo.id, "", "");
  };

  const checkValidateInput = () => {
    if (!startDate) {
      if (language == "vi") {
        toast.error("Bạn chưa nhập ngày bắt đầu");
      } else {
        toast.error("You have not entered a start date");
      }
      return false;
    }

    if (!endDate) {
      if (language == "vi") {
        toast.error("Bạn chưa nhập ngày kết thúc");
      } else {
        toast.error("You have not entered an end date");
      }
      return false;
    }

    return true;
  };

  const handleFilterHistoryByDateApply = async () => {
    let bool = checkValidateInput();
    if (!bool) return;

    setIsShowLoading(true);

    let data = {
      patientId: patientId,
      startDate: startDate,
      endDate: endDate,
    };

    let res = await filterHistoriesPatient(data);
    if (res && res.errCode == 0) {
      setHistories(res.data);
      setIsShowLoading(false);
    } else {
      setIsShowLoading(false);
    }
  };

  const handleFilterHistoriesByDate = async (patientId, startDate, endDate) => {
    let data = {
      patientId: patientId,
      startDate: startDate,
      endDate: endDate,
    };
    let res = await filterHistoriesPatient(data);
    if (res && res.errCode == 0) {
      console.log("res.data", res.data);
      setHistories(res.data);
    }
  };

  const openPreviewImage = (item) => {
    setPreviewImgURL("");

    let imageBase64 = "";

    if (item.files) {
      imageBase64 = new Buffer.from(item.files, "base64").toString("binary");
      if (imageBase64) {
        setPreviewImgURL(imageBase64);

        if (previewImgURL) {
          setIsOpen(true);
        }
      }
    }
  };

  const handleDownloadImage = (item) => {
    let imageBase64 = "";

    if (item.files) {
      imageBase64 = new Buffer.from(item.files, "base64").toString("binary");
      if (imageBase64) {
        const a = document.createElement("a");
        a.download = "medical-examination-history.png";
        a.href = imageBase64;
        a.click();
      }
    }
  };

  const handleGetValueUnit = (unitKey) => {
    let finded = units.find((item) => item.key == unitKey);
    if (finded) {
      if (language == "vi") return finded.valueVi;
      else return finded.valueEn;
    }
  };

  return (
    <LoadingOverlay
      active={isShowLoading}
      spinner={<ClimbingBoxLoader color={"#45c3d2"} size={15} />}
    >
      <div>
        <div class="d-flex justify-content-center">
          <h2>
            <FormattedMessage id="medical-history.title" />
          </h2>
        </div>
        <div class="row">
          <div class="col-12 mb-20">
            <h3>
              <FormattedMessage id="medical-history.filters" />
            </h3>
          </div>
          <div class="col-12 mb-5">
            <span style={{ width: "100px", display: "inline-block" }}>
              <FormattedMessage id="medical-history.from-date" />
            </span>
            <input
              type="date"
              class="ml-5"
              value={startDate}
              onChange={(event) => handleOnchangeDate(event, "startDate")}
            />
          </div>
          <div class="col-12">
            <span style={{ width: "100px", display: "inline-block" }}>
              <FormattedMessage id="medical-history.to-date" />
            </span>
            <input
              type="date"
              class="ml-5"
              value={endDate}
              onChange={(event) => handleOnchangeDate(event, "endDate")}
            />
          </div>
          <div class="col-12 mt-10">
            <button
              onClick={() => handleFilterHistoryByDateApply()}
              type="button"
              class="btn btn-primary mr-5"
            >
              <FormattedMessage id="medical-history.apply" />
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleResetDate()}
            >
              <FormattedMessage id="medical-history.reset" />
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <table class="table table-hover mt-45">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <FormattedMessage id="medical-history.date-examination" />
                  </th>
                  <th scope="col" class="text-center">
                    <FormattedMessage id="medical-history.reason" />
                  </th>
                  <th scope="col" class="text-center">
                    <FormattedMessage id="medical-history.doctor" />
                  </th>
                  <th scope="col" class="text-center">
                    <FormattedMessage id="medical-history.prescription" />
                  </th>
                  <th scope="col" class="text-center">
                    <FormattedMessage id="medical-history.doctor-advice" />
                  </th>
                  <th scope="col" class="text-center">
                    <FormattedMessage id="medical-history.receipt" />
                  </th>
                  <th scope="col" class="text-center">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {histories.map((item, index) => {
                  let drugs = JSON.parse(item.drugs);
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                      <td class="text-center">{item.reason}</td>
                      <td class="text-center">
                        <div
                          class="pointer text-primary"
                          onClick={() =>
                            history.push(`/detail-doctor/${item.doctorId}`)
                          }
                        >
                          {item.doctorDataHistory.lastName}{" "}
                          {item.doctorDataHistory.firstName}
                        </div>
                        <div
                          class="pointer text-primary"
                          onClick={() =>
                            history.push(
                              `/detail-specialty/${item.doctorDataHistory.Doctor_Infor.specialtyId}`
                            )
                          }
                        >
                          {
                            item.doctorDataHistory.Doctor_Infor.specialtyData
                              .name
                          }
                        </div>
                        <div
                          class="pointer text-primary"
                          onClick={() =>
                            history.push(
                              `/detail-clinic/${item.doctorDataHistory.Doctor_Infor.clinicId}`
                            )
                          }
                        >
                          {item.doctorDataHistory.Doctor_Infor.clinicData.name}
                        </div>
                      </td>
                      <td>
                        <ul
                          class="list-group"
                          style={{ overflowY: "scroll", maxHeight: "150px" }}
                        >
                          {drugs.map((item) => {
                            return (
                              <li class="list-group-item list-group-item-action">
                                {item.name} | {item.amount}{" "}
                                {handleGetValueUnit(item.unit)} |{" "}
                                {item.description_usage}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td class="text-center">{item.description}</td>
                      <td class="text-center">
                        <div
                          className="text-center pointer text-primary"
                          onClick={() => openPreviewImage(item)}
                        >
                          <FormattedMessage id={"manage-patient.view"} />
                        </div>
                      </td>
                      <td
                        onClick={() => handleDownloadImage(item)}
                        class="text-center pointer text-center text-success"
                      >
                        <FormattedMessage id={"manage-patient.download"} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen === true && (
          <Lightbox
            mainSrc={previewImgURL}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </div>
    </LoadingOverlay>
  );
}
