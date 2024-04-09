import { formatCurrency } from "@/features/common/utils/formatters";
import { RevenueCard } from "@/features/dashboard/components/RevenueCard";
import { Divider, HStack, Stack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof RevenueCard> {
  summary: Array<{
    label: string;
    value: number;
  }>;
}

export const TotalRevenueCard = ({ summary, ...props }: Props) => {
  return (
    <RevenueCard {...props}>
      <Stack spacing={4} width="100%">
        <Divider
          orientation="horizontal"
          borderColor="gray.500"
          borderStyle="dashed"
        />

        <Stack spacing={2}>
          {summary.map(({ label, value }) => (
            <HStack justifyContent="space-between">
              <Text fontWeight="thin" color="gray.500" fontFamily="monospace">
                {label}
              </Text>
              <Tag variant="subtle" colorScheme="gray" textAlign="right">
                <TagLabel>{formatCurrency(value)}</TagLabel>
              </Tag>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </RevenueCard>
  );
};
