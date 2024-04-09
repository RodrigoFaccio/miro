import ListItem from "@/features/common/components/widgets/ListItem";
import CompanySettings from "@/features/companies/components/CompanySettings";
import { useCompanyData } from "@/features/companies/hooks/UseCompanyData";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
} from "@chakra-ui/react";
import { IoSettings } from "react-icons/io5";

type Props = {
  companyID: number;
};

const ManageCompanyPopover: React.FC<Props> = ({ companyID }) => {
  const { data: company, isFetching } = useCompanyData(companyID);

  return (
    <Popover variant="responsive" placement="left-start">
      <PopoverTrigger>
        <Button leftIcon={<IoSettings />} size="sm">
          Gerenciar Empresa
        </Button>
      </PopoverTrigger>
      <PopoverContent
        w={500}
        maxW={{
          base: "90vw",
          md: "500px",
        }}
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <ListItem
            primary="Configurações"
            secondary={company?.first_name || "-"}
          />
        </PopoverHeader>
        <PopoverBody>
          {isFetching && (
            <Progress
              size="xs"
              isIndeterminate
              colorScheme="primary"
              rounded="md"
            />
          )}
          {company && <CompanySettings company={company} />}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ManageCompanyPopover;
