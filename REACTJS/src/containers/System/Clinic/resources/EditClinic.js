import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { createNewClinic } from "../../../../services/userService";
import {
  updateClinicData,
  getDetailClinicById,
} from "../../../../services/clinicService";
import { toast } from "react-toastify";
import { withRouter } from "../../../../utils/withRouter";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    await this.getInfoClinic();
  }

  async getInfoClinic() {
    let { clinicId } = this.props.params;
    let res = await getDetailClinicById({ id: clinicId });
    if (res && res.errCode === 0 && res.data) {
      console.log("res", res.data);
      let objectUrl = new Buffer.from(res.data.image, "base64").toString(
        "binary"
      );

      this.setState({
        name: res.data.name,
        address: res.data.address,
        imageBase64: res.data.image,
        descriptionHTML: res.data.descriptionHTML,
        descriptionMarkdown: res.data.descriptionMarkdown,
        previewImgURL: objectUrl,
      });
    }
  }

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
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
      let objectUrl = URL.createObjectURL(file);

      this.setState({
        imageBase64: base64,
        previewImgURL: objectUrl,
      });
    }
  };

  handleSaveNewClinic = async () => {
    let { clinicId } = this.props.params;
    let res = await updateClinicData({ ...this.state, id: clinicId });
    let { language } = this.state;

    if (res && res.errCode === 0) {
      if (language == "en") {
        toast.success("Update new hospital successfully!");
      } else {
        toast.success("Cập nhật bệnh viện thành công!");
      }

      await this.getInfoClinic();
    } else {
      if (language == "en") {
        toast.error("Something wrongs!");
      } else {
        toast.error("Lỗi!");
      }
    }

    // setTimeout(function () { window.location.href = '/admin-dashboard/manage-clinic'; }, 2000);
  };

  render() {
    let { language } = this.props;

    return (
      <div className="manage-specialty-container container">
        <div className="ms-title mb-60">
          <FormattedMessage id={"admin.manage-clinic.title-edit"} />
        </div>
        <div className="add-new-specialty row">
          <div className="col-lg-6 form-group">
            <label>
              <FormattedMessage id={"admin.manage-clinic.hospital-name"} />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-lg-6 form-group">
            <label>
              <FormattedMessage id={"admin.manage-clinic.hospital-address"} />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>
          <div className="col-lg-6 form-group">
            <label>
              <FormattedMessage id={"admin.manage-clinic.hospital-avatar"} />
            </label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
            <div
              className="preview-image mt-2"
              style={{
                backgroundImage: `url(${this.state.previewImgURL})`,
                width: "100px",
                height: "75px",
              }}
              onClick={() => this.openPreviewImage()}
            ></div>
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
              className="btn btn-primary mt-30"
              onClick={() => this.handleSaveNewClinic()}
            >
              {language == "en" ? "Update" : "Cập nhật"}
            </button>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() =>
              this.setState({
                isOpen: false,
              })
            }
          />
        )}
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
  connect(mapStateToProps, mapDispatchToProps)(EditClinic)
);
