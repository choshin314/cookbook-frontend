import {
    SET_PROFILE_STATS, 
    FETCH_PROFILE_START, 
    FETCH_PROFILE_SUCCESS, 
    FETCH_PROFILE_FAIL
} from './types'

const apiBase = process.env.REACT_APP_API_BASE;

export const setProfileStats = (stats) => ({
    type: SET_PROFILE_STATS,
    payload: stats
})

export const fetchProfileStart = () => ({
    type: FETCH_PROFILE_START
})

export const fetchProfileSuccess = (userData) => ({
    type: FETCH_PROFILE_SUCCESS,
    payload: userData
})

export const fetchProfileFail = (errorMsg) => ({
    type: FETCH_PROFILE_FAIL,
    payload: errorMsg
})

export const fetchProfile = (username) => {
    return async (dispatch, getState) => {
        dispatch(fetchProfileStart());
        try {
            const response = await Promise.all([
                fetch(`${apiBase}/users/${username}`), 
                fetch(`${apiBase}/users/${username}/stats`)
            ]);
            const profileUser = await response[0].json();
            const profileStats = await response[1].json();
            if (!response[0].ok) throw new Error(profileUser.message);
            if (!response[1].ok) throw new Error(profileStats.message);
            dispatch(fetchProfileSuccess([profileUser, profileStats]))
        } catch(err) {
            dispatch(fetchProfileFail(err.message));
        }
    }
}