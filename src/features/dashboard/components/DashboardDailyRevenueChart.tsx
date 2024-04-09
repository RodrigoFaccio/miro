import { formatCurrency } from "@/features/common/utils/formatters";
import { SalesData } from "@/features/dashboard/types";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import ptbr from "apexcharts/dist/locales/pt-br.json";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import Chart from "react-apexcharts";

type DashboardDailyRevenueChartProps = {
  datetime: boolean;
  title: string;
  subtitle?: string;
  dailyRevenue: SalesData["dailyRevenue"];
};

const DashboardDailyRevenueChart: React.FC<DashboardDailyRevenueChartProps> = ({
  datetime,
  title,
  subtitle,
  dailyRevenue,
}) => {
  const chartRef = React.useRef<Chart | null>(null);

  const theme = useColorModeValue("light", "dark");

  const colors = useToken("colors", [
    "red.500",
    "blue.500",
    "green.500",
    "yellow.500",
    "orange.500",
  ]);

  const series = useMemo(
    () => [
      {
        name: "Cartão de Crédito",
        data: dailyRevenue?.map(({ date, creditCardAmount }) =>
          datetime
            ? [moment(date, "DD-MM-YYYY").toDate().getTime(), creditCardAmount]
            : creditCardAmount,
        ),
      },
      {
        name: "Boleto",
        data: dailyRevenue?.map(({ date, boletoAmount }) =>
          datetime
            ? [moment(date, "DD-MM-YYYY").toDate().getTime(), boletoAmount]
            : boletoAmount,
        ),
      },
      {
        name: "Pix",
        data: dailyRevenue?.map(({ date, pixAmount }) =>
          datetime
            ? [moment(date, "DD-MM-YYYY").toDate().getTime(), pixAmount]
            : pixAmount,
        ),
      },
      {
        name: "Chargeback",
        data: dailyRevenue?.map(({ date, chargebackAmount }) =>
          datetime
            ? [moment(date, "DD-MM-YYYY").toDate().getTime(), chargebackAmount]
            : chargebackAmount,
        ),
        selected: false,
      },
      {
        name: "Reembolso",
        data: dailyRevenue?.map(({ date, refundAmount }) =>
          datetime
            ? [moment(date, "DD-MM-YYYY").toDate().getTime(), refundAmount]
            : refundAmount,
        ),
      },
    ],
    [dailyRevenue, datetime],
  );

  const options: ApexOptions = useMemo(
    () => ({
      theme: {
        mode: theme,
      },
      chart: {
        defaultLocale: "pt-br",
        locales: [ptbr],
        type: "area",
      },
      colors,
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "0.75rem",
        },
        y: {
          formatter: formatCurrency,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        ...(datetime && {
          type: "datetime",
          tickAmount: 8,
        }),
        ...(!datetime && {
          type: "category",
          categories: dailyRevenue?.map(({ date }) => date),
        }),
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            fontSize: "0.65rem",
            colors: "#666666",
          },
          ...(datetime && {
            formatter: (timestamp) => moment(timestamp).format("DD MMM YYYY"),
          }),
        },
      },
    }),
    [colors, dailyRevenue, datetime, theme],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chartRef?.current?.chart.toggleSeries("Chargeback");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chartRef?.current?.chart.toggleSeries("Reembolso");
  });

  return (
    <Card
      p={2}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"xl"}
      w="100%"
      h="100%"
    >
      <CardHeader>
        <Text
          fontSize="sm"
          fontWeight="thin"
          color="gray.500"
          textTransform="uppercase"
        >
          {title}
        </Text>
        {subtitle && (
          <Text fontSize="xs" fontWeight="medium" color="gray.600" mt={2}>
            {subtitle}
          </Text>
        )}
      </CardHeader>
      <CardBody pt={0}>
        <Box
          sx={{
            "& .apexcharts-svg": { background: "transparent !important" },
          }}
          w="100%"
          h="100%"
        >
          <Chart
            ref={chartRef}
            options={options}
            series={series as unknown as ApexOptions["series"]}
            type="area"
            width="100%"
            height="100%"
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default DashboardDailyRevenueChart;
