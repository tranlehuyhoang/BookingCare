import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { createNewSpecialty } from "../../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  async componentDidMount() {}

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

  chechValidateInput = () => {
    let { language } = this.props;
    let arrCheck = [
      "name",
      "imageBase64",
      "descriptionHTML",
      "descriptionMarkdown",
    ];
    let copyState = { ...this.state };
    for (let i = 0; i < arrCheck.length; i++) {
      if (!copyState[arrCheck[i]]) {
        if (language == "en") {
          toast.error("Missing require parameters!");
        } else {
          toast.error("Thiếu thông tin chuyên khoa!");
        }

        return false;
      }
    }
    return true;
  };

  handleSaveNewSpecialty = async () => {
    let check = this.chechValidateInput();
    if (!check) return;

    let { language } = this.props;
    let res = await createNewSpecialty(this.state);

    if (res && res.errCode === 0) {
      if (language == "en") {
        toast.success("Add new specialty successfully!");
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
      if (language == "en") {
        toast.error("Something wrongs!");
      } else {
        toast.error("Lỗi!");
      }
    }

    // setTimeout(function(){ window.location.href = '/admin-dashboard/manage-specialty' }, 1000);
  };

  render() {
    let { language } = this.props;

    return (
      <div className="manage-specialty-container container">
        <div className="ms-title mb-60">
          <FormattedMessage id="admin.manage-specialty.title-create" />
        </div>
        <div className="add-new-specialty row">
          <div className="col-lg-6 form-group mb-3">
            <label>
              <FormattedMessage id="admin.manage-specialty.specialty-name" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-lg-6 form-group mb-3">
            <label>
              <FormattedMessage id="admin.manage-specialty.specialty-avatar" />
            </label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary mt-10"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              {language === "en" ? "Create" : "Thêm"}
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpecialty);
