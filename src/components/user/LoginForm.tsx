import { FC } from "react";
import { useAppContext } from "../../middleware/ContextProvider";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLogin = () => {
    dispatch({ type: "LOGIN" });
  };

  if (state.user) {
    return <Navigate to="/map" />;
  }

  return (
    <h1>
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
    </h1>
  );
};
