import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container container">
          <div className="section-about-header">
            <div className="section-header-title">
              <FormattedMessage id="homepage.media-talk-about" />
            </div>
          </div>
          <div className="section-about-content d-flex">
            <div className="content-left">
              <iframe
                width="100%"
                height="300px"
                src="https://www.youtube.com/embed/qVQlc9fTbfk"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                <FormattedMessage id="homepage.media-talk-about-content" />
              </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
