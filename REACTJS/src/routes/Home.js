import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGES, USER_ROLE } from "../utils";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo, language } = this.props;
    let linkToRedirect = "/";
    if (isLoggedIn) {
      switch (userInfo.roleId) {
        case USER_ROLE.ADMIN:
          linkToRedirect = "/admin-dashboard/app";
          break;
        case USER_ROLE.DOCTOR:
          linkToRedirect = "/admin-dashboard/doctor";
          break;
        case USER_ROLE.PATIENT:
          linkToRedirect = "/home";
          break;
        default:
          linkToRedirect = "/home";
      }
    }

    return <Redirect to={linkToRedirect} replace={true} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
