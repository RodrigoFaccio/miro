import { TransactionStatusConfig } from "@/features/transactions/constants";
import { TransactionStatus } from "@/features/transactions/types";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

type TransactionStatusTagProps = {
  status: TransactionStatus;
} & React.ComponentProps<typeof Tag>;

const TransactionStatusTag: React.FC<TransactionStatusTagProps> = ({
  ...props
}) => {
  const status =
    props.status in TransactionStatusConfig
      ? props.status
      : TransactionStatus.UNKNOWN;

  return (
    <Tag colorScheme={TransactionStatusConfig[status].colorScheme} {...props}>
      <TagLeftIcon as={TransactionStatusConfig[status].icon} />
      <TagLabel>{TransactionStatusConfig[status].label}</TagLabel>
    </Tag>
  );
};

export default TransactionStatusTag;
