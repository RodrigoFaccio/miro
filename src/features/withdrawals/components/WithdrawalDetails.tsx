import { formatCurrency } from "@/features/common/utils/formatters";
import ManageCompanyPopover from "@/features/companies/components/ManageCompanyPopover";
import WithdrawalsStatusTag from "@/features/withdrawals/components/WithdrawalStatusTag";
import { Withdrawal } from "@/features/withdrawals/types";
import {
  Avatar,
  Card,
  Divider,
  HStack,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import moment from "moment";

type Props = {
  withdrawal: Withdrawal;
};

const WithdrawalDetails: React.FC<Props> = ({ withdrawal }) => {
  return (
    <Stack gap={5}>
      <HStack
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <HStack gap={3}>
          <Avatar size="md" name={withdrawal.user.first_name} />
          <Stack gap={1}>
            <Text fontSize="sm" fontWeight="bold">
              {withdrawal.user.first_name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              <strong>Chave Pix: </strong>
              <span>{withdrawal.user.pixKey || "-"}</span>
            </Text>
          </Stack>
        </HStack>
        <WithdrawalsStatusTag status={withdrawal.status} />
      </HStack>

      <Stack
        spacing={3}
        as={Card}
        variant="outline"
        overflow="hidden"
        rounded="xl"
        bg="transparent"
        fontFamily="monospace"
        borderStyle="dashed"
        p={5}
      >
        <Stat>
          <StatLabel fontSize="sm" fontWeight="light" color="gray.500">
            Valor do Saque
          </StatLabel>
          <StatNumber fontWeight="bold" fontSize="3xl">
            {formatCurrency(withdrawal.amount)}
          </StatNumber>
        </Stat>
        <HStack justifyContent="space-between">
          <Text fontSize="sm" fontWeight="light" color="gray.500">
            Taxas
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            {formatCurrency(withdrawal.fee)}
          </Text>
        </HStack>
        <Divider color="gray.200" />
        <HStack justifyContent="space-between">
          <Text fontSize="sm" fontWeight="medium">
            Valor Recebido
          </Text>
          <HStack>
            <Text fontSize="xs" fontWeight="thin" color="gray.500">
              aprox.{" "}
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {formatCurrency(withdrawal.amountReceived)}
            </Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize="sm" fontWeight="medium">
            Lucro líquido
          </Text>
          <HStack>
            <Text fontSize="xs" fontWeight="thin" color="gray.500">
              aprox.{" "}
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {formatCurrency(
                withdrawal.amountReceived - withdrawal.fee - withdrawal.amount
              )}
            </Text>
          </HStack>
        </HStack>
        <Divider color="gray.200" />
        <HStack justifyContent="space-between">
          <HStack justifyContent="">
            <Text fontSize="sm" fontWeight="medium">
              Nome:
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {withdrawal.user.first_name}
            </Text>
          </HStack>

          <HStack>
            <Text fontSize="sm" fontWeight="medium">
              Sobrenome:
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {withdrawal.user.last_name}
            </Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <HStack>
            <Text fontSize="sm" fontWeight="medium">
              CNPJ:
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {withdrawal.user.cnpj}
            </Text>
          </HStack>

          <HStack>
            <Text fontSize="sm" fontWeight="medium">
              Chave pix:
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {withdrawal.user.pixKey}
            </Text>
          </HStack>
          
          
        </HStack>
        <HStack justifyContent="space-between">
          
            <HStack>
          <Text fontSize="sm" fontWeight="medium">
            Data da aprovação
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
          {withdrawal.data_approved}
          </Text>
        </HStack>
      </HStack>
        {
           withdrawal.status==='rejected'&& withdrawal.reason!==null&&(
            <HStack justifyContent="space-between">
          
            <HStack>
          <Text fontSize="sm" fontWeight="medium">
            Motivo da rejeição
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            {withdrawal.reason}
          </Text>
        </HStack>
      </HStack>
           )
        }
       
      
       

        
      </Stack>
      <HStack justifyContent="space-between" flexWrap="wrap">
        <ManageCompanyPopover companyID={withdrawal.user.id} />
        <Text fontSize="sm" color="gray.500" fontFamily="monospace">
          {moment(withdrawal.createdAt).format("DD/MM/YYYY à\\s HH:mm\\h")}
        </Text>
      </HStack>
    </Stack>
  );
};

export default WithdrawalDetails;
