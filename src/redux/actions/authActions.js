import {USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS, UPDATE_USER_DETAILS, LOGOUT, BACK_TO_REFERRER } from './types'
import {setFlash} from './flashActions'
import { setRedirect, redirectWithReferrer, backToReferrer } from './redirectActions'
import { ajax } from '../../helpers/sendAjax'
import { fetchAllSocial } from './socialActions'
import { getLocalStorage, setLocalStorage } from '../../helpers'

//ajax return is always either error msg (string) or { accessToken, user }
export const userAuthStart = () => ({ type: USER_AUTH_START })
export const userAuthFail = (error) => ({ type: USER_AUTH_FAIL, payload: error }) 
export const userAuthSuccess = (data) => ({ type: USER_AUTH_SUCCESS, payload: data })
export const updateUserDetails = (data) => ({ type: UPDATE_USER_DETAILS, payload: data })

export function loginUser(values) {
    return async (dispatch) => {
        dispatch(userAuthStart());
        const { data, error } = await ajax.post('/auth/login', values);
        if (error) return dispatch(userAuthFail(error));
        setLocalStorage('accessToken', data.accessToken);
        setLocalStorage('refreshToken', data.refreshToken);
        dispatch(userAuthSuccess(data))
        await dispatch(fetchAllSocial())
        dispatch(backToReferrer()) 
    }
}

export function registerUser(values) {
    return async (dispatch) =>  {
        dispatch(userAuthStart());
        const { data, error } = await ajax.post('/auth/register', values);
        if (error) {
            dispatch(userAuthFail(error))
            dispatch(setFlash('error', error))
        }
        if (data) {
            setLocalStorage('accessToken', data.accessToken);
            setLocalStorage('refreshToken', data.refreshToken);
            dispatch(userAuthSuccess(data))
            dispatch(setFlash('success', "Success! Let's get cookin!"))
            dispatch(backToReferrer())
        }
    }
}

export function logoutUser() {
    return async (dispatch, getState) => {
        await ajax.delete('/auth/logout/single-location', { 
            refreshToken: getState().auth.refreshToken
        })
        dispatch({ type: LOGOUT });
        dispatch(setRedirect('/account/login'));
    }
}

export function checkAuth(referrer) {
    return async (dispatch, getState) => {
        dispatch(userAuthStart());
        const result = await ajax.get('/auth/user');
        if (result.error) {
            localStorage.clear();
            dispatch(userAuthFail(result.error))
            dispatch(redirectWithReferrer('/account/login', referrer));
        }
        dispatch(userAuthSuccess(result.data))
    }
}