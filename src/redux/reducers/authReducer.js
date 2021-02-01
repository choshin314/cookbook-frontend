import {USER_AUTH_FAIL, USER_AUTH_START, USER_AUTH_SUCCESS, LOGOUT } from '../actions/types'
import { getLocalStorage } from "../../helpers"

let initAuth = getLocalStorage('auth') || {};

export default function authReducer(authState=initAuth, action) {
    switch (action.type) {
        case USER_AUTH_START:
            return { ...authState, loading: true }
        case USER_AUTH_FAIL:
            return { 
                accessToken: null, 
                user: null, 
                loading: false, 
                error: action.payload
            }
        case USER_AUTH_SUCCESS:
            return { 
                accessToken: action.payload.accessToken, 
                user: action.payload.user,
                error: null,
                loading: false
            }
        case LOGOUT:
            return {
                accessToken: null,
                user: null,
                error: null,
                loading: false
            }
        default: 
            return authState
    }
}

