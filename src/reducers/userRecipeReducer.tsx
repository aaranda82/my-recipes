export interface userRecipeState {
  recipe: string;
  category: string;
  servings: number;
  ingredients: { name: string; quantity: number; unit: string }[];
  instructions: { number: number; instruction: string }[];
}

const userRecipeReducer = (
  state: userRecipeState[] = [],
  action: {
    type: string;
    payload: userRecipeState[];
  }
) => {
  switch (action.type) {
    case "LOADRECIPES":
      return action.payload;
    default:
      return state;
  }
};

export default userRecipeReducer;
