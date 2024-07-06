import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "!important",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MenuHomeHeader = () => {
  //mapStateToProps Redux
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const dispatch = useDispatch();

  //   const [state, setState] = useState({
  //     isLoggedIn: false,
  //     userInfo: {},
  //     language: "",
  //   });

  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItemMenu = (item) => {
    switch (item) {
      case "login":
        history.push("/login");
        break;
      case "forgot-password":
        history.push("/forgot-password");
        break;
      case "logout":
        history.push("/logout");
        break;
      case "sign-up":
        history.push("/sign-up");
        break;
      case "home-page":
        history.push("/home");
        break;
      case "user/profile-setting":
        history.push("/user/profile-setting");
        break;
      default:
      // code block
    }
  };

  return (
    <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      > */}
      {/* Open Menu */}
      <span onClick={handleClick}>
        <i className="fs-25 pointer fas fa-bars" style={{ color: "grey" }}></i>
      </span>

      {/* </Button> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          style={{ backgroundColor: "#ffffff" }}
          onClick={() => {
            handleClickItemMenu("home-page");
          }}
        >
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage id="menu-homeheader.homepage" />}
          />
        </StyledMenuItem>
        {!isLoggedIn && (
          <>
            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("login");
              }}
            >
              <ListItemIcon>
                <VpnKeyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<FormattedMessage id="menu-homeheader.login" />}
              />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("forgot-password");
              }}
            >
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <FormattedMessage id="menu-homeheader.forgot-password" />
                }
              />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("sign-up");
              }}
            >
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<FormattedMessage id="menu-homeheader.sign-up" />}
              />
            </StyledMenuItem>
          </>
        )}
        {isLoggedIn && (
          <>
            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("user/profile-setting");
              }}
            >
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<FormattedMessage id="menu-homeheader.profile" />}
              />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("logout");
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<FormattedMessage id="menu-homeheader.logout" />}
              />
            </StyledMenuItem>
          </>
        )}
      </StyledMenu>
    </div>
  );
};

export default MenuHomeHeader;
