import { WithdrawalsStatusConfig } from "@/features/withdrawals/constants";
import { WithdrawalStatus } from "@/features/withdrawals/types";
import { Tag, TagLabel } from "@chakra-ui/react";

type WithdrawalsStatusTagProps = {
  status: WithdrawalStatus;
} & React.ComponentProps<typeof Tag>;

const WithdrawalsStatusTag: React.FC<WithdrawalsStatusTagProps> = ({
  ...props
}) => {
  const status =
    props.status in WithdrawalsStatusConfig
      ? props.status
      : WithdrawalStatus.UNKNOWN;
  return (
    <Tag colorScheme={WithdrawalsStatusConfig[status].colorScheme} {...props}>
      <TagLabel>{WithdrawalsStatusConfig[status].label}</TagLabel>
    </Tag>
  );
};

export default WithdrawalsStatusTag;
