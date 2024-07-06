import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-container">
          <div className="footer-content container">
            <div className="content-left">
              <h3>
                <FormattedMessage id="homepage.footer-left-header" />
              </h3>
              <div className="content-info">
                <i className="icon fa fa-map-marker"></i>
                <span>
                  <FormattedMessage id="homepage.footer-left-address" />
                </span>
              </div>
              <div className="content-info">
                <i className="icon fa fa-phone"></i>
                <span>
                  <FormattedMessage id="homepage.footer-left-phoneNumber" />
                </span>
              </div>
              <div className="content-info">
                <i className="icon fa fa-envelope"></i>
                <span>
                  <FormattedMessage id="homepage.footer-left-email" />
                </span>
              </div>
            </div>
            <div className="content-center">
              <div className="footer-logo"></div>
              <div className="content-info">
                <a>
                  <FormattedMessage id="homepage.footer-center-1" />
                </a>
              </div>
              <div className="content-info">
                <a>
                  <FormattedMessage id="homepage.footer-center-2" />
                </a>
              </div>
              <div className="content-info">
                <a>
                  <FormattedMessage id="homepage.footer-center-3" />
                </a>
              </div>
              <div className="content-info">
                <a>
                  <FormattedMessage id="homepage.footer-center-4" />
                </a>
              </div>
              <div className="content-info">
                <a>
                  <FormattedMessage id="homepage.footer-center-5" />
                </a>
              </div>
              <div className="content-info">
                <a>
                  <FormattedMessage id="homepage.footer-center-6" />
                </a>
              </div>
            </div>
            <div className="content-right">
              <h3>
                <FormattedMessage id="homepage.footer-right-header" />
              </h3>
              <a href="#" className="content-info">
                <h4>
                  <FormattedMessage id="homepage.footer-right-header-child-1" />
                </h4>
                <p>
                  <FormattedMessage id="homepage.footer-right-child-1" />
                </p>
              </a>
              <a href="#" className="content-info">
                <h4>
                  <FormattedMessage id="homepage.footer-right-header-child-2" />
                </h4>
                <p>
                  <FormattedMessage id="homepage.footer-right-child-2" />
                </p>
              </a>
              <a href="#" className="content-info">
                <h4>
                  <FormattedMessage id="homepage.footer-right-header-child-3" />
                </h4>
                <p>
                  <FormattedMessage id="homepage.footer-right-child-3" />
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-info">
          <div className="footer-info-content container">
            <div className="copy-right">
              <FormattedMessage id="homepage.footer-copyright" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
