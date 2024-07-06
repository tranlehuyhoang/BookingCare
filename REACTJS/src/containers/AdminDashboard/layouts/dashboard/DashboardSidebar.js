import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-domv6";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mocks_
import account from "../../_mocks_/account";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
//


import sidebarConfig from "./SidebarConfig";
import sidebarConfigVi from "./sidebarConfigVi";

import sidebarConfigDoctor from "./SidebarConfigDoctor";
import SidebarConfigDoctorVi from "./SidebarConfigDoctorVi";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { USER_ROLE, USER_POSITION } from "../../../../utils";
// ----------------------------------------------------------------------


const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const [userInfoState, setUserInfoState] = useState({});
  const [imageBase64State, setImageBase64State] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    setUserInfoState(userInfo);
    let imageBase64 = "";
    if (userInfo && userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      setImageBase64State(imageBase64);
    }

    //name
    let nameCopy = "";
    if (userInfo && userInfo.lastName && userInfo.firstName) {
      nameCopy = `${userInfo.lastName} ${userInfo.firstName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName && userInfo.firstName === null) {
      nameCopy = `${userInfo.lastName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName === null && userInfo.firstName) {
      nameCopy = `${userInfo.firstName}`;
      setName(nameCopy);
    }

    //role
    if (userInfo && userInfo.roleId && userInfo.roleId === USER_ROLE.ADMIN) {
      setRole("ADMIN");
    }
    if (userInfo && userInfo.roleId && userInfo.roleId === USER_ROLE.DOCTOR) {
      setRole("DOCTOR");
    }
    if (
      userInfo &&
      userInfo.roleId &&
      userInfo.roleId !== USER_ROLE.DOCTOR &&
      userInfo.roleId !== USER_ROLE.ADMIN
    ) {
      setRole("");
    }
  }, []);

  useEffect(() => {
    setUserInfoState(userInfo);
    let imageBase64 = "";
    if (userInfo && userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      setImageBase64State(imageBase64);
    }

    //name
    let nameCopy = "";
    if (userInfo && userInfo.lastName && userInfo.firstName) {
      nameCopy = `${userInfo.lastName} ${userInfo.firstName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName && userInfo.firstName === null) {
      nameCopy = `${userInfo.lastName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName === null && userInfo.firstName) {
      nameCopy = `${userInfo.firstName}`;
      setName(nameCopy);
    }

    //role
    if (userInfo && userInfo.roleId && userInfo.roleId === USER_ROLE.ADMIN) {
      setRole("ADMIN");
    }
    if (userInfo && userInfo.roleId && userInfo.roleId === USER_ROLE.DOCTOR) {
      setRole("DOCTOR");
    }
    if (
      userInfo &&
      userInfo.roleId &&
      userInfo.roleId !== USER_ROLE.DOCTOR &&
      userInfo.roleId !== USER_ROLE.ADMIN
    ) {
      setRole("");
    }
  }, [userInfo]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar
              src={imageBase64State ? imageBase64State : account.photoURL}
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {(role && language=="en") ? role : ""}
                {(role && language=="vi" && role=="ADMIN") ? "QUẢN TRỊ VIÊN" : ""}
                {(role && language=="vi" && role=="DOCTOR") ? "BÁC SĨ" : ""}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      {/* sidebar admin */}
      {userInfoState && userInfoState.roleId === USER_ROLE.ADMIN && language=="vi" && (
        <NavSection navConfig={sidebarConfigVi} />
      )}
      {userInfoState && userInfoState.roleId === USER_ROLE.ADMIN && language=="en" && (
        <NavSection navConfig={sidebarConfig} />
      )}


      {/* sidebar doctor */}
      {userInfoState && userInfoState.roleId === USER_ROLE.DOCTOR && language=="vi" &&  (
        <NavSection navConfig={SidebarConfigDoctorVi} />
      )}
      {userInfoState && userInfoState.roleId === USER_ROLE.DOCTOR && language=="en" && (
        <NavSection navConfig={sidebarConfigDoctor} />
      )}
     

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
