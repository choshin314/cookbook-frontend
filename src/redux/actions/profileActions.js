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
            const data = await response.map(res => res.json());
            if (!response[0].ok) throw new Error(data[0].message);
            if (!response[1].ok) throw new Error(data[1].message);
            dispatch(fetchProfileSuccess(data))
        } catch(err) {
            console.log(err.message);
            dispatch(fetchProfileFail(err.message));
        }
    }
}