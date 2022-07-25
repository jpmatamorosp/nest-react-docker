import { ActionTypes } from '../action-types';
import { Actions } from '../actions/index';
type User = {
    userName: string,
    token: string
}

export const authReducer = (state: Actions | null, action: Actions) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return { userName: action.payload.userName, token: "" };
        case ActionTypes.LOGOUT:
            return null;
    
        default:
            return state;
    }
}