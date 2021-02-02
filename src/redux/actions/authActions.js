import {USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS, LOGOUT, SET_REDIRECT, REDIRECT_WITH_REFERRER, BACK_TO_REFERRER } from './types'
import {setFlash} from './flashActions'
import {sendJSON, getAjax} from '../../helpers/sendAjax'

//ajax return is always either error msg (string) or { accessToken, user }
export function loginUser(values) {
    return async (dispatch) => {
        dispatch({type: USER_AUTH_START});
        const result = await sendJSON('/auth/login', values);
        if (result.error) {
            return dispatch({ type: USER_AUTH_FAIL, payload: result.error });
        }
        dispatch({ type: USER_AUTH_SUCCESS, payload: result.data });
        dispatch(setFlash('success', `Welcome back ${result.data.user.firstName}`))
        return dispatch({ type: BACK_TO_REFERRER });
    }
}

export function registerUser(values) {
    return async (dispatch) =>  {
        dispatch({type: USER_AUTH_START});
        const result = await sendJSON('/auth/register', values);
        if (result.error) {
            return dispatch({ type: USER_AUTH_FAIL, payload: result.error });
        }
        return dispatch({ type: USER_AUTH_SUCCESS, payload: result.data })
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.clear();
        dispatch({ type: SET_REDIRECT, payload: '/account/login' });
        dispatch({ type: LOGOUT });
    }
}

export function checkAuth(referrer) {
    return async (dispatch, getState) => {
        dispatch({ type: USER_AUTH_START });
        const token = getState().auth.accessToken;
        const result = await getAjax('/auth/user', token);
        if (result.error) {
            localStorage.clear();
            dispatch({ type: USER_AUTH_FAIL, payload: result.error })
            return dispatch({ type: REDIRECT_WITH_REFERRER, payload: { to: '/account/login', referrer: referrer} });
        }
        return dispatch({ 
            type: USER_AUTH_SUCCESS, 
            payload: result.data
        })
    }
}