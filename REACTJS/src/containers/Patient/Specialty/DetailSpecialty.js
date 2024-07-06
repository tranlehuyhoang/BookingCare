import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import {
  getAllSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
      //   imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getAllSpecialtyById({
        id: id,
        location: location,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-specialty-container">
          <div className="detail-specialty-body container">
            <div className="description-specialty">
              {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                <>
                  <div className="specialty-name">
                    {dataDetailSpecialty.name}
                  </div>
                  <div
                    className="specialty-intro"
                    dangerouslySetInnerHTML={{
                      __html: dataDetailSpecialty.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
            </div>
            <div className="search-sp-doctor">
              <select onChange={(event) => this.handleOnChangeSelect(event)}>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
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
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor row" key={index}>
                    <div className="dt-content-left col-lg-6">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                          //   dataTime={dataTime}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right col-lg-6">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
