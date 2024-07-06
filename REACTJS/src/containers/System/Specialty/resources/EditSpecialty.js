import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { createNewSpecialty } from "../../../../services/userService";
import {
  getDetailSpecialtyById,
  updateSpecialtyData,
} from "../../../../services/specialtyService";
import { toast } from "react-toastify";
import { withRouter } from "../../../../utils/withRouter";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    await this.getSpecialtyDetail();
  }

  getSpecialtyDetail = async () => {
    let { specialtyId } = this.props.params;
    let res = await getDetailSpecialtyById({ id: specialtyId });

    if (res && res.errCode === 0 && res.data) {
      let objectUrl = new Buffer.from(res.data.image, "base64").toString(
        "binary"
      );

      this.setState({
        name: res.data.name,
        imageBase64: res.data.image,
        descriptionHTML: res.data.descriptionHTML,
        descriptionMarkdown: res.data.descriptionMarkdown,
        previewImgURL: objectUrl,
      });
    }
  };

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

  handleSaveNewSpecialty = async () => {
    let { specialtyId } = this.props.params;
    let { language } = this.props;

    console.log("this.state.imageBase64", this.state.imageBase64);

    let res = await updateSpecialtyData({
      id: specialtyId,
      name: this.state.name,
      image: this.state.previewImgURL,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
    });

    if (res && res.errCode === 0) {
      if (language === "en") {
        toast.success("Update specialty succeed!");
      } else {
        toast.success("Cập nhật chuyên khoa thành công!");
      }

      await this.getSpecialtyDetail();
    } else {
      if (language === "en") {
        toast.error("Something wrongs!");
      } else {
        toast.error("Lỗi!");
      }

      await this.getSpecialtyDetail();
    }

    // setTimeout(function () { window.location.href = '/admin-dashboard/manage-specialty' }, 1000);
  };

  render() {
    let { language } = this.props;

    return (
      <div className="manage-specialty-container container">
        <div className="ms-title mb-60">
          <FormattedMessage id="admin.manage-specialty.title-edit" />
        </div>
        <div className="add-new-specialty row">
          <div className="col-lg-6 form-group">
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
          <div className="col-lg-6 form-group">
            <label>
              <FormattedMessage id="admin.manage-specialty.specialty-avatar" />
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
              className="btn btn-primary mt-10"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              {language === "en" ? "Update" : "Cập nhật"}
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
  connect(mapStateToProps, mapDispatchToProps)(EditSpecialty)
);
