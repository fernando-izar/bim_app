import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import { Tool } from "../../../types";
import ListIcon from "@mui/icons-material/ViewList";

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toogleMenu: () => void
): Tool[] {
  return [
    {
      name: "Info",
      icon: <ListIcon />,
      action: () => {
        toogleMenu();
      },
    },
  ];
}