import {USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS, LOGOUT, BACK_TO_REFERRER } from './types'
import {setFlash} from './flashActions'
import { setRedirect, redirectWithReferrer, backToReferrer } from './redirectActions'
import { ajax } from '../../helpers/sendAjax'

//ajax return is always either error msg (string) or { accessToken, user }
export const userAuthStart = () => ({ type: USER_AUTH_START })
export const userAuthFail = (error) => ({ type: USER_AUTH_FAIL, payload: error }) 
export const userAuthSuccess = (data) => ({ type: USER_AUTH_SUCCESS, payload: data })

export function loginUser(values) {
    return async (dispatch) => {
        dispatch(userAuthStart());
        const { data, error } = await ajax.post('/auth/login', values);
        if (error) return dispatch(userAuthFail(error));
        dispatch(userAuthSuccess(data))
        dispatch(setFlash('success', `Welcome back ${data.user.firstName}`))
        dispatch(backToReferrer()) 
    }
}

export function registerUser(values) {
    return async (dispatch) =>  {
        dispatch(userAuthStart());
        const result = await ajax.post('/auth/register', values);
        if (result.data) dispatch(userAuthSuccess(result.data));
        if (result.error) dispatch(userAuthFail(result.error));
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        dispatch(setRedirect('/account/login'));
    }
}

export function checkAuth(referrer) {
    return async (dispatch, getState) => {
        dispatch(userAuthStart());
        const result = await ajax.get('/auth/user', getState().auth.accessToken);
        if (result.error) {
            localStorage.clear();
            dispatch(userAuthFail(result.error))
            dispatch(redirectWithReferrer('/account/login', referrer));
        }
        dispatch(userAuthSuccess(result.data))
    }
}