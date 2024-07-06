import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../scss/EditPasswordModal.scss";
import { Modal } from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import Lightbox from "react-image-lightbox";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { editPassword } from "../../../services/userService";

class EditPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      eyeCurrentPassword: false,
      eyeNewPassword: false,
      eyeConfirmPassword: false,
      isShowLoading: false,
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
    }
    if (prevProps.isOpenModal !== this.props.isOpenModal) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["currentPassword", "newPassword", "confirmPassword"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        let language = this.props.language;
        if (language == "en") {
          toast.warn("Not enough information has been entered!");
        } else {
          toast.warn("Bạn chưa nhập đủ thông tin!");
        }
        break;
      }
    }
    return isValid;
  };

  checkNewPassworMatchConfirmPassword = () => {
    let isValid = true;
    let language = this.props.language;
    if (this.state.newPassword != this.state.confirmPassword) {
      isValid = false;
      if (language == "en") {
        toast.warn("New password and confirm password do not match!");
      } else {
        toast.warn("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      }
    }
    return isValid;
  };

  handleEditPassword = async () => {
    this.setState({ isShowLoading: true });

    console.log("this.state", this.state);

    let language = this.props.language;

    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let isValidPassword = this.checkNewPassworMatchConfirmPassword();
    if (isValidPassword === false) return;

    console.log("userInfo", this.props.userInfo);
    //fire redux edit user
    let resEdit = await editPassword({
      id: this.props.userInfo.id,
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
    });

    if (resEdit) console.log("resEdit", resEdit);

    if (resEdit && resEdit.errCode == 0) {
      let message =
        language === LANGUAGES.VI ? "Cập nhật thành công!" : "Update succeed!";
      if (message) toast.success(message);

      this.setState({ isShowLoading: false });
      this.props.closeEditPasswordClose();
    } else {
      let message =
        language === LANGUAGES.VI ? "Cập nhật thất bại!" : "Update failed!";
      if (message) toast.error(message);
      this.setState({ isShowLoading: false });
    }
  };

  render() {
    let { isOpenModal, closeEditPasswordClose } = this.props;
    let language = this.props.language;
    let userInfo = this.props.userInfo;
    let {
      currentPassword,
      newPassword,
      confirmPassword,
      eyeCurrentPassword,
      eyeNewPassword,
      eyeConfirmPassword,
    } = this.state;

    return (
      <LoadingOverlay
        active={false}
        spinner={<BounceLoader color={"#45c3d2"} size={60} />}
      >
        <Modal
          isOpen={isOpenModal}
          className={"edit-profile-modal-container"}
          size="sm"
          centered
        >
          <div className="edit-profile-modal-content">
            <div className="edit-profile-modal-header">
              <span className="left">
                <FormattedMessage id="manage-user.edit-password" />
              </span>
              <span className="right">
                <i
                  className="fas fa-times"
                  onClick={closeEditPasswordClose}
                ></i>
              </span>
            </div>
            <div className="edit-profile-modal-body">
              <div className="row">
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="manage-user.current-password" />
                  </label>
                  <div class="custom-input-password">
                    <input
                      className="form-control"
                      type={!eyeCurrentPassword ? "password" : "text"}
                      value={currentPassword}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "currentPassword")
                      }
                    />
                    <i
                      class={
                        !eyeCurrentPassword ? "fas fa-eye-slash" : "far fa-eye"
                      }
                      onClick={() =>
                        this.setState({
                          eyeCurrentPassword: !eyeCurrentPassword,
                        })
                      }
                    ></i>
                  </div>
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="manage-user.new-password" />
                  </label>
                  <div class="custom-input-password">
                    <input
                      className="form-control"
                      type={!eyeNewPassword ? "password" : "text"}
                      value={newPassword}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "newPassword")
                      }
                    />
                    <i
                      class={
                        !eyeNewPassword ? "fas fa-eye-slash" : "far fa-eye"
                      }
                      onClick={() =>
                        this.setState({ eyeNewPassword: !eyeNewPassword })
                      }
                    ></i>
                  </div>
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="manage-user.confirm-password" />
                  </label>
                  <div class="custom-input-password">
                    <input
                      className="form-control"
                      type={!eyeConfirmPassword ? "password" : "text"}
                      value={confirmPassword}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "confirmPassword")
                      }
                    />
                    <i
                      class={
                        !eyeConfirmPassword ? "fas fa-eye-slash" : "far fa-eye"
                      }
                      onClick={() =>
                        this.setState({
                          eyeConfirmPassword: !eyeConfirmPassword,
                        })
                      }
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-profile-modal-footer">
              <button
                className="btn-edit-profile-confirm"
                onClick={() => this.handleEditPassword()}
              >
                <FormattedMessage id="manage-user.confirm" />
              </button>
              <button
                className="btn-edit-profile-cancel"
                onClick={closeEditPasswordClose}
              >
                <FormattedMessage id="manage-user.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editOnlyOneUser: (data) => dispatch(actions.editOnlyOneUser(data)),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPasswordModal);
