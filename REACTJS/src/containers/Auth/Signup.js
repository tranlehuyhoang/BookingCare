import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Signup.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions";
import { createNewUserService } from "../../services/userService";
import { toast } from "react-toastify";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddNewUser();
    }
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        if (this.props.language == "en") {
          toast.error("Account already exists");
        } else {
          toast.error("Tài khoản đã tồn tại");
        }
      } else {
        if (this.props.language == "en") {
          toast.success("User created successfully!");
        } else {
          toast.success("Tạo mới người dùng thành công!");
        }
        this.setState({
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          isShowPassword: false,
        });
        this.props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        if (this.props.language == "en") {
          toast.error("Missing parameter: " + arrInput[i]);
        } else {
          toast.error("Chưa nhập đủ thông tin");
        }
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      this.createNewUser(this.state); //can kiem tra lai cac input trong state cho fit
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="signup-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">
              <FormattedMessage id={"login.signup"} />
            </div>
            <div className="col-12 form-group login-form">
              <label>
                <FormattedMessage id={"login.username"} />
              </label>
              <input
                type="text"
                className="form-control login-input"
                placeholder={
                  this.props.language === "en"
                    ? "Enter your email"
                    : "Nhập email của bạn"
                }
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
            </div>
            <div className="col-12 form-group login-form">
              <label>
                <FormattedMessage id={"login.password"} />
              </label>
              <div className="custom-input-password">
                <input
                  className="form-control login-input"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder={
                    this.props.language === "en"
                      ? "Enter your password"
                      : "Nhập mật khẩu của bạn"
                  }
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 form-group login-form">
              <label>
                <FormattedMessage id={"login.firstname"} />
              </label>
              <input
                type="text"
                className="form-control login-input"
                placeholder={
                  this.props.language === "en"
                    ? "Enter your firstname"
                    : "Nhập tên của bạn"
                }
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
            </div>
            <div className="col-12 form-group login-form">
              <label>
                <FormattedMessage id={"login.lastname"} />
              </label>
              <input
                type="text"
                className="form-control login-input"
                placeholder={
                  this.props.language === "en"
                    ? "Enter your lastname"
                    : "Nhập họ của bạn"
                }
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
            </div>
            <div className="col-12 form-group login-form">
              <label>
                <FormattedMessage id={"login.address"} />
              </label>
              <input
                type="text"
                className="form-control login-input"
                placeholder={
                  this.props.language === "en"
                    ? "Enter your address"
                    : "Nhập địa chỉ của bạn"
                }
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
            </div>
            {/* <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div> */}
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleAddNewUser();
                }}
                onKeyDown={(event) => this.handleKeyDown(event)}
              >
                <FormattedMessage id={"login.signup"} />
              </button>
            </div>
            {/* <div className="col-12 section-forgot-signup">
              <span className="forgot-password">Forgot your password</span>
              <span className="sign-up">Sign up</span>
            </div> */}
            {/* <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Signup with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-square facebook"></i>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
