interface Info {
  userName: string;
  email: string;
}

export interface UsersState {
  users: { [name: string]: Info };
}

const usersReducer = (
  state: UsersState = { users: {} },
  action: { type: string; payload: UsersState },
): UsersState => {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
