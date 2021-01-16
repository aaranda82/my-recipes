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
  },
): UserState => {
  switch (action.type) {
    case "SIGN_IN":
      const { displayName, email, uid } = action.payload;
      return {
        displayName,
        email,
        uid,
      };
    case "SIGN_OUT":
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
