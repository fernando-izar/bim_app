export const ActionList = [
  "LOGIN",
  "UPDATE_USER",
  "START_MAP",
  "REMOVE_MAP",
  "LOGOUT",
  "ADD_BUILDING",
  "OPEN_BUILDING",
  "CLOSE_BUILDING",
  "UPDATE_BUILDING",
  "DELETE_BUILDING",
] as const;

export type ActionType = (typeof ActionList)[number];

export interface Action {
  type: ActionType;
  payload?: any;
}
