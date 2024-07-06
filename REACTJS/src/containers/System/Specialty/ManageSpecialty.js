import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import {
  filterSpecialties,
  deleteSpecialty,
} from "../../../services/specialtyService";
import { withRouter } from "../../../utils/withRouter";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      listSpecialties: [],
    };
  }

  async componentDidMount() {
    await this.getAllSpecialties();
  }

  getAllSpecialties = async () => {
    let res = await filterSpecialties({});
    if (res && res.errCode === 0 && res.data) {
      let allSpecialties = res.data.reverse();
      this.setState({
        listSpecialties: allSpecialties,
      });
      console.log("res", res);
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);

    if (res && res.errCode === 0) {
      if (this.props.language == "en") {
        toast.success("Add new specialty succeeds!");
      } else {
        toast.success("Thêm chuyên khoa thành công!");
      }

      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      if (this.props.language == "en") {
        toast.error("Something wrongs!");
      } else {
        toast.error("Lỗi!");
      }
    }
  };

  handleDeleteSpecialty = async (specialtyId) => {
    let { language } = this.props;

    let res = await deleteSpecialty({ id: specialtyId });
    if (res && res.errCode === 0) {
      if (language === "en") {
        toast.success("Deleted!");
      } else {
        toast.success("Đã xóa!");
      }

      await this.getAllSpecialties();
    } else {
      if (language === "en") {
        toast.error("Delete failed!");
      } else {
        toast.success("Xóa thất bại!");
      }

      await this.getAllSpecialties();
    }
  };

  handleReset = async () => {
    this.setState({
      name: "",
    });

    await this.getAllSpecialties();
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  handleFilterSpecialties = async () => {
    let { name } = this.state;

    let data = {
      name: name,
    };

    let res = await filterSpecialties(data);

    if (res && res.data) {
      let allSpecialties = res.data.reverse();
      this.setState({
        listSpecialties: allSpecialties,
      });
    }
  };

  render() {
    let { listSpecialties } = this.state;

    return (
      <div className="manage-specialty-container container">
        <div className="ms-title mb-60">
          <FormattedMessage id="admin.manage-specialty.manage-specialty" />
        </div>
        <div className="row">
          <div className="col-12">
            <h3>
              <FormattedMessage id="medical-history.filters" />
            </h3>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label for="exampleInputEmail1">
                {" "}
                <FormattedMessage id="admin.manage-specialty.specialty-name" />
              </label>
              <input
                value={this.state.name}
                onChange={(event) => this.onChangeInput(event, "name")}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-12">
            <button
              onClick={() => this.handleFilterSpecialties()}
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
        <div className="row">
          <div className="col-12 text-right mb-16">
            <button
              type="submit"
              className="btn btn-primary pointer mr-5"
              onClick={() => {
                this.props.navigate(
                  `/admin-dashboard/manage-specialty/create`,
                  { replace: true }
                );
              }}
            >
              <i className="fas fa-plus-circle mr-5"></i>
              <FormattedMessage id="manage-user.btn-create" />
            </button>
          </div>
        </div>
        <div className="table-manage">
          <table className="table table-striped mt-30">
            <thead>
              <tr>
                <th scope="col" style={{ width: "50px" }}>
                  #
                </th>
                <th scope="col" style={{ width: "100px" }}>
                  <FormattedMessage id="admin.manage-specialty.image" />
                </th>
                <th scope="col">
                  <FormattedMessage id="admin.manage-specialty.name" />
                </th>
                <th scope="col" className="text-right">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {listSpecialties.map((specialty, index) => {
                return (
                  <tr>
                    <td scope="row">{index + 1}</td>
                    <td>
                      <div
                        style={{
                          backgroundImage: `url(${specialty.image})`,
                          width: "50px",
                          height: "50px",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                      ></div>
                    </td>
                    <td>{specialty.name}</td>
                    <td className="text-right" colspan="2">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.props.navigate(
                            `/admin-dashboard/manage-specialty/edit/${specialty.id}`,
                            { replace: true }
                          );
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteSpecialty(specialty.id)}
                      >
                        <i className="fas fa-trash"></i>
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
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)
);
