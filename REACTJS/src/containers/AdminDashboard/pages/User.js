import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../../services/userService";

import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-domv6";
import { toast } from "react-toastify";
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
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
//
import USERLIST from "../_mocks_/user";

import { useDispatch, useSelector } from "react-redux";

import { USER_ROLE, USER_POSITION } from "../../../utils";
import ModalUser from "../../System/ModalUser";
import ModalEditUser from "../../System/ModalEditUser";
import { emitter } from "../../../utils/emitter";
import "./User.scss";

// ----------------------------------------------------------------------

//de data table head o day, doi array nay la duoc
const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "academicDegree", label: "Academic Degree", alignRight: false },
  { id: "" },
];

// const TABLE_HEAD = [
//   { id: "name", label: "Name", alignRight: false },
//   { id: "company", label: "Company", alignRight: false },
//   { id: "role", label: "Role", alignRight: false },
//   { id: "isVerified", label: "Verified", alignRight: false },
//   { id: "status", label: "Status", alignRight: false },
//   { id: "" },
// ];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //
  const [arrUsers, setArrUsers] = useState([]);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  useEffect(() => {
    getAllUsersFromReact();
  }, []);

  const getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      setArrUsers(response.users);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleAddNewUser = () => {
    setIsOpenModalUser(true);
  };
  const toggleUserModal = () => {
    setIsOpenModalUser(!isOpenModalUser);
  };

  const createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        if (language == "en") {
          toast.error("Create new user failed");
        } else {
          toast.error("Tạo người dùng thất bại");
        }
      } else {
        if (language == "en") {
          toast.success("Create new user succeed!");
        } else {
          toast.success("Thêm người dùng thành công!");
        }

        await getAllUsersFromReact();
        setIsOpenModalUser(false);
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" }); // cach truyen them data
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditUser = (user) => {
    setIsOpenModalEditUser(true);
    setUserEdit(user);
  };

  const toggleUserEditModal = () => {
    setIsOpenModalEditUser(!isOpenModalEditUser);
  };

  const doEditUser = async (user) => {
    console.log("user transport edit", user);
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        if (language == "en") {
          toast.success("Update user successfully!");
        } else {
          toast.success("Cập nhật người dùng thành công!");
        }
        setIsOpenModalEditUser(false);
        await getAllUsersFromReact();
      } else {
        if (language == "en") {
          toast.error("Update user failed");
        } else {
          toast.error("Cập nhật người dùng thất bại");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        if (language == "en") {
          toast.success("Delete user succeed!");
        } else {
          toast.success("Xóa người dùng thành công!");
        }
        await getAllUsersFromReact();
      } else {
        if (language == "en") {
          toast.error("Delete user failed!");
        } else {
          toast.error("Xóa người dùng thất bại!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => handleAddNewUser()}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {
                    // filteredUsers
                    //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //   .map((row) => {
                    //     const {
                    //       id,
                    //       name,
                    //       role,
                    //       status,
                    //       company,
                    //       avatarUrl,
                    //       isVerified,
                    //     } = row;
                    // const isItemSelected = selected.indexOf(name) !== -1;
                    arrUsers.map((row) => {
                      const {
                        address,
                        email,
                        firstName,
                        gender,
                        id,
                        image,
                        lastName,
                        phonenumber,
                        positionId,
                        roleId,
                        createdAt,
                      } = row;
                      let imageBase64 = "";
                      if (image) {
                        imageBase64 = new Buffer(image, "base64").toString(
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
                            {roleId === USER_ROLE.ADMIN ? (
                              <Label variant="ghost" color={"success"}>
                                {sentenceCase("ADMIN")}
                              </Label>
                            ) : roleId === USER_ROLE.DOCTOR ? (
                              <Label variant="ghost" color={"info"}>
                                {sentenceCase("DOCTOR")}
                              </Label>
                            ) : roleId === USER_ROLE.PATIENT ? (
                              <Label variant="ghost" color={"warning"}>
                                {sentenceCase("PATIENT")}
                              </Label>
                            ) : (
                              ""
                            )}
                          </TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">
                            {positionId === USER_POSITION.BACHELOR
                              ? "Cử nhân"
                              : positionId === USER_POSITION.MASTER
                              ? "Thạc sĩ"
                              : positionId === USER_POSITION.DOCTOR
                              ? "Tiến sĩ"
                              : positionId === USER_POSITION.ASSOCIATE_PROFESSOR
                              ? "Phó giáo sư"
                              : positionId === USER_POSITION.PROFESSOR
                              ? "Giáo sư"
                              : "None"}
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
                              onClick={() => handleEditUser(row)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(row)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <ModalUser
          isOpen={isOpenModalUser}
          toggleFromParent={toggleUserModal}
          createNewUser={createNewUser}
        />
        {isOpenModalEditUser && (
          <ModalEditUser
            isOpen={isOpenModalEditUser}
            toggleFromParent={toggleUserEditModal}
            currentUser={userEdit}
            editUser={doEditUser}
          />
        )}
      </Container>
    </Page>
  );
}
