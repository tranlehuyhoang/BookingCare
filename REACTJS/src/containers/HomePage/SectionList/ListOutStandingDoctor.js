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
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "react-redux";
// import { LANGUAGES } from "../../utils";
// import { changeLanguageApp } from "../../store/actions/appActions";
// import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Divider from "@material-ui/core/Divider";
import "./ListOutStandingDoctor.scss";

const useStyles = makeStyles((theme) => ({
  menuTitle: {
    color: "#3c3c3c",
    fontSize: "20px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: "600",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontWeight: "600",
  },
  // bgImageListSpecialty: {
  //   width: "75px",
  //   height: "75px",
  //   boderRadius: "50%",
  //   backgroundPosition: "center center",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   margin: "0 10px"
  // },
  listName: {
    marginLeft: "10px",
    fontSize: "14px",
    color: "#333",
    fontWeight: "600",
  },
  listSpecialtyName: {
    marginLeft: "10px",
    fontSize: "14px",
    color: "#333",
  },
}));

const ListOutStandingDoctor = () => {
  const classes = useStyles();
  const [arrDoctors, setArrDoctors] = useState([]);

  const allDoctors = useSelector((state) => state.admin.allDoctors);
  const language = useSelector((state) => state.app.language);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllDoctors());
  }, []);
  useEffect(() => {
    setArrDoctors(allDoctors);
  }, [allDoctors]);

  let history = useHistory();

  const handleViewDetailDoctor = (doctor) => {
    history.push(`/detail-doctor/${doctor.id}`);
  };
  const handleOnClickBackHome = () => (event) => {
    // history.goBack
    history.push(`/home`);
  };
  return (
    <div className="list-doctor-container">
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
              {language == "en" ? "All doctor" : "Tất cả bác sĩ"}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="list-doctor-content">
        <Paper className="content">
          <MenuList id="long-menu" className="menu-content">
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer.from(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="container"
                    key={index}
                    onClick={() => handleViewDetailDoctor(item)}
                  >
                    <MenuItem className="list-content">
                      <ListItemIcon>
                        <div
                          className="bgImageListSpecialty"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        ></div>
                      </ListItemIcon>
                      <div className={classes.content}>
                        <Typography
                          variant="inherit"
                          className={classes.listName}
                        >
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </Typography>
                        <br></br>
                        <Typography
                          variant="inherit"
                          className={classes.listSpecialtyName}
                        >
                          {item.Doctor_Infor &&
                          item.Doctor_Infor.specialtyData &&
                          item.Doctor_Infor.specialtyData.name
                            ? item.Doctor_Infor.specialtyData.name
                            : ""}
                        </Typography>
                      </div>
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

export default ListOutStandingDoctor;
