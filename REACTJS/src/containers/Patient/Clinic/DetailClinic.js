import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { getAllDetailClinicById } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;

        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
      //   imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-clinic-container">
          <div className="detail-clinic-body container">
            <div className="description-clinic">
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <>
                  <div className="clinic-name">{dataDetailClinic.name}</div>
                  <div className="clinic-address">
                    {dataDetailClinic.address}
                  </div>
                  <div
                    className="clinic-intro"
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
