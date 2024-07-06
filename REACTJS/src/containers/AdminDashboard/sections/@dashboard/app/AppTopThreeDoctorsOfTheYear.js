import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../../components/charts";

import React, { useState, useEffect } from "react";
import { getTopThreeDoctorOfTheYear } from "../../../../../services/userService";
import { FormattedMessage } from 'react-intl';
// ----------------------------------------------------------------------

// var CHART_DATA = [
//   // {
//   //   name: "Team A",
//   //   type: "column",
//   //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//   // },
//   // {
//   //   name: "Team B",
//   //   type: "area",
//   //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//   // },
//   // {
//   //   name: "Team C",
//   //   type: "line",
//   //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//   // },
// ];

export default function AppTopThreeDoctorsOfTheYear() {
  const currentYear = new Date().getFullYear();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "12%", borderRadius: 4 } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: [
      `01/01/${currentYear}`,
      `02/01/${currentYear}`,
      `03/01/${currentYear}`,
      `04/01/${currentYear}`,
      `05/01/${currentYear}`,
      `06/01/${currentYear}`,
      `07/01/${currentYear}`,
      `08/01/${currentYear}`,
      `09/01/${currentYear}`,
      `10/01/${currentYear}`,
      `11/01/${currentYear}`,
      `12/01/${currentYear}`,
    ],
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} dolar`;
          }
          return y;
        },
      },
    },
  });

  const [dataThreeDoctor, setDataThreeDoctor] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    let fetchTopThreeDoctorOfTheYear = async () => {
      let res = await getTopThreeDoctorOfTheYear();
      if (res && res.errCode === 0) {
        setDataThreeDoctor(res.data.dataRevenueThreeDoctor);
      }
    };
    fetchTopThreeDoctorOfTheYear();
  }, []);

  useEffect(() => {
    let CHART_DATA = [];
    if (dataThreeDoctor.length !== 0) {
      dataThreeDoctor.map((item, index) => {
        let obj = {};
        let name = `${item.lastName} ${item.firstName}`;
        let data = [];
        let revenueMonth0 = parseInt(item.dataRevenue12Month.revenueMonth0);
        let revenueMonth1 = parseInt(item.dataRevenue12Month.revenueMonth1);
        let revenueMonth2 = parseInt(item.dataRevenue12Month.revenueMonth2);
        let revenueMonth3 = parseInt(item.dataRevenue12Month.revenueMonth3);
        let revenueMonth4 = parseInt(item.dataRevenue12Month.revenueMonth4);
        let revenueMonth5 = parseInt(item.dataRevenue12Month.revenueMonth5);
        let revenueMonth6 = parseInt(item.dataRevenue12Month.revenueMonth6);
        let revenueMonth7 = parseInt(item.dataRevenue12Month.revenueMonth7);
        let revenueMonth8 = parseInt(item.dataRevenue12Month.revenueMonth8);
        let revenueMonth9 = parseInt(item.dataRevenue12Month.revenueMonth9);
        let revenueMonth10 = parseInt(item.dataRevenue12Month.revenueMonth10);
        let revenueMonth11 = parseInt(item.dataRevenue12Month.revenueMonth11);
        data.push(revenueMonth11);
        data.push(revenueMonth0);
        data.push(revenueMonth1);
        data.push(revenueMonth2);
        data.push(revenueMonth3);
        data.push(revenueMonth4);
        data.push(revenueMonth5);
        data.push(revenueMonth6);
        data.push(revenueMonth7);
        data.push(revenueMonth8);
        data.push(revenueMonth9);
        data.push(revenueMonth10);

        obj.data = data;
        obj.name = name;
        if (index === 0) {
          obj.type = "column";
        }
        if (index === 1) {
          obj.type = "area";
        }
        if (index === 2) {
          obj.type = "line";
        }
        CHART_DATA.push(obj);
      });
    }
    if (CHART_DATA.length !== 0) {
      setChartData(CHART_DATA);
    }
  }, [dataThreeDoctor]);

  return (
    <Card>
      <CardHeader
        title={<FormattedMessage id={"admin-dashboard.dashboard.top-3-doctors-with-the-highest-revenue-of-the-year"} />}
        subheader={currentYear}
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {chartData.length !== 0 && (
          <ReactApexChart
            type="line"
            series={chartData}
            options={chartOptions}
            height={364}
          />
        )}
      </Box>
    </Card>
  );
}
