import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import * as ReactDOM from "react-dom";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.data) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  handleSeeMoreMedicalFacility = () => {
    if (this.props.history) {
      this.props.history.push(`/list-medical-facility`);
    }
  };

  render() {
    let { dataClinics } = this.state;

    return (
      <div className="section-share section-medical-facility">
        <div className="section-container container">
          <div className="section-header">
            <div className="section-header-title">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-medical-facility" />
              </span>
            </div>
            <div className="section-header-option">
              <button onClick={() => this.handleSeeMoreMedicalFacility()}>
                <span>
                  <FormattedMessage id="homepage.more-infor" />
                </span>
              </button>
            </div>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div className="slider-customize">
                      <div
                        className="slider-img"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="img"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                      </div>
                      <div className="slider-title">
                        <span>{item.name}</span>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
