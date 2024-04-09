import {
  formatCurrency,
  formatPercentage,
} from "@/features/common/utils/formatters";
import CustomerCard from "@/features/customers/components/CustomerCard";
import CustomerTransactionsTable from "@/features/customers/components/CustomerTransactionsTable";
import { ReadCustomerResponse } from "@/features/customers/types";
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";

type CustomerDetailsProps = ReadCustomerResponse;

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  averageOrder,
  paidOrderCount,
  totalInOrders,
  totalOrdersCount,
  totalSpent,
  transactions,
}) => {
  const spentPercentage = (totalSpent / totalInOrders) * 100 || 0;

  const paidPercentage = (paidOrderCount / totalOrdersCount) * 100 || 0;

  return (
    <>
      <Grid gap={3} templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Stack gap={3}>
            <CustomerCard customer={customer} rounded="xl" />
            <Card variant="outline" overflow="hidden" rounded="xl">
              <CardHeader>
                <Text fontSize="sm" fontWeight="light" color="gray.500">
                  Transações
                </Text>
              </CardHeader>
              <CustomerTransactionsTable transactions={transactions} />
            </Card>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <Stack gap={3}>
            <Card variant="outline" rounded="xl">
              <CardBody>
                <Stack gap={1}>
                  <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="light"
                    color="gray.500"
                  >
                    Ticket médio
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    {formatCurrency(averageOrder)}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
            <Card variant="outline" rounded="xl">
              <CardBody>
                <Stack gap={1}>
                  <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="light"
                    color="gray.500"
                  >
                    Gasto
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    {formatCurrency(totalSpent)}
                  </Text>
                  <HStack>
                    <Progress
                      rounded="md"
                      w={"full"}
                      colorScheme="primary"
                      hasStripe
                      value={spentPercentage}
                      size="sm"
                    />
                    <Text fontSize="xs" fontWeight="light">
                      {formatPercentage(spentPercentage)}
                    </Text>
                  </HStack>
                  <Text fontSize="2xs" fontWeight="light">
                    Total em pedidos:{" "}
                    <strong>{formatCurrency(totalInOrders)}</strong>
                  </Text>
                </Stack>
              </CardBody>
            </Card>
            <Card variant="outline" rounded="xl">
              <CardBody>
                <Stack gap={1}>
                  <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="light"
                    color="gray.500"
                  >
                    Pedidos pagos
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    {paidOrderCount}
                  </Text>
                  <HStack>
                    <Progress
                      rounded="md"
                      w={"full"}
                      colorScheme="primary"
                      hasStripe
                      value={paidPercentage}
                      size="sm"
                    />
                    <Text fontSize="xs" fontWeight="light">
                      {formatPercentage(paidPercentage)}
                    </Text>
                  </HStack>
                  <Text fontSize="2xs" fontWeight="light">
                    Total de pedidos: <strong>{totalOrdersCount}</strong>
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerDetails;
