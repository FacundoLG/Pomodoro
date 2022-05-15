import {SET_USER_DATA} from "../types"

type UserState = {
    username: string | null,
    image_url: string | null,
    tkn: string | null
}


const initialState:UserState = {
    username: null,
    image_url: null,
    tkn: null,
}

const userReducer = (state = initialState,action:any) => {
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