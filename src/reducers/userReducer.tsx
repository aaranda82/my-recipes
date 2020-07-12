const initialState = {
  displayName: "",
  email: "",
  uid: "",
};

export interface UserState {
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
      const { displayName, email, uid } = action.payload;
      return {
        displayName,
        email,
        uid,
      };
    case "SIGNOUT":
      return {
        displayName: "",
        email: "",
        uid: "",
      };
    default:
      return state;
  }
};

export default userReducer;
