const initialState = {
  displayName: "",
  email: "",
  uid: "",
  isSignedIn: false,
};

interface UserState {
  displayName: string;
  email: string;
  uid: string;
  isSignedIn: boolean;
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
        isSignedIn: true,
      };
    case "SIGNOUT":
      return {
        displayName: "",
        email: "",
        uid: "",
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
