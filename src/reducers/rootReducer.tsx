import { combineReducers } from "redux";
import userReducer, { UserState } from "./userReducer";
import authReducer, { AuthState } from "./authReducer";
import recipeReducer, { RecipeState } from "./recipeReducer";
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
