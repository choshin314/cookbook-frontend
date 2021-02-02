import { SET_FLASH, CLEAR_FLASH } from '../actions/types'

export default function flashReducer(flashState=null, action) {
    switch(action.type) {
        case SET_FLASH:
            return { type: action.payload.type, message: action.payload.message }
        case CLEAR_FLASH:
            return null
        default:
            return flashState
    }
}