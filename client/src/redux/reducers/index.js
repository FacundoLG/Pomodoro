import { combineReducers } from "redux";
import userReducer from "./user";
import presetReducer from "./presets";
const reducers = combineReducers({
    user:userReducer,
    presets: presetReducer
})
export default reducers