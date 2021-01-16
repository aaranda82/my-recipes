import { User } from "../reducers/usersReducer";

export const usersAction = (users: {
  [name: string]: User;
}): { type: string; payload: { [name: string]: User } } => {
  return {
    type: "SET_USERS",
    payload: users,
  };
};
