import ListItem from "@/features/common/components/widgets/ListItem";
import { formatCurrency } from "@/features/common/utils/formatters";
import { ReadTransactionResponse } from "@/features/transactions/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";

type Props = {
  items: ReadTransactionResponse["items"];
} & React.ComponentProps<typeof Card>;

const TransactionItemsCard: React.FC<Props> = ({ items, ...props }) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody pt={3}>
        <Stack gap={5}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Carrinho
            </Text>
            <Icon as={BsCart} fontSize="lg" color="gray.500" flexShrink={0} />
          </HStack>
          <Stack spacing={3}>
            {items.map((item) => (
              <HStack key={item.id} gap={2}>
                <Box position="relative">
                  <Avatar size="md" rounded="lg" name={item.title} />
                  <Badge
                    position="absolute"
                    top={0}
                    right={0}
                    rounded="full"
                    colorScheme="primary"
                    size="sm"
                    variant="solid"
                  >
                    {item.quantity}
                  </Badge>
                </Box>
                <ListItem
                  primary={item.title}
                  secondary={formatCurrency(item.unitPrice)}
                />
              </HStack>
            ))}
            {items.length === 0 && (
              <Alert status="warning" rounded="md" variant="left-accent">
                <AlertIcon />
                <AlertDescription fontSize="xs">
                  Nenhum item encontrado
                </AlertDescription>
              </Alert>
            )}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TransactionItemsCard;
