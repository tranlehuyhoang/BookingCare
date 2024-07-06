import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleOnClickSeeMoreDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/list-oustanding-doctor`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container container">
          <div className="section-header">
            <div className="section-header-title">
              <span>
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
            </div>
            <div className="section-header-option">
              <button onClick={() => this.handleOnClickSeeMoreDoctor()}>
                <span>
                  <FormattedMessage id="homepage.more-infor" />
                </span>
              </button>
            </div>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  let positionVi = `${item.positionData.valueVi}`;
                  let positionEn = `${item.positionData.valueEn}`;
                  let nameVi = `${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="slider-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="slider-img">
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        ></div>
                      </div>
                      <div className="slider-title">
                        <span className="slider-doctor-position">
                          {language === LANGUAGES.VI ? positionVi : positionEn}
                        </span>
                        <br></br>
                        <span className="slider-doctor-name">
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </span>
                        <br></br>
                        <span className="slider-doctor-specialty">
                          {item.Doctor_Infor &&
                          item.Doctor_Infor.specialtyData &&
                          item.Doctor_Infor.specialtyData.name
                            ? item.Doctor_Infor.specialtyData.name
                            : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
