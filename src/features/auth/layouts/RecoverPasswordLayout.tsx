import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RecoverPasswordLayout: React.FC = () => (
  <Flex
    width="100%"
    height={{
      sm: "100svh",
    }}
    p={{
      base: 4,
      sm: 8,
    }}
    justify="center"
    align="center"
  >
    <Outlet />
  </Flex>
);

export default RecoverPasswordLayout;
