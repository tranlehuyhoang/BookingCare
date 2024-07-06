// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// component
import Iconify from "../../../components/Iconify";
import React, { useState, useEffect } from "react";
import { getWeeklyRevenue } from "../../../../../services/userService";
import { FormattedMessage } from "react-intl";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

const AppWeeklyRevenue = () => {
  const [totalWeeklyRevenue, setTotalWeeklyRevenue] = useState(0);
  useEffect(() => {
    let fetchTotalWeeklyRevenue = async () => {
      let res = await getWeeklyRevenue();
      if (res && res.errCode === 0) {
        let total = res.data.totalWeeklyRevenue;
        if (total) {
          setTotalWeeklyRevenue(total);
        }
      }
    };
    fetchTotalWeeklyRevenue();
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify
          icon="flat-color-icons:sales-performance"
          width={24}
          height={24}
        />
      </IconWrapperStyle>
      <Typography variant="h3">
        ${fShortenNumber(totalWeeklyRevenue)}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <FormattedMessage id={"admin-dashboard.dashboard.weekly-revenue"} />
      </Typography>
    </RootStyle>
  );
};
export default AppWeeklyRevenue;
