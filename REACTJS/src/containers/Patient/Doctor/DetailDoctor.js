import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "",
      positionVi,
      positionEn;
    if (detailDoctor && detailDoctor.positionData) {
      positionVi = `${detailDoctor.positionData.valueVi}`;
      positionEn = `${detailDoctor.positionData.valueEn}`;
      nameVi = `${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    console.log(detailDoctor);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="doctor-detail-section container">
            <div className="intro-doctor row">
              <div className="intro-left col-4 col-xl-2 col-lg-3 col-md-4">
                <div
                  className="avatar"
                  style={{ backgroundImage: `url(${detailDoctor.image})` }}
                ></div>
              </div>
              <div className="intro-right col-8 col-xl-6 col-lg-9 col-md-8">
                <div className="intro-position">
                  {language === LANGUAGES.VI ? positionVi : positionEn}
                </div>
                <div className="intro-name">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <div className="intro-desc">
                  {detailDoctor &&
                    detailDoctor.Markdown &&
                    detailDoctor.Markdown.description && (
                      <span>{detailDoctor.Markdown.description}</span>
                    )}
                </div>
              </div>
            </div>
            <div className="schedule-doctor row">
              <div className="content-left col-12 col-lg-6">
                <DoctorSchedule
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
              <div className="content-right col-12 col-lg-6">
                <DoctorExtraInfor
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
            </div>
            <div className="detail-infor-doctor row">
              <div className="info-doctor col-12">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.contentHTML && (
                    <div //neu khong co thuoc tinh nay se in ra noi dung HTML
                      dangerouslySetInnerHTML={{
                        __html: detailDoctor.Markdown.contentHTML,
                      }}
                    ></div>
                  )}
              </div>
            </div>
            <div className="comment-doctor row"></div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
