import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { Link } from "react-router-dom";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(
              moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
            )
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return (
        <>
          <div>
            {time} {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;
    let nameVi = "",
      nameEn = "",
      positionVi,
      positionEn;
    if (dataProfile && dataProfile.positionData) {
      positionVi = `${dataProfile.positionData.valueVi}`;
      positionEn = `${dataProfile.positionData.valueEn}`;
      nameVi = `${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor row">
          <div className="intro-left col-4 col-xl-2 col-lg-3 col-md-4">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
          </div>
          <div className="intro-right col-8 col-xl-10 col-lg-9 col-md-8">
            <div className="intro-position">
              {language === LANGUAGES.VI ? positionVi : positionEn}
            </div>
            <div className="intro-name">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="intro-desc">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
            {isShowLinkDetail === true && (
              <div className="view-detail-doctor">
                <Link to={`/detail-doctor/${doctorId}`}>
                  <FormattedMessage id="homepage.more-infor" />
                </Link>
              </div>
            )}
          </div>
        </div>
        {isShowPrice === true && (
          <div className="price">
            <span className="left">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
            </span>
            <span className="right">
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
            </span>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
