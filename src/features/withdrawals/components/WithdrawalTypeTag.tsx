import { WithdrawalsTypeConfig } from "@/features/withdrawals/constants";
import { WithdrawalType } from "@/features/withdrawals/types";
import { Tag, TagLabel } from "@chakra-ui/react";

type WithdrawalsTypeTagProps = {
  type: WithdrawalType;
} & React.ComponentProps<typeof Tag>;

const WithdrawalsTypeTag: React.FC<WithdrawalsTypeTagProps> = ({
  ...props
}) => {
  const type =
    props.type in WithdrawalsTypeConfig ? props.type : WithdrawalType.UNKNOWN;
  return (
    <Tag colorScheme={WithdrawalsTypeConfig[type].colorScheme} {...props}>
      <TagLabel>{WithdrawalsTypeConfig[type].label}</TagLabel>
    </Tag>
  );
};

export default WithdrawalsTypeTag;
