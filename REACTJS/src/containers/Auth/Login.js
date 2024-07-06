import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { LANGUAGES, USER_ROLE } from "../../utils";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHandleLoginGoogle } from "../../services/userService";
import { useGoogleAuth } from "../../containers/Auth/resources/googleAuth.js";
import { PinDropSharp } from "@material-ui/icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { signIn } = useGoogleAuth();
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const dispatch = useDispatch();
  let history = useHistory();

  const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      setTimeout(refreshToken, refreshTiming);
    };
  };

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async () => {
    setErrMessage("");
    try {
      let data = await handleLoginApi(username, password);
      if (data && data.errCode !== 0) {
        if (language == "vi") {
          setErrMessage("Thông tin đăng nhập không chính xác");
        } else {
          setErrMessage("Login information is incorrect");
        }
      }
      if (data && data.errCode === 0) {
        history.push("/home");
        dispatch(actions.userLoginSuccess(data.user));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleSignInGoogle = async () => {
    setErrMessage("");
    try {
      const googleUser = await signIn(); // if you need immediate access to `googleUser`, get it from signIn() directly
      if (googleUser) refreshTokenSetup(googleUser);
      if (googleUser) {
        let data = await getHandleLoginGoogle(googleUser);

        if (data && data.errCode === 0) {
          history.goBack();
          dispatch(actions.userLoginSuccess(data.user));
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-center login-text">
            <FormattedMessage id={"login.login"} />
          </div>
          <div className="col-12 form-group login-form">
            <label>
              <FormattedMessage id={"login.username"} />
            </label>
            <input
              type="text"
              className="form-control login-input"
              placeholder={
                language === "en" ? "Enter your username" : "Nhập tên đăng nhập"
              }
              value={username}
              onChange={(event) => handleOnChangeUsername(event)}
              onKeyDown={(event) => handleKeyDown(event)}
            ></input>
          </div>
          <div className="col-12 form-group login-form">
            <label>
              <FormattedMessage id={"login.password"} />
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control login-input"
              placeholder={
                language === "en" ? "Enter your password" : "Nhập mật khẩu"
              }
              onChange={(event) => handleOnChangePassword(event)}
              onKeyDown={(event) => handleKeyDown(event)}
            ></input>
            <i
              className={
                isShowPassword
                  ? "far fa-eye password-icon"
                  : "far fa-eye-slash password-icon"
              }
              onClick={(event) => handleShowHidePassword(event)}
            ></i>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {errMessage}
          </div>
          <div className="col-12">
            <span
              className="forgot-password"
              onClick={() => {
                history.push("/forgot-password");
              }}
            >
              <FormattedMessage id={"login.forgot-password"} />
            </span>
          </div>
          <div className="col-12">
            <button
              className="btn-login"
              onClick={() => {
                handleLogin();
              }}
              onKeyDown={(event) => handleKeyDown(event)}
            >
              <FormattedMessage id={"login.login"} />
            </button>
          </div>
          <div className="col-12 social-login">
            <i
              onClick={handleSignInGoogle}
              className="fab fa-google-plus-g google-icon"
            ></i>
            {/* <i className='fab fa-facebook-f facebook-icon'></i> */}
          </div>
          <div className="col-12 section-signup">
            <span>
              <FormattedMessage id={"login.have-signup"} />
            </span>
            <span
              className="sign-up"
              onClick={() => {
                history.push("/sign-up");
              }}
            >
              <FormattedMessage id={"login.signup"} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};
