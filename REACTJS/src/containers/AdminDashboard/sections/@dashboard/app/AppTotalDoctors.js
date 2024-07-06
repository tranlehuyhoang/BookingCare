// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
//
import Iconify from "../../../components/Iconify";
import React, { useState, useEffect } from "react";
import { getTotalDoctors } from "../../../../../services/userService";
import { FormattedMessage } from 'react-intl';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.error.dark,
    0
  )} 0%, ${alpha(theme.palette.error.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 234;

export default function AppTotalDoctors() {
  const [totalDoctors, setTotalDoctors] = useState(0);
  useEffect(() => {
    let fetchTotalDoctors = async () => {
      let res = await getTotalDoctors();
      if (res && res.errCode === 0) {
        let total = res.data.totalDoctors;
        if (total) {
          setTotalDoctors(total);
        }
      }
    };
    fetchTotalDoctors();
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="wpf:medical-doctor" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(totalDoctors)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <FormattedMessage id={"admin-dashboard.dashboard.total-doctors"} />
      </Typography>
    </RootStyle>
  );
}
