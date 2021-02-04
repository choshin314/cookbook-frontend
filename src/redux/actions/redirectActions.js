import { SET_REDIRECT, CLEAR_REDIRECT, SET_REFERRER, REDIRECT_WITH_REFERRER, BACK_TO_REFERRER } from './types'

export function setRedirect(path) {
    return (dispatch) => {
        dispatch({ type: SET_REDIRECT, payload: path });
    }
}

export const setReferrer = (path) => ({ type: SET_REFERRER, payload: path })

export const redirectWithReferrer = (path, referrer) => ({
    type: REDIRECT_WITH_REFERRER,
    payload: { to: path, referrer: referrer }
})

export const backToReferrer = () => ({ type: BACK_TO_REFERRER })