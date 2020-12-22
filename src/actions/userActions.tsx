export const signInAction = (
  displayName: string,
  email: string,
  uid: string
) => {
  return {
    type: "SIGN_IN",
    payload: { displayName, email, uid },
  };
};

export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
  };
};
