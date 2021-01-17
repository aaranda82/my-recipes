import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";
import categoryReducer from "./categoryReducer";
import recipeReducer, { RecipeState } from "./recipeReducer";
import userReducer, { UserState } from "./userReducer";
import usersReducer, { UsersState } from "./usersReducer";

export default combineReducers({
  userReducer,
  authReducer,
  recipeReducer,
  usersReducer,
  categoryReducer,
});

export interface RootState {
  userReducer: UserState;
  authReducer: AuthState;
  recipeReducer: RecipeState;
  usersReducer: UsersState;
  categoryReducer: string;
}
