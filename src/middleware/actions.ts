export type ActionType =
  | "LOGIN"
  | "UPDATE_USER"
  | "START_MAP"
  | "REMOVE_MAP"
  | "LOGOUT";

export interface Action {
  type: ActionType;
  payload?: any;
}
