export type ActionType =
  | "LOGIN"
  | "UPDATE_USER"
  | "START_MAP"
  | "REMOVE_MAP"
  | "LOGOUT"
  | "ADD_BUILDING"
  | "OPEN_BUILDING"
  | "CLOSE_BUILDING";

export interface Action {
  type: ActionType;
  payload?: any;
}
