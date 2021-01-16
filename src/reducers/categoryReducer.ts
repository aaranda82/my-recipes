const categoryReducer = (
  state: string = "ALL",
  action: { type: string; payload: string },
) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { categoryToShow: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
