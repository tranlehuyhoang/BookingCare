import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Doctor from "../routes/Doctor";
import VerifyEmail from "./Patient/VerifyEmail";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Signup from "./Auth/Signup";
import System from "../routes/System";
import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import NotFound from "./System/NotFound";
import ForgotPassword from "./Auth/ForgotPassword";
import RetrievePassword from "./Auth/RetrievePassword";
import ListSpecialty from "./HomePage/SectionList/ListSpecialty";
import ListOutStandingDoctor from "./HomePage/SectionList/ListOutStandingDoctor";
import ListMedicalFacility from "./HomePage/SectionList/ListMedicalFacility";
import indexAdminDashboard from "./AdminDashboard/indexAdminDashboard";
import { getOptionGroupUnstyledUtilityClass } from "@mui/base";
import ProfileSetting from "./Profile/ProfileSetting";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100wh" }}>
                <Switch className="switch">
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route path={path.LOG_OUT} component={Logout} />
                  <Route path={path.SIGNUP} exact component={Signup} />
                  <Route
                    path={path.FORGOT_PASSWORD}
                    exact
                    component={ForgotPassword}
                  />
                  <Route
                    path={path.RETRIEVE_PASSWORD}
                    component={RetrievePassword}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                  <Route
                    path={path.LIST_SPECIALTY}
                    exact
                    component={ListSpecialty}
                  />
                  <Route
                    path={path.LIST_MEDICAL_FACILITY}
                    exact
                    component={ListMedicalFacility}
                  />
                  <Route
                    path={path.LIST_OUSTANDING_DOCTOR}
                    exact
                    component={ListOutStandingDoctor}
                  />
                  <Route
                    path={path.ADMIN_DASHBOARD}
                    component={userIsAuthenticated(indexAdminDashboard)}
                  />
                  <Route
                    path={path.PROFILE_SETTING}
                    component={userIsAuthenticated(ProfileSetting)}
                  />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </CustomScrollbars>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
