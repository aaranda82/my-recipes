const initState: { count: number } = {
  count: 0,
};

const countReducer = (state = initState, action: { type: string }) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default countReducer;
