import SplitCard from "@/features/common/components/cards/SplitCard";
import ListItem from "@/features/common/components/widgets/ListItem";
import useBankAccount from "@/features/financial/hooks/UseBankAccount";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Card,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

type Props = React.ComponentProps<typeof Card>;

const BankAccountCard: React.FC<Props> = ({ ...props }) => {
  const { data: account, isFetched } = useBankAccount();
  return (
    <SplitCard
      title="Dados bancários"
      subtitle="Informações da conta bancária cadastrada"
      {...props}
    >
      {isFetched ? (
        <Stack spacing={4}>
          <ListItem primary="Banco" secondary={account.bankNumber} />
          <SimpleGrid columns={2} spacing={4}>
            <ListItem primary="Conta" secondary={account.accountNumber} />
            <ListItem
              primary="Dígito da Conta"
              secondary={account.accountDigit}
            />
            <ListItem primary="Agência" secondary={account.agencyNumber} />
            <ListItem
              primary="Dígito da Agência"
              secondary={account.agencyDigit || "-"}
            />
          </SimpleGrid>
        </Stack>
      ) : (
        <Alert status="loading" rounded="md" colorScheme="primary">
          <AlertIcon />
          <AlertDescription>Carregando dados bancários...</AlertDescription>
        </Alert>
      )}
    </SplitCard>
  );
};

export default BankAccountCard;
