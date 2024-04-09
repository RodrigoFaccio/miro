import { PartnerRoleConfig } from "@/features/partners/constants";
import { PartnerRole } from "@/features/partners/types";
import { Tag, TagLabel } from "@chakra-ui/react";

type PartnersRoleTagProps = {
  role: PartnerRole;
} & React.ComponentProps<typeof Tag>;

const PartnersRoleTag: React.FC<PartnersRoleTagProps> = ({ ...props }) => {
  const role =
    props.role in PartnerRoleConfig ? props.role : PartnerRole.UNKNOWN;
  return (
    <Tag colorScheme={PartnerRoleConfig[role].colorScheme} {...props}>
      <TagLabel>{PartnerRoleConfig[role].label}</TagLabel>
    </Tag>
  );
};

export default PartnersRoleTag;
