interface Recipe {
  createdBy: string;
  name: string;
  category: string;
  description: string;
  servings: number;
  favoritedBy: string[];
  ingredients: string;
  instructions: string;
}

export interface RecipeState {
  recipes: { [name: string]: Recipe };
}

const recipeReducer = (
  state: RecipeState = { recipes: {} },
  action: { type: string; payload: RecipeState },
): RecipeState => {
  switch (action.type) {
    case "GET_RECIPES":
      return action.payload;
    default:
      return state;
  }
};

export default recipeReducer;
