const ViewReducer = (
  state: { view: string } = { view: "Landing Page" },
  action: { type: string }
) => {
  switch (action.type) {
    case "LANDING_PAGE":
      return { view: "Landing Page" };
    case "LOGGED_IN":
      return { view: "Logged In" };
    default:
      return state;
  }
};

export default ViewReducer;
