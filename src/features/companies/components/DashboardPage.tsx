import PeriodInput, {
  Period,
} from "@/features/common/components/dates/PeriodInput";
import { formatCurrency } from "@/features/common/utils/formatters";
import { useLoading } from "@/features/companies/hooks/LoadingCompany";
import DashboardChartPie from "@/features/dashboard/components/DashboardChartPie";
import DashboardAreaChart from "@/features/dashboard/components/DashboardDailyRevenueChart";
import DashboardRevenueChart from "@/features/dashboard/components/DashboardRevenueChart";
import DashboardStatWidget from "@/features/dashboard/components/DashboardStatWidget";
import { RevenueCard } from "@/features/dashboard/components/RenevueCard";
import { getDashboardData } from "@/features/dashboard/services";
import { SalesData } from "@/features/dashboard/types";
import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  useToken,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { BsBank2, BsCreditCard } from "react-icons/bs";
import { FaBarcode, FaBuildingCircleCheck, FaPix } from "react-icons/fa6";
import { IoIosPricetags, IoMdCash } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { useParams } from "react-router-dom";

const DashboardPage = () => {
  const { setLoading } = useLoading();

  const [period, setPeriod] = useState(Period.LAST_7_DAYS);
  const { id } = useParams();
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: moment().subtract(7, "days").toDate(),
    endDate: moment().toDate(),
  });

  const { data, isFetching } = useQuery({
    queryKey: ["dashboard", dates, id],
    queryFn: () => getDashboardData(dates, Number(id)),
    
  });
 if(data){
  setLoading(true)
 }
  

  return (
    <>
      <Grid w="100%" justifyContent="end" alignItems="end" maxW="100%">
        <PeriodInput
          value={{
            period,
            startDate: dates.startDate,
            endDate: dates.endDate,
          }}
          onChange={({ period, startDate, endDate }) => {
            setPeriod(period);
            setDates({
              startDate,
              endDate,
            });
          }}
        />
      </Grid>
      <Stack spacing={5}>
        <SimpleGrid
          columns={
            useBreakpointValue({
              base: 1,
              lg: 3,
            }) as number
          }
          spacing={5}
        >
          {/* <DashboardStatWidget
            title="Total de vendas"
            stat={formatCurrency(data?.totalSalesAmount ?? 0)}
            icon={IoMdCash}
            color="primary.500"
          /> */}
          <DashboardStatWidget
            title="Pedidos pagos"
            stat={formatCurrency(data?.paidSalesAmount ?? 0)}
            icon={IoCart}
            color="primary.500"
          />
          <DashboardStatWidget
            title="Ticket médio"
            stat={formatCurrency(data?.averageTicket ?? 0)}
            icon={IoIosPricetags}
            color="primary.500"
          />
        </SimpleGrid>
        <SimpleGrid
          columns={
            useBreakpointValue({
              base: 1,
              lg: 3,
            }) as number
          }
          spacing={5}
        >
          <DashboardStatWidget
            title="Vendas no Cartão de Crédito"
            // subtitle={
            //   <>
            //     Volume total:{" "}
            //     <strong>{formatCurrency(data?.creditCard.amount || 0)}</strong>
            //   </>
            // }
            stat={formatCurrency(data?.creditCard.paidAmount || 0)}
            color={"red.400"}
            tag={`${data?.creditCard.count || 0} vendas`}
            icon={BsCreditCard}
          />
          <DashboardStatWidget
            title="Vendas no Boleto"
            // subtitle={
            //   <>
            //     Volume total:{" "}
            //     <strong>{formatCurrency(data?.boleto.amount || 0)}</strong>
            //   </>
            // }
            stat={formatCurrency(data?.boleto.paidAmount || 0)}
            color={"blue.400"}
            tag={`${data?.boleto.count || 0} vendas`}
            icon={FaBarcode}
          />
          <DashboardStatWidget
            title="Vendas no Pix"
            // subtitle={
            //   <>
            //     Volume total:{" "}
            //     <strong>{formatCurrency(data?.pix.amount || 0)}</strong>
            //   </>
            // }
            stat={formatCurrency(data?.pix.paidAmount || 0)}
            color={"green.500"}
            tag={`${data?.pix.count || 0} vendas`}
            icon={FaPix}
          />
        </SimpleGrid>
        <Grid templateColumns="repeat(12, 1fr)" gap={5}>
          <Stack spacing={5} as={GridItem} colSpan={{ base: 12, lg: 6 }}>
            <Box w="full" h={450}>
              <DashboardAreaChart
                key={`${dates.startDate}-${dates.endDate}-revenue-by-period`}
                datetime={dates.startDate !== dates.endDate}
                dailyRevenue={data?.dailyRevenue ?? []}
                title="Faturamento por período"
                subtitle="Acompanhe o volume de vendas por período"
              />
            </Box>
          </Stack>

          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Stack w="full" spacing={5} h={450}>
              <DashboardRevenueChart
                creditCard={data?.creditCard ?? ({} as SalesData["creditCard"])}
                boleto={data?.boleto ?? ({} as SalesData["boleto"])}
                pix={data?.pix ?? ({} as SalesData["pix"])}
                title="Faturamento"
                subtitle="Acompanhe o faturamento da sua empresa"
              />
            </Stack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(12, 1fr)" gap={5}>
          <Stack as={GridItem} gap={5} colSpan={8}>
            <SimpleGrid
              columns={{
                base: 1,
                lg: 2,
              }}
              spacing={5}
            >
              <DashboardStatWidget
                title="Empresas aprovadas"
                stat={data?.approvedCompanies?.toString?.() ?? "0"}
                icon={FaBuildingCircleCheck}
                color="primary.500"
              />
              <DashboardStatWidget
                title="Custo split"
                stat={formatCurrency(data?.gateway.fee ?? 0)}
                icon={BsBank2}
                color="primary.500"
              />
            </SimpleGrid>
            <Box w="full" h={450}>
              <DashboardChartPie
                title="Vendas"
                data={[
                  {
                    name: "Cartão de crédito",
                    color: useToken("colors", "red.400"),
                    value: data?.creditCard?.revenue ?? 0,
                  },
                  {
                    name: "Boleto",
                    color: useToken("colors", "blue.400"),
                    value: data?.boleto?.revenue ?? 0,
                  },
                  {
                    name: "Pix",
                    color: useToken("colors", "green.500"),
                    value: data?.pix?.revenue ?? 0,
                  },
                ]}
              />
            </Box>
          </Stack>
          <Stack as={GridItem} colSpan={4} spacing={5}>
            {data?.summary.map((item) => (
              <RevenueCard
                biling={item.revenue || 0}
                profit={item.profit || 0}
                rate={item.fee || 0}
                title={item.label}
              />
            ))}
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};

export default DashboardPage;
