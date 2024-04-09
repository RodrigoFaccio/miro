import { PaymentMethodConfig } from "@/features/transactions/constants";
import { PaymentMethod } from "@/features/transactions/types";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

type PaymentMethodTagProps = {
  paymentMethod: PaymentMethod;
} & React.ComponentProps<typeof Tag>;

const PaymentMethodTag: React.FC<PaymentMethodTagProps> = ({ ...props }) => {
  const paymentMethod =
    props.paymentMethod in PaymentMethodConfig
      ? props.paymentMethod
      : PaymentMethod.UNKNOWN;
  return (
    <Tag
      colorScheme={PaymentMethodConfig[paymentMethod].colorScheme}
      {...props}
    >
      <TagLeftIcon as={PaymentMethodConfig[paymentMethod].icon} />
      <TagLabel>{PaymentMethodConfig[paymentMethod].label}</TagLabel>
    </Tag>
  );
};

export default PaymentMethodTag;
