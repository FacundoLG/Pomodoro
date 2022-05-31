import _default from "react-redux/es/components/connect"
import { Action } from "redux"
import { Preset } from "../../types"
import {SET_ACTIVE_PRESET, SET_PRESETS} from "../types"

export type PresetState = {
    presets: Preset[]
    active_preset?: Preset
}

const initialState:PresetState = {
    presets: [],
}



const presetReducer = (state = initialState,action: {type: string ,payload: PresetState}) => {
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