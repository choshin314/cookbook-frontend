import { ajax } from '../../helpers/sendAjax'
import { setFlash } from './flashActions';
import { setRedirect } from './redirectActions';

import {
    SET_PROFILE_STATS, 
    FETCH_PROFILE_START, 
    FETCH_PROFILE_SUCCESS, 
    FETCH_PROFILE_FAIL,
    CLEAR_PROFILE
} from './types'

export const setProfileStats = (stats) => ({
    type: SET_PROFILE_STATS,
    payload: stats
})

export const fetchProfileStart = () => ({
    type: FETCH_PROFILE_START
})

export const fetchProfileSuccess = (data) => ({
    type: FETCH_PROFILE_SUCCESS,
    payload: data
})

export const fetchProfileFail = (errorMsg) => ({
    type: FETCH_PROFILE_FAIL,
    payload: errorMsg
})

export const clearProfile = () => ({ type: CLEAR_PROFILE })

export const fetchProfile = (username, userId, replaceHistory) => {
    return async (dispatch, getState) => {
        dispatch(fetchProfileStart());
        const { data:userData, error:userErr, status:userStatus } = await ajax.get(`/users/${username}`);
        const { data:statsData, error:statsErr, status:statsStatus } = await ajax.get(`/users/${username}/stats`);
        if (userData && statsData) {
            dispatch(fetchProfileSuccess({ user: userData, stats: statsData }))
        } else if (userStatus === 404 && userId) { //retry with userId in case username was stale
            const { 
                data:userData2, error:userErr2, status:userStatus2 
            } = await ajax.get(`/users/${userId}?by=id`);
            const { 
                data:statsData2, error:statsErr2, status:statsStatus2 
            } = await ajax.get(`/users/${userId}/stats?by=id`);
            if (userData2 && statsData2) {
                dispatch(fetchProfileSuccess({ user: userData2, stats: statsData2 }))
                replaceHistory(`/profile/view/${userData2.username}`)
            } else {
                dispatch(setFlash('error', 'Could not find the requested profile'))
                // dispatch(setRedirect('/'))
                replaceHistory('/')
                return dispatch(fetchProfileFail('Could not retrieve profile info'));
            }
        } else {
            dispatch(setFlash('error', 'Could not find the requested profile'))
            // dispatch(setRedirect('/'))
            replaceHistory('/')
            return dispatch(fetchProfileFail('Could not retrieve profile info'));
        } 
    }
}

export const fetchProfileStats = (username) => {
    return async (dispatch, getState) => {
        const { data, error } = await ajax.get(`/users/${username}/stats`);
        if (error) {
            dispatch(setFlash('error', 'Could not find the requested info'))
            dispatch(setRedirect('/'))
            return dispatch(fetchProfileFail('Could not update user stats'));
        }
        dispatch(setProfileStats(data))
    }
}