export interface RecipeState {
  recipes: {
    [name: string]: {
      createdBy: string;
      name: string;
      category: string;
      description: string;
      servings: number;
      favoritedBy: string[];
      ingredients: string;
      instructions: string;
    };
  };
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
