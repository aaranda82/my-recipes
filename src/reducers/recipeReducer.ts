export interface RecipeState {
  recipes: {
    recipeId: string;
    createdBy: string;
    name: string;
    category: string;
    servings: number;
    favoritedBy: string[];
    ingredients: { name: string; quantity: string; unit: string }[];
    instructions: { number: number; instruction: string }[];
  }[];
}

const recipeReducer = (
  state: RecipeState[] = [],
  action: { type: string; payload: RecipeState[] },
) => {
  switch (action.type) {
    case "GET_RECIPES":
      return { recipes: action.payload };
    default:
      return state;
  }
};

export default recipeReducer;
