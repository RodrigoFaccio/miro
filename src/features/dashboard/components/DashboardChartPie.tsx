import { formatCurrency } from "@/features/common/utils/formatters";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import Chart from "react-apexcharts";

type DashboardChartProps = {
  title: string;
  subtitle?: string;
  palette?: string;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

const DashboardChartPie: React.FC<DashboardChartProps> = ({
  title,
  subtitle,
  palette = "palette1",
  data,
}) => {
  const { colorMode } = useColorMode();

  const options: ApexOptions = useMemo(
    () => ({
      series: data.map((item) => item.value),
      chart: {
        type: "pie",
      },
      labels: data.map((item) => item.name),
      colors: data.map((item) => item.color),
      theme: {
        palette,
        mode: colorMode,
      },
      legend: {
        show: true,
        position: "bottom",
        formatter: (seriesName, opts) => {
          return `${seriesName} - ${formatCurrency(
            data[opts.seriesIndex].value
          )}`;
        },
      },
    }),
    [data, palette, colorMode]
  );

  const empty = useMemo(
    () => data.length === 0 || data.every((item) => item.value === 0),
    [data]
  );

  return (
    <Card
      p={2}
      rounded="xl"
      bg={useColorModeValue("white", "gray.800")}
      h="100%"
      w="100%"
      position="relative"
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
          <Text fontSize="xs" fontWeight="medium" color="gray.700" mt={2}>
            {subtitle}
          </Text>
        )}
      </CardHeader>
      {empty ? (
        <Center h="full" w="full" position="absolute">
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Sem dados
          </Text>
        </Center>
      ) : (
        <CardBody>
          <Box
            sx={{
              "& .apexcharts-svg": { background: "transparent !important" },
            }}
            w="100%"
            h="100%"
            position="relative"
          >
            <Chart
              options={options}
              series={options.series}
              type="pie"
              width="100%"
              height="100%"
            />
          </Box>
        </CardBody>
      )}
    </Card>
  );
};

export default DashboardChartPie;
