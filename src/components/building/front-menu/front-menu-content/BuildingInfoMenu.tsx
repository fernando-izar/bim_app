import React, { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useAppContext } from "../../../../middleware/ContextProvider";
import "./front-menu-content.css";

export const BuildingInfoMenu: FC<{
  onToggleMenu: () => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();

  const { building } = state;

  if (!building) {
    throw new Error("No building active!");
  }

  const onUpdateBuilding = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newBuilding = { ...building } as any;

    newBuilding.name = data.get("building-name") || building.name;
    newBuilding.lng = data.get("building-lng") || building.lng;
    newBuilding.lat = data.get("building-lat") || building.lat;

    dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
    onToggleMenu();
  };

  return (
    <Box component="form" onSubmit={onUpdateBuilding}>
      <div className="list-item">
        <TextField
          disabled
          fullWidth
          id="building-ID"
          label="Building ID"
          name="building-ID"
          autoComplete="building-id"
          defaultValue={building.uid}
        />
      </div>

      <div className="list-item">
        <TextField
          fullWidth
          id="building-name"
          label="Building Name"
          name="building-name"
          autoComplete="building-name"
          defaultValue={building.name}
        />
      </div>

      <div className="list-item">
        <TextField
          fullWidth
          id="building-lng"
          label="Longitute"
          name="building-lng"
          autoComplete="building-lng"
          defaultValue={building.lng}
        />
      </div>

      <div className="list-item">
        <TextField
          fullWidth
          id="building-lat"
          label="Latitude"
          name="building-lat"
          autoComplete="building-lat"
          defaultValue={building.lat}
        />
      </div>

      <div className="list-item">
        <Button type="submit" className="submit-button">
          Update building
        </Button>
      </div>
    </Box>
  );
};
