import { combineReducers } from "redux";
import userReducer, { UserState } from "./user";
import presetReducer, { PresetState } from "./presets";

export type ReducersType = {
    user: UserState,
    preset: PresetState
  }


const reducers = combineReducers({
    user:userReducer,
    presets: presetReducer
})
export default reducers