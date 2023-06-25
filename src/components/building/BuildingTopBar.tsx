import { FC } from "react";
import { getAppBar } from "./mui-utils";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type BuildingTopBarProps = {
  open: boolean;
  onOpen: () => void;
  width: number;
};

export const BuildingTopBar: FC<BuildingTopBarProps> = ({
  open,
  onOpen,
  width,
}) => {
  const Appbar = getAppBar(width);

  return (
    <Appbar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Building Viewer
        </Typography>
      </Toolbar>
    </Appbar>
  );
};
