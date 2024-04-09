import { formatCurrency } from "@/features/common/utils/formatters";
import { ReadTransactionResponse } from "@/features/transactions/types";
import {
  Card,
  CardBody,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiOutlineReceiptTax } from "react-icons/hi";

type Props = {
  transaction: ReadTransactionResponse;
} & React.ComponentProps<typeof Card>;

const TransactionFeesCard: React.FC<Props> = ({ transaction, ...props }) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody pt={3}>
        <Stack gap={5}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Taxas
            </Text>
            <Icon
              as={HiOutlineReceiptTax}
              fontSize="xl"
              color="gray.500"
              flexShrink={0}
            />
          </HStack>
          <Stack spacing={3}>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="light" color="gray.500">
                Valor Bruto
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                {formatCurrency(transaction.amount)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="light" color="gray.500">
                Valor da Intermediação
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                {formatCurrency(transaction.fee)}
              </Text>
            </HStack>
            <Divider color="gray.200" />
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Valor Líquido
              </Text>
              <HStack>
                <Text fontSize="xs" fontWeight="thin" color="gray.500">
                  aprox.{" "}
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {formatCurrency(transaction.liquidAmount)}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TransactionFeesCard;
