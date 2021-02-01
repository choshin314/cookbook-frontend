import {USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS, LOGOUT } from './types'
import {sendJSON, sendMulti} from '../../helpers/sendAjax'
import {setLocalStorage} from '../../helpers'

export function loginUser(values) {
    return async (dispatch) => {
        dispatch({type: USER_AUTH_START});
        const result = await sendJSON('/auth/login', values);
        if (result.error) {
            setLocalStorage('accessToken', null)
            return dispatch({ type: USER_AUTH_FAIL, payload: result.error });
        }
        setLocalStorage('accessToken', result.data.accessToken);
        return dispatch({ type: USER_AUTH_SUCCESS, payload: result.data })
    }
}

export function registerUser(values) {
    return async (dispatch) =>  {
        dispatch({type: USER_AUTH_START});
        const result = await sendJSON('/auth/register', values);
        if (result.error) {
            setLocalStorage('accessToken', null)
            return dispatch({ type: USER_AUTH_FAIL, payload: result.error });
        }
        setLocalStorage('accessToken', result.data.accessToken);
        return dispatch({ type: USER_AUTH_SUCCESS, payload: result.data })
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.clear();
        dispatch({ type: LOGOUT });
    }
}