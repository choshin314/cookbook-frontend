import { ajax } from "../../helpers/sendAjax";
import {setRedirect} from '../actions/redirectActions'
import {setFlash} from '../actions/flashActions'
import {
    FETCH_ALL_SOCIAL_START,
    FETCH_SOCIAL_START,
    FETCH_SOCIAL_FAIL,
    FETCH_SOCIAL_SUCCESS,
    DELETE_SOCIAL_SUCCESS,
    ADD_SOCIAL_SUCCESS
} from './types'
import { fetchProfileStats } from "./profileActions";


export const fetchAllSocialStart = () => ({ type: FETCH_ALL_SOCIAL_START })

export const fetchSocialStart = (category) => ({ 
    type: FETCH_SOCIAL_START, 
    payload: category 
});

export const fetchSocialFail = (category, error) => ({ 
    type: FETCH_SOCIAL_FAIL, 
    payload: { category, error }
});

export const fetchSocialSuccess = (category, dataName, data) => ({ 
    type: FETCH_SOCIAL_SUCCESS, 
    payload: { category, dataName, data } 
});

export const addSocialSuccess = (category, dataName, data) => ({ 
    type: ADD_SOCIAL_SUCCESS, 
    payload: { category, dataName, data } 
});

export const deleteSuccess = (category, dataName, data) => ({ 
    type: DELETE_SOCIAL_SUCCESS, 
    payload: { category, dataName, data } 
});

export function addSocial(category, dataName, id) {
    return async (dispatch, getState) => {
        dispatch(fetchSocialStart(category));
        const {data, error} = await ajax.post(`/social/${category}`, { id: id });
        if (error) dispatch(fetchSocialFail(category, error));
        if (error === "Not authorized to access") {
            dispatch(setFlash('error', 'Login required'));
            dispatch(setRedirect('/account/login'));
        }
        if (data) dispatch(addSocialSuccess(category, dataName, data ));
        //if successful, backend will send back the newly added recipeId(bookmarks / likes) 
        //or userId(following) in format { id: id }
        const profileUser = getState().profile.user;
        const currentUser = getState().auth.user;
        if (profileUser && category === "following") {
            if (profileUser.id === data.id || (currentUser && currentUser.id === profileUser.id)) {
                dispatch(fetchProfileStats(profileUser.username))
            }
        } 
        //if the profile of the person being followed/unfollowed is currently being viewed, OR
        //if the current user is viewing their own profile when adding/removing a follow,
        //fetch fresh 'profile stats' data
    }
}

export function removeSocial(category, dataName, id) {
    return async (dispatch, getState) => {
        dispatch(fetchSocialStart(category));
        const { data, error } = await ajax.delete(`/social/${category}/${id}`);
        if (error) dispatch(fetchSocialFail(category, error));
        if (error === "Not authorized to access") {
            dispatch(setFlash('error', 'Login required'));
            dispatch(setRedirect('/account/login'));
        }
        if (data) dispatch(deleteSuccess(category, dataName, data));
        //if successful, backend will send back the newly deleted recipeId(bookmarks / likes) 
        //or userId(following) in format { id: id }
        const profileUser = getState().profile.user;
        const currentUser = getState().auth.user;
        if (profileUser && category === "following") {
            if (profileUser.id === data.id || (currentUser && currentUser.id === profileUser.id)) {
                dispatch(fetchProfileStats(profileUser.username))
            }
        } 
    }
}

export function toggleSocial(category, dataName, id) {
    return async (dispatch, getState) => {
        const social = getState().social;
        if (social[category].loading) return;
        if (!getState().auth.user) {
            return dispatch(setFlash('info', 'Login required for social features'))
        }
        if (social[category][dataName][id]) {
            dispatch(removeSocial(category, dataName, id))
        } else {
            dispatch(addSocial(category, dataName, id))
        }
    }
}

export function fetchAllSocial() {
    return async (dispatch, getState) => {
        dispatch(fetchAllSocialStart());
        const following = await ajax.get('/social/following');
        const followers = await ajax.get('/social/followers');
        const bookmarks = await ajax.get(`/social/bookmarks`);
        const likes = await ajax.get('/social/likes');

        if(following.error) dispatch(fetchSocialFail('following', following.error))
        if(following.data) dispatch(fetchSocialSuccess('following', 'userIds', following.data))

        if(followers.error) dispatch(fetchSocialFail('followers', followers.error))
        if(followers.data) dispatch(fetchSocialSuccess('followers', 'userIds', followers.data))

        if(bookmarks.error) dispatch(fetchSocialFail('bookmarks', bookmarks.error))
        if(bookmarks.data) dispatch(fetchSocialSuccess('bookmarks', 'recipeIds', bookmarks.data))

        if(likes.error) dispatch(fetchSocialFail('likes', likes.error))
        if(likes.data) dispatch(fetchSocialSuccess('likes', 'recipeIds', likes.data))
    }
}