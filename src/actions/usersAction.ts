import { UsersState } from "../reducers/usersReducer";

export const usersAction = (
  users: UsersState,
): { type: string; payload: UsersState } => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};
