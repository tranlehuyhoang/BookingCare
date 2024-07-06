import { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
// ----------------------------------------------------------------------

import * as actions from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const LANGS = [
  {
    value: "us",
    label: "English",
    icon: "/static/icons/ic_flag_us.svg",
    language: "en",
  },
  {
    value: "vn",
    label: "VietNam",
    icon: "/static/icons/ic_flag_vn.svg",
    language: "vi",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLanguage = (language) => {
    dispatch(actions.changeLanguageApp(language));
    handleClose();
  };

  const handleSetIconFlag = () => {
    let found = LANGS.find((element) => element.language == language);
    return found.icon ? found.icon : "/static/icons/ic_flag_us.svg";
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
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <img src={handleSetIconFlag()} alt={LANGS[0].label} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={() => changeLanguage(option.language)}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
