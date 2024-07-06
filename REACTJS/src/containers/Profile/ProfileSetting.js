import { useRef, useState, useEffect } from "react";
import * as actions from "../../store/actions";
import "./scss/ProfileSetting.scss";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import LeftContent from "./resources/LeftContent";
import MyAccount from "./resources/MyAccount";
import MedicalHistory from "./resources/MedicalHistory";
import { Redirect, Route, Switch } from "react-router-dom";
// import { getHandleLoginGoogle } from "../../services/userService";

export default function ProfileSetting() {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleBackHome = () => {
    history.push("/home");
  };

  return (
    <div class="">
      <HomeHeader isShowBanner={false} />
      <div class="custom-sidebar" style={{ height: "100vh" }}>
        <LeftContent />
      </div>
      <div
        class="p-30"
        style={{
          marginLeft: "350px",
          height: "100vh",
          backgroundColor: "#f5f6fd",
        }}
      >
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-bg" style={{ paddingLeft: "unset" }}>
            <li
              style={{ color: "#295dfb" }}
              class="breadcrumb-item pointer"
              onClick={() => handleBackHome()}
            >
              <FormattedMessage id="profile-setting.breadcrumb-home" />
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <FormattedMessage id="profile-setting.breadcrumb-settings" />
            </li>
          </ol>
        </nav>

        <Switch>
          <Route path="/user/profile-setting" component={MyAccount} />
          <Route path="/user/medical-history" component={MedicalHistory} />
          <Route
            component={() => {
              return <Redirect to={"/user/profile-setting"} />;
            }}
          />
        </Switch>
      </div>
    </div>
  );
}
