import { SET_REDIRECT, CLEAR_REDIRECT, REDIRECT_WITH_REFERRER, BACK_TO_REFERRER, SET_REFERRER } from '../actions/types'

const initRedirectState = { to: null, referrer: null };

export default function redirectReducer(redirectState=initRedirectState, action) {
    switch(action.type) {
        case SET_REDIRECT: 
            return { to: action.payload }

        case SET_REFERRER:
            return { ...redirectState, referrer: action.payload }

        case REDIRECT_WITH_REFERRER:
            return { to: action.payload.to, referrer: action.payload.referrer }

        case BACK_TO_REFERRER:
            return { to: redirectState.referrer || '/' }

        case CLEAR_REDIRECT:
            return null

        default:
            return redirectState
    }
}