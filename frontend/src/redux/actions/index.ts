import { ActionTypes } from "./../action-types/index";

type Login = {
    type: ActionTypes.LOGIN,
    payload: { userName: string, password: string}
}

type Logout = {
    type: ActionTypes.LOGOUT
}

export type Actions = Login | Logout;