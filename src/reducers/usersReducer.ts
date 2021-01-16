export interface User {
  userName: string;
  email: string;
}

export interface UsersState {
  users: { [name: string]: User };
}

const usersReducer = (
  state: UsersState = { users: {} },
  action: { type: string; payload: { [name: string]: User } },
): UsersState => {
  switch (action.type) {
    case "SET_USERS":
      return { users: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
