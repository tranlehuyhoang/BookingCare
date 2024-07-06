import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-domv6";
// material
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./Logo.scss";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  let history = useHistory();

  return (
    <div class="pointer logo-avatar" style={{width:"48px",height:"48px"}} onClick={()=> history.push("/home")}></div>
      // <Box
      //     onClick={()=> history.push("/home")}
      //     component="img"
      //     style={{cursor:'pointer'}}
      //     src="/static/media/logo.2e2d78c9.svg"
      //     sx={{ width: 180, height: 30, ...sx }}
      // />
  );
}
