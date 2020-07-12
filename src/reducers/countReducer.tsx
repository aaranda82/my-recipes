export interface CountState {
  count: number;
}

const countReducer = (
  state: CountState = { count: 0 },
  action: { type: string }
) => {
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
