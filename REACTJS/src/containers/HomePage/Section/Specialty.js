import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  handleClickSeeMoreSpecialty = () => {
    this.props.history.push(`/list-specialty`);
  };

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="section-share section-specialty">
        <div className="section-container container">
          <div className="section-header">
            <div className="section-header-title">
              <span>
                <FormattedMessage id="homepage.specialty-popular" />
              </span>
            </div>
            <div className="section-header-option">
              <button onClick={() => this.handleClickSeeMoreSpecialty()}>
                <span>
                  <FormattedMessage id="homepage.more-infor" />
                </span>
              </button>
            </div>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div className="slider-customize">
                      <div
                        className="slider-img"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
