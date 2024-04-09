import { formatCurrency } from "@/features/common/utils/formatters";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props {
  biling: number;
  rate: number;
  profit: number;
  title: string;
}

export const RevenueCard: React.FC<PropsWithChildren<Props>> = ({
  biling,
  rate,
  profit,
  title,
  children,
}) => {
  return (
    <Card
      rounded="xl"
      width="100%"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
    >
      <CardHeader pb={0}>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack gap={2}>
          <HStack justifyContent="space-between">
            <Text fontWeight="thin" color="gray.500" fontFamily="monospace">
              Faturamento
            </Text>
            <Tag variant="subtle" colorScheme="blue" textAlign="right">
              <TagLabel>{formatCurrency(biling)}</TagLabel>
            </Tag>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="gray.500" fontWeight="thin" fontFamily="monospace">
              Taxas
            </Text>
            <Tag variant="subtle" colorScheme="red" textAlign="right">
              <TagLabel>{formatCurrency(rate)}</TagLabel>
            </Tag>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="gray.500" fontWeight="thin" fontFamily="monospace">
              Lucro líquido
            </Text>
            <Tag variant="subtle" colorScheme="green" textAlign="right">
              <TagLabel>{formatCurrency(profit)}</TagLabel>
            </Tag>
          </HStack>
        </Stack>
      </CardBody>
      {children && <CardFooter pt={1}>{children}</CardFooter>}
    </Card>
  );
};
