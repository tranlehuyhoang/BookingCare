import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";
import { postUserForgotPassword } from "../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const ForgotPassword = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));
  const [isShowLoading, setIsShowLoading] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const handleForgotPassword = async () => {
    setIsShowLoading(true);
    if (email.trim().length === 0) {
      if (language == "en") {
        toast.error("Email input empty!");
      } else {
        toast.error("Bạn chưa nhập email!");
      }
      return;
    }
    let res = await postUserForgotPassword({
      email: email.trim(),
    });
    if (res && res.errCode === 0) {
      setIsShowLoading(false);
      if (language == "en") {
        toast.success("Send email to retrieve password succeed!");
      } else {
        toast.success(
          "Gửi email lấy lại mật khẩu thành công, hãy kiểm tra email của bạn!"
        );
      }
    } else {
      setIsShowLoading(false);
      if (language == "en") {
        toast.error("User's not found, please retype email!");
      } else {
        toast.error(
          "Không tìm thấy email trong hệ thống, vui lòng nhập lại email!"
        );
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleForgotPassword();
    }
  };

  return (
    <LoadingOverlay
      active={isShowLoading}
      spinner={<BounceLoader color={"#459af7"} size={60} />}
    >
      <>
        <div className="login-background">
          <div className="forgot-password-container">
            <div className="login-content row">
              <div className="col-12 text-center text-login">
                <FormattedMessage id={"login.forgot-password"} />
              </div>
              <div className="col-12 form-group login-form">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control login-input"
                  placeholder={
                    language === "en"
                      ? "Enter your email to retrieve password"
                      : "Nhập email của bạn để lấy lại mật khẩu"
                  }
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={(event) => handleKeyDown(event)}
                />
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => {
                    handleForgotPassword();
                  }}
                  onKeyDown={(event) => handleKeyDown(event)}
                >
                  <FormattedMessage id={"login.retrieve"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </LoadingOverlay>
  );
};
export default ForgotPassword;
