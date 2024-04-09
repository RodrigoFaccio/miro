import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { Spinner, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestGuard: React.FC = () => {
  const { authenticated, initialized } = useContext(AuthContext);

  if (!initialized) {
    return (
      <Stack
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner color="primary.600" />
      </Stack>
    );
  }

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuestGuard;
