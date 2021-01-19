export interface Recipe {
  createdBy: string;
  name: string;
  category: string;
  description: string;
  servings: number;
  favoritedBy: string[];
  ingredients: string;
  instructions: string;
  image: string;
}

export interface RecipeState {
  recipes: { [name: string]: Recipe };
}

const recipeReducer = (
  state: RecipeState = { recipes: {} },
  action: { type: string; payload: { [name: string]: Recipe } },
): RecipeState => {
  switch (action.type) {
    case "SET_RECIPES":
      return { recipes: action.payload };
    default:
      return state;
  }
};

export default recipeReducer;
