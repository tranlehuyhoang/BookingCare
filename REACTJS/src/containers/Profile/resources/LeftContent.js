import { useRef, useState, useEffect } from "react";
import "../scss/LeftContent.scss";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { getHandleLoginGoogle } from "../../services/userService";

export default function LeftContent() {
  const [currentRoute, setCurrentRoute] = useState("");
  const [previewImgURL, setPreviewImgURL] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  let history = useHistory();
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  useEffect(() => {
    getUserInfor();
  }, []);

  useEffect(() => {
    getUserInfor();
  }, [userInfo]);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

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
      setPreviewImgURL(imageBase64 ? imageBase64 : null);
    }
  };

  return (
    <div>
      <h1 class="fs-24 font-weight-bold">
        <FormattedMessage id="profile-setting.breadcrumb-settings" />
      </h1>
      <div class="my-20">
        <div
          class="font-weight-semi-bold text-uppercase text-secondary mb-16"
          style={{ fontSize: "13px" }}
        >
          <FormattedMessage id="profile-setting.profile" />
        </div>
        <div
          class={`${
            currentRoute == "/user/profile-setting" ? "active" : ""
          } pointer row justify-content-between align-items-center tabs p-16`}
          onClick={() => history.push("/user/profile-setting")}
        >
          <div
            class="col-auto avatar-profile"
            style={{ backgroundImage: `url(${previewImgURL})` }}
          ></div>
          <div class="col-auto">
            <h2>
              {firstName} {lastName}
            </h2>
            {/* <div>{email}</div> */}
          </div>
          <div class="col-auto">
            <i class="fas fa-edit"></i>
          </div>
        </div>
        <div
          class={`${
            currentRoute == "/user/medical-history" ? "active" : ""
          } pointer row align-items-center tabs p-16`}
          onClick={() => history.push("/user/medical-history")}
        >
          <div class="col-auto">
            <i class="fas fa-edit"></i>
          </div>
          <div class="col-auto">
            <FormattedMessage id="profile-setting.medical-history" />
          </div>
        </div>
      </div>
    </div>
  );
}
