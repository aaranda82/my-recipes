import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";
import recipeReducer, { RecipeState } from "./recipeReducer";
import userReducer, { UserState } from "./userReducer";
import usersReducer, { UsersState } from "./usersReducer";

export default combineReducers({
  userReducer,
  authReducer,
  recipeReducer,
  usersReducer,
});

export interface RootState {
  userReducer: UserState;
  authReducer: AuthState;
  recipeReducer: RecipeState;
  usersReducer: UsersState;
}
