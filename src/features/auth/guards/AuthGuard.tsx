import { AuthContext } from "@/features/auth/contexts/AuthContext";
import { Spinner, Stack } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
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

  if (!authenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
