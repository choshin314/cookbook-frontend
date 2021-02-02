import { SET_REDIRECT, CLEAR_REDIRECT, SET_REFERRER } from './types'

export function setRedirect(path) {
    return (dispatch) => {
        setTimeout(() => dispatch({ type: CLEAR_REDIRECT }), 0);
        dispatch({ type: SET_REDIRECT, payload: path });
    }
}

export function setReferrer(path) {
    return {
        type: SET_REFERRER,
        payload: path
    }
}