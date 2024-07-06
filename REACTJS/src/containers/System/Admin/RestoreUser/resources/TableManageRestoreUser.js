import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageRestoreUser.scss";
import * as actions from "../../../../../store/actions";

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
import Label from "../../../../../containers/AdminDashboard/components/Label";
import Scrollbar from "../../../../../containers/AdminDashboard/components/Scrollbar";
import { UserListHead } from "../../../../../containers/AdminDashboard/sections/@dashboard/user";

import { USER_ROLE, USER_POSITION } from "../../../../../utils";
import { sentenceCase } from "change-case";

import { withRouter } from "../../../../../utils/withRouter"; //navigate

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "academicDegree", label: "Academic Degree", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const TABLE_HEAD_VI = [
  { id: "name", label: "Tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Vai trò", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "academicDegree", label: "Học vị", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "" },
];
class TableManageRestoreUser extends Component {
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
    // {positionId === USER_POSITION.BACHELOR
    //   ? "Cử nhân"
    //   : positionId === USER_POSITION.MASTER
    //   ? "Thạc sĩ"
    //   : positionId === USER_POSITION.DOCTOR
    //   ? "Tiến sĩ"
    //   : positionId === USER_POSITION.ASSOCIATE_PROFESSOR
    //   ? "Phó giáo sư"
    //   : positionId === USER_POSITION.PROFESSOR
    //   ? "Giáo sư"
    //   : "None"}
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
        {/* <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditUser(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={language == "vi" ? TABLE_HEAD_VI : TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  // rowCount={USERLIST.length}
                  // numSelected={selected.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
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
                        {/* <TableCell padding="checkbox">
                            <Checkbox
                              // checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell> */}
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={firstName} src={imageBase64} />
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

                        {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell> */}
                        {/* <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "banned" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell> */}

                        <TableCell align="right">
                          <button
                            className="btn-edit"
                            style={{ minWidth: "58px" }}
                            onClick={() =>
                              this.props.handleRestoreUserByEmail(email)
                            }
                          >
                            {this.props.language == "vi"
                              ? "Khôi phục"
                              : "Restore"}
                          </button>
                          {/* <button
                            className="btn-delete"
                            onClick={() => this.props.handleDeleteRestoreUser(email)}
                          >
                            <i className="fas fa-trash"></i>
                          </button> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
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
  connect(mapStateToProps, mapDispatchToProps)(TableManageRestoreUser)
);
