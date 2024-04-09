import { formatCurrency } from "@/features/common/utils/formatters";
import useBalance from "@/features/financial/hooks/UseBalance";
import {
  Card,
  CardBody,
  CircularProgress,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { MdAccountBalanceWallet } from "react-icons/md";

const BalanceCard = () => {
  const {
    data: { balance = 0 },
    isFetching,
  } = useBalance();

  const [bg] = useToken("colors", ["primary.400"]);

  return (
    <Card
      borderLeft="4px solid"
      borderColor={useColorModeValue("primary.900", "primary.400")}
      borderRadius="lg"
      fontFamily="monospace"
      bg={bg + "20"}
    >
      <CardBody p={4}>
        <HStack justifyContent="space-between">
          <Stack gap={1}>
            <HStack>
              <Text fontSize="xs" fontWeight="light" color="gray.500">
                Saldo
              </Text>
              {isFetching && (
                <CircularProgress
                  isIndeterminate
                  color="primary.500"
                  size={3}
                />
              )}
            </HStack>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue("primary.900", "primary.300")}
            >
              {formatCurrency(balance)}
            </Text>
          </Stack>
          <Icon
            as={MdAccountBalanceWallet}
            boxSize={6}
            color={useColorModeValue("primary.900", "primary.300")}
          />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default BalanceCard;
