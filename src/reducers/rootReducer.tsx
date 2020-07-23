import { combineReducers } from "redux";
import userReducer, { UserState } from "./userReducer";

export default combineReducers({
  userReducer,
});

export interface RootState {
  userReducer: UserState;
}
