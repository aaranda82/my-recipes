import { RecipeState } from "../reducers/recipeReducer";

export const recipeAction = (
  recipes: RecipeState,
): { type: string; payload: RecipeState } => {
  return {
    type: "GET_RECIPES",
    payload: recipes,
  };
};
