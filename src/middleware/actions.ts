export type ActionType =
  | "LOGIN"
  | "UPDATE_USER"
  | "START_MAP"
  | "REMOVE_MAP"
  | "LOGOUT"
  | "ADD_BUILDING";

export interface Action {
  type: ActionType;
  payload?: any;
}
