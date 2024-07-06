import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-domv6";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import Iconify from "../../components/Iconify";
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLE, USER_POSITION } from "../../../../utils";
import { useHistory } from "react-router-dom";
import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "/",
  },
];

const MENU_OPTIONS_VI = [
  {
    label: "Trang chủ",
    icon: "eva:home-fill",
    linkTo: "/",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));
  const [imageBase64State, setImageBase64State] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let imageBase64 = "";
    if (userInfo && userInfo.image) {
      imageBase64 = new Buffer.from(userInfo.image, "base64").toString(
        "binary"
      );
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

    //email
    if (userInfo && userInfo.email) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigateToHome = () => {
    handleClose();
    history.push("/home");
  };
  const handleLogout = () => {
    history.push("/logout");
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          src={imageBase64State ? imageBase64State : account.photoURL}
          alt="photoURL"
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {name ? name : account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email ? email : account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {language == "en"
          ? MENU_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                to={option.linkTo}
                // component={}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
                onClick={() => handleNavigateToHome()}
              >
                <Iconify
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24,
                  }}
                />

                {option.label}
              </MenuItem>
            ))
          : MENU_OPTIONS_VI.map((option) => (
              <MenuItem
                key={option.label}
                to={option.linkTo}
                // component={}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
                onClick={() => handleNavigateToHome()}
              >
                <Iconify
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24,
                  }}
                />

                {option.label}
              </MenuItem>
            ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => handleLogout()}
          >
            <FormattedMessage id={"menu-homeheader.logout"} />
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
