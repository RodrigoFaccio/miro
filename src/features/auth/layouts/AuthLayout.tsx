import { useAppConfig } from "@/features/common/contexts/AppConfigContext";
import { Flex, Image } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const { backgroundImage } = useAppConfig();
  return (
    <Flex
      direction="row"
      w="100vw"
      h={{
        sm: "100svh",
      }}
      overflow="hidden"
    >
      <Flex
        p={{
          base: 5,
          lg: 10,
        }}
        flex={1}
        direction="column"
        align="center"
        justify="center"
        w={400}
        maxW="full"
      >
        <Outlet />
      </Flex>
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Auth"
          w="720px"
          h="100svh"
          objectFit="cover"
          display={{ base: "none", lg: "block" }}
        />
      )}
    </Flex>
  );
};

export default AuthLayout;
