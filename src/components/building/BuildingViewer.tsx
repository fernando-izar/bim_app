import { FC } from "react";
import { useAppContext } from "../../middleware/ContextProvider";
import { Navigate } from "react-router";
import { Button } from "@mui/material";

export const BuildingViewer: FC = () => {
  const [state, dispatch] = useAppContext();
  const { building } = state;

  const onCloseBuilding = () => {
    dispatch({ type: "CLOSE_BUILDING" });
  };

  if (!building) {
    return <Navigate to="/map" />;
  }

  return (
    <>
      <h1>Hello building viewer!</h1>
      <Button onClick={onCloseBuilding}>Close Building</Button>
    </>
  );
};
