import _default from "react-redux/es/components/connect"
import {SET_PRESETS} from "../types"

const initialState = {
    presets: []
}

const presetReducer = (state = initialState,action) => {
    switch(action.type){
        case SET_PRESETS:
            return {
                ...state,
                presets: action.payload
            }
        default:
            return state
    }
}

export default presetReducer