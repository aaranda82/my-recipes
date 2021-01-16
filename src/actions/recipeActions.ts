import { Recipe } from "../reducers/recipeReducer";

export const recipeAction = (recipes: {
  [name: string]: Recipe;
}): { type: string; payload: { [name: string]: Recipe } } => {
  return {
    type: "SET_RECIPES",
    payload: recipes,
  };
};
