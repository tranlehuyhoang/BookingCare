import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../../components/charts";

import React, { useState, useEffect } from "react";
import { getTopFourVipPatient } from "../../../../../services/userService";
import { FormattedMessage } from 'react-intl';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

// const CHART_DATA = [4344, 5435, 1443, 4443];

export default function AppTopFourVipPatient() {
  const theme = useTheme();

  var chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    // labels: ["A", "B", "C", "D"],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName} $`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  const [fourVipPatient, setFourVipPatient] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartOptionsState, setChartOptionsState] = useState({});

  useEffect(() => {
    let fetchTopFourVipPatient = async () => {
      let res = await getTopFourVipPatient();
      if (res && res.errCode === 0) {
        if (res.data && res.data.invoices) {
          setFourVipPatient(res.data.invoices);
        }
      }
    };
    fetchTopFourVipPatient();
  }, []);

  useEffect(() => {
    let CHART_DATA = [];
    let LABELS_DATA = [];
    if (fourVipPatient.length !== 0) {
      fourVipPatient.map((item) => {
        let name = `${item.patientDataInvoice.lastName} ${item.patientDataInvoice.firstName}`;
        CHART_DATA.push(parseInt(item.total_revenue));
        LABELS_DATA.push(name);
      });

      if (CHART_DATA) {
        setChartData(CHART_DATA);
      }
      if (LABELS_DATA) {
        chartOptions.labels = LABELS_DATA;
        setChartOptionsState(chartOptions);
      }
    }
  }, [fourVipPatient]);

  return (
    <Card>
      <CardHeader title={<FormattedMessage id={"admin-dashboard.dashboard.top-4-vip-patients"} />} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartData}
          options={chartOptionsState}
          height={280}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
