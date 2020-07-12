import { combineReducers } from "redux";
import userReducer, { UserState } from "./userReducer";
import countReducer, { CountState } from "./countReducer";

export default combineReducers({
  userReducer,
  countReducer,
});

export interface RootState {
  userReducer: UserState;
  countReducer: CountState;
}
