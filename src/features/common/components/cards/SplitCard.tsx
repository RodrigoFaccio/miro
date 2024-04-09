import {
  Card,
  CardBody,
  CardProps,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  subtitle: string;
}> &
  CardProps;

const SplitCard: React.FC<Props> = ({
  title,
  subtitle,
  children,
  ...props
}) => {
  return (
    <SimpleGrid columns={12} spacing={4}>
      <Stack
        gap={4}
        p={2}
        as={GridItem}
        colSpan={{
          base: 12,
          lg: 5,
        }}
      >
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm" color="gray.500" fontWeight="normal">
          {subtitle}
        </Text>
      </Stack>
      <Card
        variant="outline"
        border="none"
        rounded="xl"
        w="full"
        as={GridItem}
        colSpan={{
          base: 12,
          lg: 7,
        }}
        {...props}
      >
        <CardBody>{children}</CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default SplitCard;
