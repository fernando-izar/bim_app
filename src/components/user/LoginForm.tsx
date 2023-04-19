import { FC } from "react";
import { useAppContext } from "../../middleware/ContextProvider";
import { Button } from "@mui/material";

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLogin = () => {
    dispatch({ type: "LOGIN" });
  };

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <h1>
      {state.user ? (
        <>
          <p>{state.user.displayName}</p>
          <Button variant="contained" onClick={onLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>
      )}
    </h1>
  );
};
