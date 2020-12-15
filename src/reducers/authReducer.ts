const initialState = {
  showMenu: false,
  showLogIn: false,
  showSignUp: false,
};

export interface AuthState {
  showMenu: boolean;
  showLogIn: boolean;
  showSignUp: boolean;
}

const authReducer = (
  state: AuthState = initialState,
  action: {
    type: string;
  }
) => {
  switch (action.type) {
    case "SHOWMENU":
      return {
        showMenu: true,
        showLogIn: false,
        showSignUp: false,
      };
    case "SHOWLOGIN":
      return {
        showMenu: false,
        showLogIn: true,
        showSignUp: false,
      };
    case "SHOWSIGNUP":
      return {
        showMenu: false,
        showLogIn: false,
        showSignUp: true,
      };
    case "CLEAR":
      return {
        showMenu: false,
        showLogIn: false,
        showSignUp: false,
      };
    default:
      return state;
  }
};

export default authReducer;