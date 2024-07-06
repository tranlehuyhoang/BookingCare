import { useRef, useState, useEffect } from "react";
import "../scss/MyAccount.scss";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import EditPasswordModal from "./EditPasswordModal";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Modal } from "reactstrap";
// import { getHandleLoginGoogle } from "../../services/userService";

export default function MyAccount() {
  const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
  const [isOpenModalEditPassword, setIsOpenModalEditPassword] = useState(false);
  const [previewImgURL, setPreviewImgURL] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    genderRedux: state.admin.genders,
  }));

  useEffect(() => {
    dispatch(actions.fetchGenderStart());
    getUserInfor();
  }, []);

  useEffect(() => {
    getUserInfor();
  }, [userInfo]);

  const closeBookingClose = () => {
    setIsOpenModalBooking(false);
  };

  const closeEditPasswordClose = () => {
    setIsOpenModalEditPassword(false);
  };

  const getUserInfor = () => {
    if (!userInfo) return;

    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer.from(userInfo.image, "base64").toString(
        "binary"
      );
    }

    if (userInfo) {
      setEmail(userInfo.email);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setPhonenumber(userInfo.phoneNumber);
      setAddress(userInfo.address);
      setGender(userInfo.gender);
      setPreviewImgURL(imageBase64 ? imageBase64 : null);
    }
  };

  const showGender = () => {
    if (gender && language === LANGUAGES.VI && gender == "M") return "Nam";
    if (gender && language === LANGUAGES.VI && gender == "F") return "Nữ";
    if (gender && language === LANGUAGES.EN && gender == "M") return "Male";
    if (gender && language === LANGUAGES.EN && gender == "F") return "Female";
    return "";
  };

  return (
    <div>
      <h2 class="font-weight-bold fs-24">
        <FormattedMessage id="profile-setting.my-account" />
      </h2>
      <div class="rsolution-card-shadow" style={{ width: "650px" }}>
        <div class="rsolution-card-body">
          <div class="row">
            <div class="col-auto pt-20">
              <div
                class="avatar-box"
                style={{
                  width: "185px",
                  height: "185px",
                  backgroundImage: `url(${previewImgURL})`,
                }}
              ></div>
              <div class="text-center fs-25 font-weight-bold text-secondary text-truncate mt-10">
                {firstName} {lastName}
              </div>
            </div>
            <div class="col">
              <div class="row my-20">
                <div class="col-auto" style={{ width: "130px" }}>
                  <h6 class="font-weight-bold mb-0">
                    <FormattedMessage id="profile-setting.name" />:
                  </h6>
                </div>
                <div class="col">
                  <h6 class="mb-0 truncate">
                    {firstName} {lastName}
                  </h6>
                </div>
              </div>

              <div class="row my-20">
                <div class="col-auto" style={{ width: "130px" }}>
                  <h6 class="font-weight-bold mb-0">
                    <FormattedMessage id="profile-setting.gender" />:
                  </h6>
                </div>
                <div class="col">
                  <h6 class="mb-0 truncate">{showGender()}</h6>
                </div>
              </div>

              <div class="row my-20">
                <div class="col-auto" style={{ width: "130px" }}>
                  <h6 class="font-weight-bold mb-0">
                    <FormattedMessage id="profile-setting.phone" />:
                  </h6>
                </div>
                <div class="col">
                  <h6 class="mb-0 truncate">{phoneNumber}</h6>
                </div>
              </div>

              <div class="row my-20">
                <div class="col-auto" style={{ width: "130px" }}>
                  <h6 class="font-weight-bold mb-0">
                    <FormattedMessage id="profile-setting.address" />:
                  </h6>
                </div>
                <div class="col">
                  <h6 class="mb-0 truncate">{address}</h6>
                </div>
              </div>

              <div class="row my-20">
                <div class="col-auto" style={{ width: "130px" }}>
                  <h6 class="font-weight-bold mb-0">Email:</h6>
                </div>
                <div class="col">
                  <h6 class="mb-0 truncate">{email}</h6>
                </div>
              </div>

              <div class="row my-20">
                <div class="col-auto" style={{ width: "130px" }}>
                  <h6 class="font-weight-bold mb-0">
                    <FormattedMessage id="profile-setting.password" />:
                  </h6>
                </div>
                <div class="col">
                  <h6 class="mb-0 truncate">*********</h6>
                </div>
                <div class="col-auto">
                  <i
                    class="fas fa-pencil-alt pointer"
                    onClick={() => setIsOpenModalEditPassword(true)}
                  ></i>
                </div>
              </div>

              <button
                class="btn btn-outline-primary btn-block"
                onClick={() => setIsOpenModalBooking(true)}
              >
                <i class="fas fa-edit mr-8"></i>
                <FormattedMessage id="profile-setting.btn-edit-profile" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditPasswordModal
        isOpenModal={isOpenModalEditPassword}
        closeEditPasswordClose={closeEditPasswordClose}
      />
      <EditProfileModal
        isOpenModal={isOpenModalBooking}
        closeBookingClose={closeBookingClose}
      />
    </div>
  );
}
