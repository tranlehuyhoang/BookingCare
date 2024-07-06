import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";
import { filterDoctors } from "../../../services/doctorService";

import { withRouter } from "../../../utils/withRouter";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      position: "",
      positionArr: [],

      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      listDoctorsRaw: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvice: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount = async () => {
    this.props.getPositionStart();
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
    let res = await filterDoctors({});
    if (res && res.errCode === 0) {
      this.setState({
        listDoctorsRaw: res.data,
      });
    }
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );

      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        // listSpecialty: dataSelectSpecialty,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorAction({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvice: this.state.selectedProvice.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    console.log("selectedOption", selectedOption);
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvice = "",
        selectedSpecialty = "",
        selectedClinic = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvice = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvice: selectedProvice,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvice: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  handleReset = async () => {
    this.setState({
      firstName: "",
      lastName: "",
      position: "",
    });

    let res = await filterDoctors({});
    if (res && res.data) {
      this.setState({
        listDoctorsRaw: res.data,
      });
    }
  };

  handleFilterDoctors = async () => {
    let { firstName, lastName, position } = this.state;

    let data = {
      firstName: firstName,
      lastName: lastName,
      position: position,
    };

    let res = await filterDoctors(data);
    if (res && res.data) {
      this.setState({
        listDoctorsRaw: res.data,
      });
    }
  };

  render() {
    let {
      hasOldData,
      listSpecialty,
      listDoctorsRaw,
      firstName,
      lastName,
      position,
    } = this.state;
    let positions = this.state.positionArr;
    let { language } = this.props;

    console.log("listDoctorsRaw", listDoctorsRaw);
    // let arrUsers = this.state.usersRedux;

    // selectedPrice: "",
    // selectedPayment: "",
    // selectedProvice: "",

    return (
      <div className="container">
        <div className="title mb-60">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="row">
          <div className="col-12">
            <h3>
              <FormattedMessage id="medical-history.filters" />
            </h3>
          </div>
          <div className="col-lg-3 col-sm-6 mb-3">
            <div className="form-group">
              <label for="exampleInputEmail1">
                {" "}
                <FormattedMessage id="manage-user.first-name" />
              </label>
              <input
                value={firstName}
                onChange={(event) => this.onChangeInput(event, "firstName")}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-3">
            <div className="form-group">
              <label for="exampleInputEmail1">
                {" "}
                <FormattedMessage id="manage-user.last-name" />
              </label>
              <input
                value={lastName}
                onChange={(event) => this.onChangeInput(event, "lastName")}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-3">
            <label>
              <FormattedMessage id="manage-user.position" />
            </label>
            <select
              className="form-control"
              onChange={(event) => {
                this.onChangeInput(event, "position");
              }}
              value={position}
            >
              <option value="">
                {language === LANGUAGES.VI
                  ? "Chọn chức danh"
                  : "Choose positon"}
              </option>
              {positions &&
                positions.length > 0 &&
                positions.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 mb-3 mt-3">
            <button
              onClick={() => this.handleFilterDoctors()}
              type="button"
              className="btn btn-primary mr-5"
            >
              <FormattedMessage id="medical-history.apply" />
            </button>
            <button
              onClick={() => this.handleReset()}
              type="button"
              className="btn btn-primary"
            >
              <FormattedMessage id="medical-history.reset" />
            </button>
          </div>
        </div>
        <div className="table-manage">
          <table className="table table-striped mt-30">
            <thead>
              <tr style={{ background: "#fff" }}>
                <th scope="col">#</th>
                <th scope="col" style={{ width: "100px" }}>
                  <FormattedMessage id="admin.manage-specialty.image" />
                </th>
                <th scope="col">
                  <FormattedMessage id="admin.manage-doctor.name" />
                </th>
                <th scope="col">
                  <FormattedMessage id="admin.manage-doctor.position" />
                </th>
                <th scope="col">
                  <FormattedMessage id="admin.manage-doctor.specialty-head" />
                </th>
                <th scope="col">
                  <FormattedMessage id="admin.manage-doctor.hospital" />
                </th>
                <th scope="col">
                  <FormattedMessage id="admin.manage-doctor.province" />
                </th>
                <th scope="col" className="text-right">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {listDoctorsRaw.map((doctor, index) => {
                let imageBase64 = "";
                if (doctor.image) {
                  imageBase64 = new Buffer.from(
                    doctor.image,
                    "base64"
                  ).toString("binary");
                }
                return (
                  <tr style={{ background: "#fff" }}>
                    <td scope="row">{index + 1}</td>
                    <td>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          background: `url(${imageBase64})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          borderRadius: "50%",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </td>
                    <td>{doctor.lastName + " " + doctor.firstName}</td>
                    <td>
                      {language == "en"
                        ? doctor.positionData.valueEn
                        : doctor.positionData.valueVi}
                    </td>
                    <td>{doctor.Doctor_Infor.specialtyData.name}</td>
                    <td>{doctor.Doctor_Infor.clinicData.name}</td>
                    <td>
                      {language == "en"
                        ? doctor.Doctor_Infor.provinceTypeData.valueEn
                        : doctor.Doctor_Infor.provinceTypeData.valueVi}
                    </td>
                    <td className="text-right">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.props.navigate(
                            `/admin-dashboard/manage-doctor/edit/${doctor.id}`,
                            { replace: true }
                          );
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    positionRedux: state.admin.positions,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctorAction: (data) =>
      dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
);
