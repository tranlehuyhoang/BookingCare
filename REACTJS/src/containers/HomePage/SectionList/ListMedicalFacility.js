import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { connect } from "react-redux";
// import { LANGUAGES } from "../../utils";
// import { changeLanguageApp } from "../../store/actions/appActions";
// import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../../store/actions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Divider from "@material-ui/core/Divider";
import { getAllClinic } from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import "./ListMedicalFacility.scss";

const useStyles = makeStyles((theme) => ({
  menuTitle: {
    color: "#3c3c3c",
    fontSize: "16px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: "600",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontWeight: "600",
  },
  bgImageListSpecialty: {
    width: "120px",
    height: "75px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    margin: "0 10px",
  },
  listSpecialtyName: {
    marginLeft: "10px",
    fontSize: "14px",
    color: "#333",
    fontWeight: "600",
  },
}));

const ListMedicalFacility = () => {
  const classes = useStyles();
  const [dataClinics, setDataClinics] = useState([]);

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  useEffect(() => {
    const fetchDataAllClinic = async () => {
      let res = await getAllClinic({});
      if (res && res.data) {
        setDataClinics(res.data ? res.data : []);
      }
    };
    fetchDataAllClinic();
  }, []);

  let history = useHistory();

  const handleViewDetailClinic = (clinic) => {
    history.push(`/detail-clinic/${clinic.id}`);
  };
  const handleOnClickBackHome = () => (event) => {
    history.push(`/home`);
  };
  return (
    <div className="list-medical-acility-container">
      <div className="toolbar">
        <AppBar className="toolbar">
          <Toolbar variant="dense" className="toolbar-title container">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleOnClickBackHome()}
              aria-label="menu"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h5" className={classes.menuTitle}>
              {language == "en"
                ? "Hospitals, medical facilities"
                : "Bệnh viện, cơ sở y tế"}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="list-medical-acility-content">
        <Paper className="content">
          <MenuList id="long-menu" className="menu-content">
            {dataClinics &&
              dataClinics.length > 0 &&
              dataClinics.map((item, index) => {
                return (
                  <div
                    className="container"
                    key={index}
                    onClick={() => handleViewDetailClinic(item)}
                  >
                    <MenuItem className="list-content">
                      <ListItemIcon>
                        <div
                          className={classes.bgImageListSpecialty}
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        ></div>
                      </ListItemIcon>
                      <Typography
                        variant="inherit"
                        className="listSpecialtyName"
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                    <Divider />
                  </div>
                );
              })}
          </MenuList>
        </Paper>
      </div>
    </div>
  );
};

export default ListMedicalFacility;
