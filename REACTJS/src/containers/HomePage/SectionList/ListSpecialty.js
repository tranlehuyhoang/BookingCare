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
import { getAllSpecialty } from "../../../services/userService";
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
import { useDispatch, useSelector } from "react-redux";
import "./ListSpecialty.scss";

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
  },
  bgImageListSpecialty: {
    width: "120px",
    height: "75px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    margin: "0 10px",
  },
  listSpecialtyName: {
    marginLeft: "10px",
    fontSize: "14px",
    color: "#333",
    fontWeight: "600",
  },
}));

const ListSpecialty = () => {
  const classes = useStyles();
  const [dataSpecialty, setDataSpecialty] = useState([]);

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  useEffect(() => {
    console.log("hi specialty");
    const fetchAllSpecialty = async () => {
      let res = await getAllSpecialty({});
      if (res && res.errCode === 0) {
        console.log("res", res.data);
        setDataSpecialty(res.data ? res.data : []);
      }
    };
    fetchAllSpecialty();
  }, []);

  let history = useHistory();

  const handleViewDetailSpecialty = (item) => {
    history.push(`/detail-specialty/${item.id}`);
  };
  const handleOnClickBackHome = () => (event) => {
    history.push(`/home`);
  };
  return (
    <div className="list-specialty-container">
      <div className="toolbar">
        <AppBar className="toolbar">
          <Toolbar variant="dense" className="toolbar-title container">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleOnClickBackHome()}
              aria-label="menu"
            >
              <KeyboardBackspaceIcon className={classes.menuIcon} />
            </IconButton>
            <Typography variant="h5" className={classes.menuTitle}>
              {language == "en" ? "All specialty" : "Tất cả chuyên khoa"}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="list-specialty-content">
        <Paper className="content">
          <MenuList id="long-menu" className="menu-content">
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div
                    className="container"
                    key={index}
                    onClick={() => handleViewDetailSpecialty(item)}
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
                        className={classes.listSpecialtyName}
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

export default ListSpecialty;
