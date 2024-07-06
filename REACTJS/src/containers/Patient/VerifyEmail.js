import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";
import { FormattedMessage } from "react-intl";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    let { language } = this.props;

    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>
              <FormattedMessage id="verifyemail.booking-loading" />
            </div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="infor-booking">
                  <FormattedMessage id="verifyemail.confirm-appointment" />
                </div>
              ) : (
                <div className="infor-booking">
                  <FormattedMessage id="verifyemail.no-appointment" />
                </div>
              )}
            </div>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
