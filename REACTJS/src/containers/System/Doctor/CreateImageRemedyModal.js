import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CreateImageRemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { CommonUtils } from "../../../utils";
import { filterDrugs } from "../../../services/drugService";

class CreateImageRemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      //   imgBase64: "",
      listMedicine: "",
      desciption: "",
      patientName: "",
      drugs: [],
      listSeletedDrugs: [],
      listProcessedDrugs: [],
      listFilterDrugs: [],
      units: [
        { key: "pill", valueVi: "Viên", valueEn: "Pill" },
        { key: "package", valueVi: "Gói", valueEn: "Package" },
        { key: "bottle", valueVi: "Chai", valueEn: "Bottle" },
        { key: "tube", valueVi: "Ống", valueEn: "Tube" },
        { key: "set", valueVi: "Bộ", valueEn: "Set" },
      ],
    };
  }

  handleRebuildDrugsList = (drugs) => {
    return drugs.map((drug) => {
      drug.description_usage = "";
      drug.unit = "chooseUnits";
      drug.amount = 0;
      return drug;
    });
  };

  async componentDidMount() {
    let res = await filterDrugs({ name: "" });

    let rebuildDrugs = [];
    if (res) rebuildDrugs = this.handleRebuildDrugsList(res);

    if (rebuildDrugs)
      this.setState({
        drugs: rebuildDrugs,
      });

    if (rebuildDrugs)
      this.setState({
        listFilterDrugs: rebuildDrugs,
      });

    console.log("rebuildDrugs", rebuildDrugs);
    if (this.props.dataModalCreateRemedy) {
      this.setState({
        email: this.props.dataModalCreateRemedy.email,
        patientName: this.props.dataModalCreateRemedy.patientName,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModalCreateRemedy !== prevProps.dataModalCreateRemedy) {
      this.setState({
        email: this.props.dataModalCreateRemedy.email,
        patientName: this.props.dataModalCreateRemedy.patientName,
      });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeListMedicine = (event) => {
    this.setState({
      listMedicine: event.target.value,
    });
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      desciption: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleCreateRemedyImage = () => {
    this.props.createRemedyImage(this.state);
  };

  handlePushDrugToList = (drug) => {
    let temp = [...this.state.listSeletedDrugs];

    temp.push(drug);

    this.setState({
      listSeletedDrugs: temp,
    });

    if (temp) console.log("temp", temp);
  };

  removeDrugFromTheList = (drugId) => {
    let temp = [...this.state.listSeletedDrugs];

    temp = temp.filter((drug) => drug.id != drugId);

    this.setState({
      listSeletedDrugs: temp,
    });
  };

  handleOnchangeDescriptionUsageDrug = (event, drugId) => {
    let temp = [...this.state.listSeletedDrugs];

    temp.map((drug) => {
      if (drug.id == drugId) {
        drug.description_usage = event.target.value;
      }

      return drug;
    });

    this.setState({
      listSeletedDrugs: temp,
    });

    console.log(this.state.listSeletedDrugs);
  };

  handleOnchangeUnitDrug = (event, drugId) => {
    let temp = [...this.state.listSeletedDrugs];

    temp.map((drug) => {
      if (drug.id == drugId) {
        drug.unit = event.target.value;
      }

      return drug;
    });

    this.setState({
      listSeletedDrugs: temp,
    });

    console.log(this.state.listSeletedDrugs);
  };

  handleOnchangeAmountDrug = (event, drugId) => {
    let temp = [...this.state.listSeletedDrugs];

    temp.map((drug) => {
      if (drug.id == drugId) {
        drug.amount = event.target.value;
      }

      return drug;
    });

    this.setState({
      listSeletedDrugs: temp,
    });

    console.log(this.state.listSeletedDrugs);
  };

  handleFilterDrugs = (event) => {
    console.log(event.target.value);

    let temp = [...this.state.drugs];
    temp = temp.filter(
      (drug) =>
        drug.name.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1
    );

    this.setState({
      listFilterDrugs: temp,
    });
  };

  handleCloseModal = () => {
    this.setState({
      listSeletedDrugs: [],
    });

    this.props.closeCreateImageRemedyModal();
  };

  render() {
    let {
      isOpenCreateImageRemedyModal,
      closeCreateImageRemedyModal,
      dataModalCreateRemedy,
      createRemedyImage,
    } = this.props;
    let { drugs, listSeletedDrugs, listFilterDrugs, units } = this.state;
    let { language } = this.props;

    return (
      <Modal
        isOpen={isOpenCreateImageRemedyModal}
        className={"booking-modal-container"}
        size="xl"
      >
        <div className="modal-header">
          <h5 className="modal-title">Tạo đơn thuốc</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => this.handleCloseModal()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Email bệnh nhân</label>
                  <input
                    className="form-control"
                    type="email"
                    value={this.state.email}
                    // onChange={(event) => this.handleOnChangeEmail(event)}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Tên bệnh nhân</label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.patientName}
                    // onChange={(event) => this.handleOnChangeEmail(event)}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>Thuốc</label>
                  {/* <textarea
                      className="form-control"
                      aria-label="With textarea"
                      value={this.state.listMedicine}
                      onChange={(event) => this.handleOnChangeListMedicine(event)}
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
                                  this.handleOnchangeUnitDrug(event, drug.id)
                                }
                                value={drug.unit}
                              >
                                <option value="chooseUnits">Units</option>
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
                            <div className="col-5">
                              {" "}
                              <input
                                onChange={(event) =>
                                  this.handleOnchangeDescriptionUsageDrug(
                                    event,
                                    drug.id
                                  )
                                }
                                type="text"
                                value={drug.desciption}
                                className="form-control"
                                placeholder="Enter desription"
                              />
                            </div>
                            <div className="col-1 d-flex align-items-center">
                              <i
                                onClick={() =>
                                  this.removeDrugFromTheList(drug.id)
                                }
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
                  Danh sách thuốc
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => this.handleFilterDrugs(event)}
                  />
                  <ul
                    className="list-group mt-10"
                    style={{ overflowY: "scroll", maxHeight: "400px" }}
                  >
                    {listFilterDrugs.map((drug) => {
                      return (
                        <li
                          onClick={() => this.handlePushDrugToList(drug)}
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pointer"
                        >
                          <span>{drug.name}</span>{" "}
                          <i className="text-primary fas fa-plus-circle"></i>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 form-group">
              <label>Thông tin mô tả thêm</label>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={this.state.desciption}
                onChange={(event) => this.handleOnChangeDescription(event)}
              ></textarea>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.handleCreateRemedyImage()}
          >
            Create
          </Button>{" "}
          <Button color="secondary" onClick={() => this.handleCloseModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateImageRemedyModal);
