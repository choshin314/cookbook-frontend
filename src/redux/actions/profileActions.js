import { ajax } from '../../helpers/sendAjax'
import { setFlash } from './flashActions';
import { setRedirect } from './redirectActions';

import {
    SET_PROFILE_STATS, 
    FETCH_PROFILE_START, 
    FETCH_PROFILE_SUCCESS, 
    FETCH_PROFILE_FAIL
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

export const fetchProfile = (username) => {
    return async (dispatch, getState) => {
        dispatch(fetchProfileStart());
        const { data:userData, error:userErr } = await ajax.get(`/users/${username}`);
        const { data:statsData, error:statsErr } = await ajax.get(`/users/${username}/stats`);
        if (userErr || statsErr) {
            dispatch(setFlash('error', 'Could not find the requested profile'))
            dispatch(setRedirect('/'))
            return dispatch(fetchProfileFail('Could not retrieve profile info'));
        }
        dispatch(fetchProfileSuccess({ user: userData, stats: statsData }))
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