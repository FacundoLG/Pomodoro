import {SET_USER_DATA} from "../types"

export type UserState = {
    username: string | null,
    image_url: string | null,
    tkn: string | null
}

const localUserData:UserState = JSON.parse(localStorage.getItem("userData")||"{}")

let initialState:UserState = {
    username: null,
    image_url: null,
    tkn: null,
}

if(localUserData?.tkn){
    initialState = localUserData
}

const userReducer = (state = initialState,action:{type: any, payload: UserState}) => {
    switch(action.type){
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
    
}

export default userReducer