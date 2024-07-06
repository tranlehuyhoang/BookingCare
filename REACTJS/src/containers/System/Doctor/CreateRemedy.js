import { useRef, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./CreateRemedy.scss";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { CommonUtils } from "../../../utils";
import { filterDrugs } from "../../../services/drugService";
import {
  getBookingById,
  postCreateRemedy,
} from "../../../services/userService";
import { useParams, useNavigate } from "react-router-domv6";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function CreateRemedy() {
  const [email, setEmail] = useState("");
  const [listMedicine, setListMedicine] = useState("");
  const [desciption, setDesciption] = useState("");
  const [patientName, setPatientName] = useState("");
  const [queryDrug, setQueryDrug] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [listSeletedDrugs, setListSeletedDrugs] = useState([]);
  const [listFilterDrugs, setListFilterDrugs] = useState([]);
  const [units, setUnits] = useState([
    { key: "pill", valueVi: "Viên", valueEn: "Pill" },
    { key: "package", valueVi: "Gói", valueEn: "Package" },
    { key: "bottle", valueVi: "Chai", valueEn: "Bottle" },
    { key: "tube", valueVi: "Ống", valueEn: "Tube" },
    { key: "set", valueVi: "Bộ", valueEn: "Set" },
  ]);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [token, setToken] = useState("");
  const [timeType, setTimeType] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [reason, setReason] = useState("");

  let { bookingId } = useParams();

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const handleRebuildDrugsList = (drugs) => {
    return drugs.map((drug) => {
      drug.description_usage = "";
      drug.unit = "chooseUnits";
      drug.amount = 0;
      return drug;
    });
  };

  useEffect(async () => {
    let res = await filterDrugs({ name: "" });
    let rebuildDrugs = [];
    if (res) rebuildDrugs = handleRebuildDrugsList(res);
    setDrugs(rebuildDrugs);

    if (rebuildDrugs) setListFilterDrugs(rebuildDrugs);

    let patientInfo = await getBookingById(bookingId);
    if (
      patientInfo &&
      patientInfo.data &&
      patientInfo.data.patientName &&
      patientInfo.data.patientData.email
    ) {
      console.log("patientInfo", patientInfo);
      setEmail(patientInfo.data.patientData.email);
      setPatientName(patientInfo.data.patientName);
      setDoctorId(patientInfo.data.doctorId);
      setPatientId(patientInfo.data.patientId);
      setDate(patientInfo.data.date);
      setToken(patientInfo.data.token);
      setTimeType(patientInfo.data.timeType);
      let name =
        (userInfo.lastName ? userInfo.lastName : "") +
        " " +
        (userInfo.firstName ? userInfo.firstName : "");
      setDoctorName(name);
      setReason(patientInfo.data.patientReason);
    }
  }, []);

  const handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  const handleOnChangeListMedicine = (event) => {
    setListMedicine(event.target.value);
  };

  const handleOnChangeDescription = (event) => {
    setDesciption(event.target.value);
  };

  const handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      // this.setState({
      //   imgBase64: base64,
      // });
    }
  };

  const handleCreateRemedyImage = () => {
    createRemedyImage();
  };

  const createRemedyImage = async () => {
    console.log("reason", reason);
    setIsShowLoading(true);

    let res = await postCreateRemedy({
      email: email,
      listMedicine: listMedicine,
      desciption: desciption,
      doctorId: doctorId,
      patientId: patientId,
      timeType: timeType,
      date: date,
      token: token,
      language: language,
      patientName: patientName,
      doctorName: doctorName,
      listSeletedDrugs: listSeletedDrugs,
      patientReason: reason,
    });

    if (res && res.errCode === 0) {
      setIsShowLoading(false);
      if (language == "en") {
        toast.success("Create Remedy succeed!");
      } else {
        toast.success("Tạo đơn thuốc thành công!");
      }
    } else {
      setIsShowLoading(true);
      if (language == "en") {
        toast.error("Something wrongs...!");
      } else {
        toast.error("Lỗi!");
      }
    }
    setIsShowLoading(false);
  };

  const handlePushDrugToList = (drug) => {
    let temp = [...listSeletedDrugs];
    temp.push(drug);
    setListSeletedDrugs(temp);
    if (temp) console.log("temp", temp);
  };

  const removeDrugFromTheList = (drugId) => {
    let temp = [...listSeletedDrugs];
    temp = temp.filter((drug) => drug.id != drugId);
    setListSeletedDrugs(temp);
  };

  const handleOnchangeDescriptionUsageDrug = (event, drugId) => {
    let temp = [...listSeletedDrugs];
    temp.map((drug) => {
      if (drug.id == drugId) {
        drug.description_usage = event.target.value;
      }
      return drug;
    });

    setListSeletedDrugs(temp);
    console.log(listSeletedDrugs);
  };

  const handleOnchangeUnitDrug = (event, drugId) => {
    let temp = [...listSeletedDrugs];
    temp.map((drug) => {
      if (drug.id == drugId) {
        drug.unit = event.target.value;
      }
      return drug;
    });

    setListSeletedDrugs(temp);
    console.log(listSeletedDrugs);
  };

  const handleOnchangeAmountDrug = (event, drugId) => {
    let temp = [...listSeletedDrugs];
    temp.map((drug) => {
      if (drug.id == drugId) {
        drug.amount = event.target.value;
      }
      return drug;
    });

    setListSeletedDrugs(temp);
    console.log(listSeletedDrugs);
  };

  const handleFilterDrugs = async () => {
    let res = await filterDrugs({ name: queryDrug });
    let rebuildDrugs = [];
    if (res) rebuildDrugs = handleRebuildDrugsList(res);
    setDrugs(rebuildDrugs);

    if (rebuildDrugs) setListFilterDrugs(rebuildDrugs);
  };

  const handleResetDrugs = async () => {
    setQueryDrug("");
    let res = await filterDrugs({ name: "" });
    let rebuildDrugs = [];
    if (res) rebuildDrugs = handleRebuildDrugsList(res);
    setDrugs(rebuildDrugs);
    if (rebuildDrugs) setListFilterDrugs(rebuildDrugs);
  };

  return (
    <LoadingOverlay
      active={isShowLoading}
      spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mb-60">
              <FormattedMessage id={"admin.manage-drug.create-prescription"} />
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div className="col-4 form-group mb-3">
                <label>
                  <FormattedMessage id={"admin.manage-drug.email-patient"} />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  // onChange={(event) => handleOnChangeEmail(event)}
                />
              </div>
              <div className="col-4 form-group mb-3">
                <label>
                  <FormattedMessage id={"admin.manage-drug.name-patient"} />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={patientName}
                  // onChange={(event) => this.handleOnChangeEmail(event)}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id={"admin.manage-drug.prescription"} />
                </label>
                {/* <textarea
                      className="form-control"
                      aria-label="With textarea"
                      value={listMedicine}
                      onChange={(event) => handleOnChangeListMedicine(event)}
                    ></textarea> */}
              </div>
              <div className="col-12">
                <div className="row">
                  {listSeletedDrugs.map((drug) => {
                    console.log("drug", drug);
                    return (
                      <div className="col-12 form-group">
                        <div className="row align-item-center text-center">
                          <div className="col-4">
                            {" "}
                            <input
                              readonly
                              type="text"
                              value={drug.name}
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                          <div className="col-auto">
                            <select
                              className="form-control"
                              onChange={(event) =>
                                handleOnchangeUnitDrug(event, drug.id)
                              }
                              value={drug.unit}
                            >
                              <option value="chooseUnits">
                                {language == "en" ? "Units" : "Đơn vị"}
                              </option>
                              {language == "vi"
                                ? units.map((unit) => {
                                    return (
                                      <option value={unit.key}>
                                        {unit.valueVi}
                                      </option>
                                    );
                                  })
                                : units.map((unit) => {
                                    return (
                                      <option value={unit.key}>
                                        {unit.valueEn}
                                      </option>
                                    );
                                  })}
                            </select>
                          </div>
                          <div className="col-1">
                            {" "}
                            <input
                              onChange={(event) =>
                                handleOnchangeAmountDrug(event, drug.id)
                              }
                              type="text"
                              value={drug.amount}
                              className="form-control"
                            />
                          </div>
                          <div className="col-4">
                            {" "}
                            <input
                              onChange={(event) =>
                                handleOnchangeDescriptionUsageDrug(
                                  event,
                                  drug.id
                                )
                              }
                              type="text"
                              value={drug.desciption}
                              className="form-control"
                              placeholder={
                                language == "en"
                                  ? "Enter desription usage"
                                  : "Nhập hướng dẫn sử dụng"
                              }
                            />
                          </div>
                          <div className="col-1 d-flex align-items-center">
                            <i
                              onClick={() => removeDrugFromTheList(drug.id)}
                              className="fas fa-trash pointer text-red"
                            ></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id={"admin.manage-drug.drug-list"} />
                <input
                  className="form-control"
                  type="text"
                  value={queryDrug}
                  onChange={(event) => setQueryDrug(event.target.value)}
                />
                <div className="mb-3 mt-2">
                  <button
                    type="button"
                    className="btn btn-primary mr-5"
                    onClick={() => handleFilterDrugs()}
                  >
                    <FormattedMessage id="medical-history.apply" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleResetDrugs()}
                  >
                    <FormattedMessage id="medical-history.reset" />
                  </button>
                </div>
                <ul
                  className="list-group mt-10"
                  style={{ overflowY: "scroll", maxHeight: "400px" }}
                >
                  {listFilterDrugs.map((drug) => {
                    return (
                      <li
                        onClick={() => handlePushDrugToList(drug)}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pointer"
                      >
                        <span>{drug.name}</span>
                        <i className="text-primary fas fa-plus-circle"></i>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-8 form-group">
            <label>
              <FormattedMessage
                id={"admin.manage-drug.more-descriptive-information"}
              />
            </label>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={desciption}
              onChange={(event) => handleOnChangeDescription(event)}
            ></textarea>
          </div>
        </div>
        <button
          onClick={() => handleCreateRemedyImage()}
          type="button"
          className="btn btn-primary"
        >
          <FormattedMessage id={"admin.manage-drug.btn-create"} />
        </button>
      </div>
    </LoadingOverlay>
  );
  // }
}