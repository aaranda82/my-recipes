interface Return {
  type: string;
  payload: { displayName: string; email: string; uid: string };
}

export const signInAction = (
  displayName: string,
  email: string,
  uid: string,
): Return => {
  return {
    type: "SIGN_IN",
    payload: { displayName, email, uid },
  };
};

export const signOutAction = (): { type: string } => {
  return {
    type: "SIGN_OUT",
  };
};
