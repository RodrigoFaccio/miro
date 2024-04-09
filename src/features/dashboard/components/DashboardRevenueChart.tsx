import { formatCurrency } from "@/features/common/utils/formatters";
import { SalesData } from "@/features/dashboard/types";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  useColorMode,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import Chart from "react-apexcharts";

type Props = {
  title: string;
  subtitle?: string;
  creditCard: SalesData["creditCard"];
  boleto: SalesData["boleto"];
  pix: SalesData["pix"];
};

const DashboardRevenueChart: React.FC<Props> = ({
  title,
  subtitle,
  creditCard,
  boleto,
  pix,
}) => {
  const { colorMode } = useColorMode();

  const [gray, red, blue, green] = useToken("colors", [
    "gray.500",
    "red.500",
    "blue.500",
    "green.500",
  ]);

  const series = useMemo(
    () => [
      {
        name: "Faturamento",
        data: [creditCard.revenue || 0, boleto.revenue || 0, pix.revenue || 0],
        color: blue,
      },
      {
        name: "Taxas",
        data: [creditCard.fee || 0, boleto.fee || 0, pix.fee || 0],
        color: red,
      },
      {
        name: "Lucro líquido",
        data: [creditCard.profit || 0, boleto.profit || 0, pix.profit || 0],
        color: green,
      },
    ],
    [blue, green, red, creditCard, boleto, pix]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          endingShape: "rounded",
          borderRadiusApplication: "end",
          borderRadius: 3,
          dataLabels: {
            position: "center",
          },
        },
      },
      theme: {
        mode: colorMode,
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
        formatter: formatCurrency,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Cartão de crédito", "Boleto", "Pix"],
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: gray,
            fontSize: "0.65rem",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: formatCurrency,
        },
      },
    }),
    [colorMode, gray]
  );

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
      <CardBody pt={0} px={0}>
        <Box
          sx={{
            "& .apexcharts-svg": { background: "transparent !important" },
          }}
          w="100%"
          h="100%"
        >
          <Chart
            options={options}
            series={series as unknown as ApexOptions["series"]}
            type="bar"
            width="100%"
            height="100%"
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default DashboardRevenueChart;
