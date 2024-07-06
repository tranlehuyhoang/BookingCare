import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box, Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../../components/charts";

import React, { useState, useEffect } from "react";
import { getMonthlyRevenueSpecialty } from "../../../../../services/userService";
import { FormattedMessage } from 'react-intl';
// ----------------------------------------------------------------------

// const CHART_DATA = [
//   { data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] },
// ];

export default function AppMonthlyRevenueSpecialty() {
  var chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName} $`,
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      // categories: [
      //   "Italy",
      //   "Japan",
      //   "China",
      //   "Canada",
      //   "France",
      //   "Germany",
      //   "South Korea",
      //   "Netherlands",
      //   "United States",
      //   "United Kingdom",
      // ],
    },
  });

  const [dataMonthRevenueSpecialty, setDataMonthRevenueSpecialty] = useState(
    []
  );
  const [chartData, setChartData] = useState([]);
  const [chartOptionsState, setChartOptionsState] = useState({});

  useEffect(() => {
    let fetchMonthlyRevenueSpecialty = async () => {
      let res = await getMonthlyRevenueSpecialty();
      if (res && res.errCode === 0) {
        if (res.data) {
          setDataMonthRevenueSpecialty(res.data);
        }
      }
    };
    fetchMonthlyRevenueSpecialty();
  }, []);

  useEffect(() => {
    let CHART_DATA = [];
    let arr = [];
    let arrCategories = [];
    let obj = {};
    dataMonthRevenueSpecialty.map((item) => {
      arr.push(parseInt(item.totalRevenueMonth));
      arrCategories.push(item.name);
    });
    if (arr.length !== 0) {
      obj.data = arr;
    }
    if (Object.keys(obj).length !== 0) {
      CHART_DATA.push(obj);
    }
    if (CHART_DATA.length !== 0) {
      setChartData(CHART_DATA);
    }
    if (arrCategories) {
      chartOptions.xaxis.categories = arrCategories;

      if (chartOptions.xaxis.categories) {
        setChartOptionsState(chartOptions);
      }
    }
  }, [dataMonthRevenueSpecialty]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let currentMonth = month[d.getMonth()];

  return (
    <Card>
      <CardHeader title={<FormattedMessage id={"admin-dashboard.dashboard.monthly-revenue-specialty"} />} subheader={currentMonth} />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={chartData}
          options={chartOptionsState}
          height={364}
        />
      </Box>
    </Card>
  );
}
