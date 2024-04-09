import ListItem from "@/features/common/components/widgets/ListItem";
import { formatCurrency } from "@/features/common/utils/formatters";
import TransactionStatusTag from "@/features/transactions/components/TransactionStatusTag";
import { ReadTransactionResponse } from "@/features/transactions/types";
import {
  Card,
  CardBody,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import moment from "moment";

type Props = {
  transaction: ReadTransactionResponse;
} & React.ComponentProps<typeof Card>;

const TransactionCard: React.FC<Props> = ({ transaction, ...props }) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody>
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <Stat>
            <StatLabel fontSize="sm" fontWeight="light" color="gray.500">
              Valor da transação
            </StatLabel>
            <StatNumber fontWeight="bold" fontSize="3xl">
              {formatCurrency(transaction.amount)}
            </StatNumber>
          </Stat>
          <Stack>
            <Text fontSize="sm" fontWeight="light" color="gray.500">
              Status
            </Text>
            <TransactionStatusTag status={transaction.status} />
          </Stack>
        </HStack>
        <Divider color="gray.200" my={5} />
        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
          }}
          gap={5}
        >
          <ListItem
            primary="ID da transação"
            secondary={transaction.id}
            copyable
          />
          <ListItem
            primary="Criado em"
            secondary={moment(transaction.createdAt).format(
              "DD/MM/YYYY à\\s HH:mm"
            )}
          />
          <ListItem
            primary="Atualizado em"
            secondary={moment(transaction.updatedAt).format(
              "DD/MM/YYYY à\\s HH:mm"
            )}
          />
           <ListItem
            primary="ID externo"
            secondary={transaction.externalId}
            copyable
          />
        </SimpleGrid>
        {transaction.reason && (
          <Stack mt={5} gap={1} align="flex-start">
            <Text fontSize="sm" fontWeight="light" color="gray.500">
              Motivo
            </Text>
            <Text fontSize="sm" fontWeight="light">
              {transaction.reason}
            </Text>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default TransactionCard;
