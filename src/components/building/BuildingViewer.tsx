import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { BuildingTopBar } from "./side-menu/BuildingTopBar";
import { CssBaseline } from "@mui/material";
import { BuildingDrawer } from "./side-menu/BuildingDrawer";
import { getDrawerHeader } from "./side-menu/mui-utils";
import { useAppContext } from "../../middleware/ContextProvider";
import { Navigate } from "react-router-dom";
import { BuildingFrontMenu } from "./front-menu/BuildingFrontMenu";
import { FrontMenuMode } from "./types";
import { BuildingViewport } from "./viewport/BuildingViewport";

export const BuildingViewer: FC = () => {
  const [width] = useState(240);
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [frontMenu, setFrontMenu] = useState<FrontMenuMode>("BuildingInfo");

  const [{ building, user }] = useAppContext();

  if (!building) {
    return <Navigate to="/map" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleFrontMenu = (active = !frontOpen, mode?: FrontMenuMode) => {
    if (mode) {
      setFrontMenu(mode);
    }
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
        onToggleMenu={toggleFrontMenu}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <BuildingFrontMenu
          onToggleMenu={() => toggleFrontMenu(false)}
          open={frontOpen}
          mode={frontMenu}
        />

        <BuildingViewport />
      </Box>
    </Box>
  );
};
