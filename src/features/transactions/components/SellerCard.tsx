import ListItem from "@/features/common/components/widgets/ListItem";
import ManageCompanyPopover from "@/features/companies/components/ManageCompanyPopover";
import { Transaction } from "@/features/transactions/types";
import {
  Box,
  Card,
  CardBody,
  CardProps,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsPersonCheck } from "react-icons/bs";

type Props = {
  seller: Transaction["user"];
} & CardProps;

const SellerCard: React.FC<Props> = ({
  seller: { id, first_name, email },
  ...props
}) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody pt={3}>
        <Stack gap={5}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Vendedor
            </Text>
            <Icon
              as={BsPersonCheck}
              fontSize="xl"
              color="gray.500"
              flexShrink={0}
            />
          </HStack>
          <HStack spacing={3}>
            <ListItem primary="Nome" secondary={first_name || "-"} />
            <ListItem primary="Email" secondary={email} />
          </HStack>
          <Box>
            <ManageCompanyPopover companyID={id} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SellerCard;
