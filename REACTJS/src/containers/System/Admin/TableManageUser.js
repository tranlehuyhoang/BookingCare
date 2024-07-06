import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../../../containers/AdminDashboard/components/Page";
import Label from "../../../containers/AdminDashboard/components/Label";
import Scrollbar from "../../../containers/AdminDashboard/components/Scrollbar";
import Iconify from "../../../containers/AdminDashboard/components/Iconify";
import SearchNotFound from "../../../containers/AdminDashboard/components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../../containers/AdminDashboard/sections/@dashboard/user";
import { USER_ROLE, USER_POSITION } from "../../../utils";
import { sentenceCase } from "change-case";
import { withRouter } from "../../../utils/withRouter"; //navigate
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

const TABLE_HEAD = [
  { id: "image", label: "Image", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "academicDegree", label: "Academic Degree", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const TABLE_HEAD_VI = [
  { id: "image", label: "Ảnh", alignRight: false },
  { id: "name", label: "Tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Vai trò", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "academicDegree", label: "Học vị", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "" },
];
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    if (this.props.listFilterUsers) {
      this.setState({
        usersRedux: this.props.listFilterUsers,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listFilterUsers !== this.props.listFilterUsers) {
      this.setState({
        usersRedux: this.props.listFilterUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
    window.location.reload(false);
  };

  handleEditUser = (user) => {
    console.log("user", user);
    this.props.navigate("/admin-dashboard/user/edit/" + user.id);
  };

  getValueRole = (roleId) => {
    let language = this.props.language;
    switch (roleId) {
      case USER_ROLE.ADMIN:
        if (language == "en")
          return (
            <Label variant="ghost" color={"success"}>
              {sentenceCase("ADMIN")}
            </Label>
          );
        else
          return (
            <Label variant="ghost" color={"success"}>
              {"Quản trị viên"}
            </Label>
          );
        break;
      case USER_ROLE.DOCTOR:
        if (language == "en")
          return (
            <Label variant="ghost" color={"info"}>
              {sentenceCase("DOCTOR")}
            </Label>
          );
        else
          return (
            <Label variant="ghost" color={"info"}>
              {"Bác sĩ"}
            </Label>
          );
        break;
      case USER_ROLE.PATIENT:
        if (language == "en")
          return (
            <Label variant="ghost" color={"warning"}>
              {sentenceCase("PATIENT")}
            </Label>
          );
        else
          return (
            <Label variant="ghost" color={"warning"}>
              {"Bệnh nhân"}
            </Label>
          );
        break;
      default:
        return "";
    }
  };

  getValuePosition = (positionId) => {
    let language = this.props.language;
    switch (positionId) {
      case USER_POSITION.BACHELOR:
        if (language == "en") return "Bachelor";
        else return "Bác sĩ";
        break;
      case USER_POSITION.MASTER:
        if (language == "en") return "Master";
        else return "Thạc sĩ";
        break;
      case USER_POSITION.DOCTOR:
        if (language == "en") return "Doctor";
        else return "Tiến sĩ";
        break;
      case USER_POSITION.ASSOCIATE_PROFESSOR:
        if (language == "en") return "Associate professor";
        else return "Phó giáo sư";
        break;
      case USER_POSITION.PROFESSOR:
        if (language == "en") return "Professor";
        else return "Giáo sư";
        break;
      default:
        return "";
        break;
    }
  };

  getStatus = (statusId) => {
    let language = this.props.language;
    switch (statusId) {
      case 0:
        if (language == "en")
          return (
            <Label variant="ghost" color={"success"}>
              {sentenceCase("ACTIVE")}
            </Label>
          );
        else
          return (
            <Label variant="ghost" color={"success"}>
              {"Hoạt động"}
            </Label>
          );
      case 1:
        if (language == "en")
          return (
            <Label variant="ghost" color={"info"}>
              {sentenceCase("BANNED")}
            </Label>
          );
        else
          return (
            <Label variant="ghost" color={"info"}>
              {"Cấm"}
            </Label>
          );
      default:
        return "";
    }
  };

  render() {
    let arrUsers = this.state.usersRedux;
    let language = this.props.language;
    console.log("arrUsers", arrUsers);
    return (
      <React.Fragment>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={language == "vi" ? TABLE_HEAD_VI : TABLE_HEAD}
                />
                <TableBody>
                  {arrUsers.map((row) => {
                    const {
                      address,
                      email,
                      firstName,
                      gender,
                      id,
                      image,
                      lastName,
                      phoneNumber,
                      positionId,
                      roleId,
                      status,
                      createdAt,
                    } = row;
                    let imageBase64 = "";
                    if (image) {
                      imageBase64 = new Buffer.from(image, "base64").toString(
                        "binary"
                      );
                    }
                    let name = "";
                    if (lastName !== null && firstName != null) {
                      name = `${lastName} ${firstName}`;
                    }
                    if (lastName !== null && firstName == null) {
                      name = `${lastName}`;
                    }
                    if (lastName == null && firstName !== null) {
                      name = `${firstName}`;
                    }

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                      >
                        <TableCell align="left">
                          <Avatar src={imageBase64} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          {this.getValueRole(roleId)}
                        </TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">
                          {this.getValuePosition(positionId)}
                        </TableCell>
                        <TableCell align="left">
                          {this.getStatus(status)}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(row)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(row)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableManageUser)
);
