import { BankExtractStatusConfig } from "@/features/financial/constants";
import { BankExtractStatus } from "@/features/financial/types";
import { Tag, TagLabel } from "@chakra-ui/react";

type BankExtractStatusTagProps = {
  status: BankExtractStatus;
} & React.ComponentProps<typeof Tag>;

const BankExtractStatusTag: React.FC<BankExtractStatusTagProps> = ({
  ...props
}) => {
  const status =
    props.status in BankExtractStatusConfig
      ? props.status
      : BankExtractStatus.UNKNOWN;

  return (
    <Tag colorScheme={BankExtractStatusConfig[status].colorScheme} {...props}>
      <TagLabel>{BankExtractStatusConfig[status].label}</TagLabel>
    </Tag>
  );
};

export default BankExtractStatusTag;
