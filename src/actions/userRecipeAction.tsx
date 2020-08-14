import { RootState } from "../reducers/rootReducer";

export const loadRecipesAction = (recipes: RootState["userRecipeReducer"]) => {
  return {
    type: "LOADRECIPES",
    payload: recipes,
  };
};
