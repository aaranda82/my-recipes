import { UsersState } from "../reducers/usersReducer";

export const usersAction = (users: UsersState[]) => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};
