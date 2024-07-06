import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container container">
          <div className="section-header">
            <div className="section-header-title">
              <span>
                <FormattedMessage id="homepage.handbook" />
              </span>
            </div>
            <div className="section-header-option">
              <button>
                <span>
                  <FormattedMessage id="homepage.more-infor" />
                </span>
              </button>
            </div>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              <div className="slider-customize">
                <div className="slider-img">
                  <div className="img"></div>
                </div>
                <div className="slider-title">
                  <span>Bài viết bổ ích</span>
                </div>
              </div>
              <div className="slider-customize">
                <div className="slider-img">
                  <div className="img"></div>
                </div>
                <div className="slider-title">
                  <span>Bài viết bổ ích</span>
                </div>
              </div>
              <div className="slider-customize">
                <div className="slider-img">
                  <div className="img"></div>
                </div>
                <div className="slider-title">
                  <span>Bài viết bổ ích</span>
                </div>
              </div>
              <div className="slider-customize">
                <div className="slider-img">
                  <div className="img"></div>
                </div>
                <div className="slider-title">
                  <span>Bài viết bổ ích</span>
                </div>
              </div>
              <div className="slider-customize">
                <div className="slider-img">
                  <div className="img"></div>
                </div>
                <div className="slider-title">
                  <span>Bài viết bổ ích</span>
                </div>
              </div>
              <div className="slider-customize">
                <div className="slider-img">
                  <div className="img"></div>
                </div>
                <div className="slider-title">
                  <span>Bài viết bổ ích</span>
                </div>
              </div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
