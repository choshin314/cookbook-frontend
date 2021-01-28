export function setUser(user) {
    return { type: "SET_USER", payload: user }
}

export function updateUserDetail(userDetail) {
    return { type: "UPDATE_USER_DETAIL", payload: userDetail }
}

export function clearUser() {
    return { type: "CLEAR_USER" }
}
