import Header from "@/features/common/components/layout/Header";
import Sidebar from "@/features/common/components/layout/Sidebar";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        overflow="auto"
        sx={{ h: "calc(100vh - 80px)" }}
        p={[1, 4]}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout;
