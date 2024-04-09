import { CompanyStatusConfig } from "@/features/companies/constants";
import { CompanyStatus } from "@/features/companies/types";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

type CompanyStatusTagProps = {
  status: CompanyStatus;
} & React.ComponentProps<typeof Tag>;

const CompanyStatusTag: React.FC<CompanyStatusTagProps> = ({ ...props }) => {
  const status =
    props.status in CompanyStatusConfig ? props.status : CompanyStatus.UNKNOWN;
  return (
    <Tag colorScheme={CompanyStatusConfig[status].colorScheme} {...props}>
      <TagLeftIcon as={CompanyStatusConfig[status].icon} />
      <TagLabel>{CompanyStatusConfig[status].label}</TagLabel>
    </Tag>
  );
};

export default CompanyStatusTag;
