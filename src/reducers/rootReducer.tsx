import { combineReducers } from "redux";
import userReducer, { UserState } from "./userReducer";
import userRecipeReducer, { userRecipeState } from "./userRecipeReducer";

export default combineReducers({
  userReducer,
  userRecipeReducer,
});

export interface RootState {
  userReducer: UserState;
  userRecipeReducer: userRecipeState[];
}
