import { combineReducers } from "redux";
import userReducer from "./userReducer";
import viewReducer from "./viewReducer";
import countReducer from "./countReducer";

export default combineReducers({
  userReducer,
  viewReducer,
  countReducer,
});
