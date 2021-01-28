import { getLocalStorage } from "../../helpers"

const persistedUser = getLocalStorage('user');
const initUser = persistedUser ? persistedUser : null;

export default function userReducer(user=initUser, action) {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        case "UPDATE_USER_DETAIL":
            return { ...user, ...action.payload }
        case "CLEAR_USER":
            return null
        default: 
            return user
    }
}
