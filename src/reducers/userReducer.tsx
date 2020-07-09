const initialState = {
  displayName: "",
  email: "",
  uid: "",
};

interface UserState {
  displayName: string;
  email: string;
  uid: string;
}

const userReducer = (
  state: UserState = initialState,
  action: {
    type: string;
    payload: { displayName: string; email: string; uid: string };
  }
) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        displayName: action.payload.displayName,
        email: action.payload.email,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

export default userReducer;
