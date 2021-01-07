interface Info {
  userName: string;
  email: string;
}

export interface UsersState {
  users: { [name: string]: Info };
}

const usersReducer = (
  state: UsersState[] = [],
  action: { type: string; payload: UsersState[] },
) => {
  switch (action.type) {
    case "GET_USERS":
      return { users: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
