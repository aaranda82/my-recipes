import { combineReducers } from "redux";
import userReducer, { UserState } from "./userReducer";
import authReducer, { AuthState } from "./authReducer";

export default combineReducers({
  userReducer,
  authReducer,
});

export interface RootState {
  userReducer: UserState;
  authReducer: AuthState;
}
