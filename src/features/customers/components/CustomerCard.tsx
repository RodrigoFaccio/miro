import ListItem from "@/features/common/components/widgets/ListItem";
import {
  formatCNPJ,
  formatCPF,
  formatPhone,
} from "@/features/common/utils/formatters";
import { Customer, DocumentType } from "@/features/customers/types";
import {
  Avatar,
  Card,
  CardBody,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoDocument } from "react-icons/io5";
import { MdPhone } from "react-icons/md";

type Props = {
  customer: Customer;
  actions?: React.ReactNode;
} & React.ComponentProps<typeof Card>;

const CustomerCard: React.FC<Props> = ({ customer, actions, ...props }) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody>
        <Stack gap={5}>
          <Text fontSize="sm" fontWeight="light" color="gray.500">
            Cliente
          </Text>
          <HStack gap={3}>
            <Avatar size="lg" rounded="2xl" name={customer.name} />
            <Stack gap={1} overflow="hidden">
              <Text fontWeight="bold">{customer.name}</Text>
              <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="light"
                noOfLines={1}
              >
                {customer.email}
              </Text>
            </Stack>
          </HStack>
        </Stack>
        <Divider color="gray.200" my={5} />
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
          }}
          gap={5}
          mb={2}
        >
          <ListItem
            primary={customer.docType.toUpperCase()}
            secondary={
              customer.docType === DocumentType.CPF
                ? formatCPF(customer.docNumber)
                : formatCNPJ(customer.docNumber)
            }
            icon={IoDocument}
            copyable
          />
          <ListItem
            primary="CELULAR"
            secondary={formatPhone(customer.phone)}
            icon={MdPhone}
            copyable
          />
        </SimpleGrid>
        {actions && (
          <>
            <Divider color="gray.200" my={5} />
            <HStack>{actions}</HStack>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CustomerCard;
