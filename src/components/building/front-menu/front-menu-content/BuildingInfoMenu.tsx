import { FC } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../../../../middleware/ContextProvider";
import "./front-menu-content.css";

export const BuildingInfoMenu: FC<{
  onToggleMenu: (active: boolean) => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();

  const { building } = state;
  if (!building) {
    throw new Error("No building active!");
  }

  return (
    <Box>
      <h1>This is the building info</h1>
    </Box>
  );
};
