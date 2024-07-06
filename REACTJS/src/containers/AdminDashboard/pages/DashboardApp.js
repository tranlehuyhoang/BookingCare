// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppTotalDoctors,
  AppTotalHealthAppointmentDone,
  AppNewsUpdate,
  AppOrderTimeline,
  AppTopFourVipPatient,
  AppTopThreeDoctorsOfTheYear,
  AppTrafficBySite,
  AppCurrentSubject,
  AppMonthlyRevenueSpecialty,
} from "../sections/@dashboard/app";

import AppWeeklyRevenue from "../sections/@dashboard/app/AppWeeklyRevenue";
import { FormattedMessage } from "react-intl";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            <FormattedMessage id={"admin-dashboard.dashboard.greeting"} />
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklyRevenue />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalHealthAppointmentDone />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalDoctors />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTopThreeDoctorsOfTheYear />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopFourVipPatient />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppMonthlyRevenueSpecialty />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
