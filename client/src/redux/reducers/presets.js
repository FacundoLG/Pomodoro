import _default from "react-redux/es/components/connect"
import {SET_ACTIVE_PRESET, SET_PRESETS} from "../types"
const initialState = {
    presets: [],
    active_preset: {}
}

const presetReducer = (state = initialState,action) => {
    switch(action.type){
        case SET_PRESETS:
            return {
                ...state,
                presets: action.payload
            }
        case SET_ACTIVE_PRESET:
            return{
                ...state,
                active_preset: action.payload
            }
        default:
            return state
    }
}

export default presetReducer