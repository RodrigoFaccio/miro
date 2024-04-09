import PageContainer from "@/features/common/components/layout/PageContainer";
import { CompanyStatusConfig } from "@/features/companies/constants";
import { CompanyStatus } from "@/features/companies/types";
import GatewayRequestsTable from "@/features/gateway-requests/components/GatewayRequestsTable";
import { HStack, Heading } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";

type SelectValue = {
  value: CompanyStatus.GATEWAY_PENDING | CompanyStatus.REJECTED;
  label: string;
};

const GatewayRequestsPage = () => {
  const [status, setStatus] = useState<SelectValue>({
    value: CompanyStatus.GATEWAY_PENDING,
    label: CompanyStatusConfig[CompanyStatus.GATEWAY_PENDING].label,
  });

  return (
    <PageContainer
      crumbs={[
        {
          href: "/gateway-requests",
          label: "Solicitações Gateway",
        },
      ]}
    >
      <HStack justify="space-between" flexWrap="wrap" gap={6} mb={8}>
        <Heading>Solicitações de Gateway</Heading>
        <Select
          selectedOptionStyle="check"
          options={[
            {
              label: "Pendentes",
              value: CompanyStatus.GATEWAY_PENDING,
            },
            {
              label: "Rejeitadas",
              value: CompanyStatus.REJECTED,
            },
          ]}
          value={status}
          onChange={(value) => setStatus(value as SelectValue)}
        />
      </HStack>
      <GatewayRequestsTable status={status.value} />
    </PageContainer>
  );
};

export default GatewayRequestsPage;
