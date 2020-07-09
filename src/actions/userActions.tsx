export const signInAction = (
  displayName: string,
  email: string,
  uid: string
) => {
  return {
    type: "SIGNIN",
    payload: { displayName, email, uid },
  };
};
