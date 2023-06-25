import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { BuildingTopBar } from "./BuildingTopBar";
import { CssBaseline } from "@mui/material";
import { BuildingDrawer } from "./BuildingDrawer";
import { getDrawerHeader } from "./mui-utils";
import { useAppContext } from "../../middleware/ContextProvider";
import { Navigate } from "react-router-dom";
import { BuildingFrontMenu } from "./front-menu/BuildingFrontMenu";

export const BuildingViewer: FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);

  const [width] = useState(240);

  const [{ building, user }] = useAppContext();

  if (!building) {
    return <Navigate to="/map" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleFrontMenu = (active = !frontOpen) => {
    setFrontOpen(active);
  };

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const DrawerHeader = getDrawerHeader();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <BuildingTopBar
        width={width}
        open={sideOpen}
        onOpen={() => toggleDrawer(true)}
      />

      <BuildingDrawer
        width={width}
        open={sideOpen}
        onClose={() => toggleDrawer(false)}
        onToggleMenu={() => toggleFrontMenu(true)}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <BuildingFrontMenu
          onToggleMenu={() => toggleFrontMenu(false)}
          open={frontOpen}
          mode="BuildingInfo"
        />

        <h1>Hello building viewer!</h1>
      </Box>
    </Box>
  );
};
