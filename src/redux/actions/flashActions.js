import { SET_FLASH, CLEAR_FLASH } from './types'

export function setFlash(type, message) {
    return (dispatch) => {
        dispatch({type: CLEAR_FLASH});
        dispatch({type: SET_FLASH, payload: { type: type, message: message }})
    }
}

export function clearFlash() {
    return { type: CLEAR_FLASH }
}