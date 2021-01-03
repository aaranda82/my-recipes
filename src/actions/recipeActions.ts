import { RecipeState } from "../reducers/recipeReducer";

export const recipeAction = (recipes: RecipeState[]) => {
  return {
    type: "GET_RECIPES",
    payload: recipes,
  };
};
