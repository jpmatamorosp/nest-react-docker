import { ActionTypes } from '../action-types';
import { AppDispach } from '../stores';

export const login = () => {
    return (dispatch: AppDispach) => {
        dispatch({
            type: ActionTypes.LOGIN,
            payload: {
                userName: 'Jean',
                password: 'P@$$w0rd'
            }
        });
    }
}