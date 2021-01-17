const categoryReducer = (
  state = "ALL",
  action: { type: string; payload: string },
): string => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

export default categoryReducer;
