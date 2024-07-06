import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../scss/EditProfileModal.scss";
import { Modal } from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import Lightbox from "react-image-lightbox";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { getAllUsers } from "../../../services/userService";

class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      previewImgURL: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      userEditId: null,
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.getUserInfor();
  }

  getUserInfor = () => {
    let userInfo = this.props.userInfo;
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer.from(userInfo.image, "base64").toString(
        "binary"
      );
    }

    if (userInfo) {
      this.setState({
        userEditId: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        gender: userInfo.gender,
        // avatar: "",
        previewImgURL: imageBase64 ? imageBase64 : null,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
      });
    }

    if (prevProps.userInfo !== this.props.userInfo) {
      console.log("userInfo change");
      this.getUserInfor();
    }

    if (
      prevProps.isOpenModal !== this.props.isOpenModal &&
      this.props.isOpenModal == true
    ) {
      this.getUserInfor();
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
    let arrCheck = [
      "email",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = async () => {
    this.setState({ isShowLoading: true });
    let language = this.props.language;
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    //fire redux edit user
    let resEdit = await this.props.editOnlyOneUser({
      id: this.state.userEditId,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      avatar: this.state.avatar,
    });
    if (resEdit) console.log("resEdit", resEdit);

    if (resEdit && resEdit.errCode == 0) {
      let user = await getAllUsers(this.state.userEditId);
      if (user) {
        this.props.userLoginSuccess(user.users);
      }
      let message =
        language === LANGUAGES.VI ? "Cập nhật thành công!" : "Update succeed!";
      if (message) toast.success(message);

      this.setState({ isShowLoading: false });
      this.props.closeBookingClose();
    } else {
      let message =
        language === LANGUAGES.VI ? "Cập nhật thất bại!" : "Update failed!";
      if (message) toast.error(message);
      this.setState({ isShowLoading: false });
    }
  };

  render() {
    let { isOpenModal, closeBookingClose } = this.props;
    let genders = this.state.genderArr;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;
    let userInfo = this.props.userInfo;
    let { email, firstName, lastName, phoneNumber, address, gender, avatar } =
      this.state;

    return (
      <LoadingOverlay
        active={false}
        spinner={<BounceLoader color={"#45c3d2"} size={60} />}
      >
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        <Modal
          isOpen={isOpenModal}
          className={"edit-profile-modal-container"}
          size="lg"
          centered
        >
          <div className="edit-profile-modal-content">
            <div className="edit-profile-modal-header">
              <span className="left">
                <FormattedMessage id="manage-user.update-profile" />
              </span>
              <span className="right">
                <i className="fas fa-times" onClick={closeBookingClose}></i>
              </span>
            </div>
            <div className="edit-profile-modal-body">
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input className="form-control" value={email} disabled />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    value={firstName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "firstName")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    value={lastName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "lastName")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>
                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "phoneNumber");
                    }}
                  />
                </div>
                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "gender");
                    }}
                    value={gender}
                  >
                    <option value={null}>
                      {" "}
                      {language === LANGUAGES.VI
                        ? "Chọn giới tính"
                        : "Choose gender"}{" "}
                    </option>
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      <FormattedMessage id="manage-user.upload" />{" "}
                      <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-profile-modal-footer">
              <button
                className="btn-edit-profile-confirm btn btn-primary"
                onClick={() => this.handleSaveUser()}
              >
                <FormattedMessage id="manage-user.confirm" />
              </button>
              <button
                className="btn-edit-profile-cancel"
                onClick={closeBookingClose}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
