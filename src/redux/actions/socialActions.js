import { ajax } from "../../helpers/sendAjax";
import {setRedirect} from '../actions/redirectActions'
import {setFlash} from '../actions/flashActions'
import {
    FETCH_ALL_SOCIAL_START,
    FETCH_SOCIAL_START,
    FETCH_SOCIAL_FAIL,
    FETCH_SOCIAL_SUCCESS,
    DELETE_SOCIAL_SUCCESS,
    ADD_SOCIAL_SUCCESS,
    TOGGLE_SOCIAL
} from './types'

export function fetchAllSocial() {
    return async (dispatch, getState) => {
        const following = await ajax.get('/social/following', getState().auth.accessToken);
        const followers = await ajax.get('/social/followers', getState().auth.accessToken);
        const bookmarks = await ajax.get(`/social/bookmarks`, getState().auth.accessToken);
        const likes = await ajax.get('/social/likes', getState().auth.accessToken)

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

// export function fetchOneSocial(category, dataName) {
//     return async (dispatch, getState) => {
//         dispatch(fetchSocialStart(category));
//         const {data, error} = await ajax.get(`/social/${category}`, getState().auth.accessToken);
//         if (error) dispatch(fetchSocialFail(category, error));
//         if (data) dispatch(fetchSocialSuccess(category, dataName, data))
//     }
// }

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
        const {data, error} = await ajax.post(`/social/${category}`, id, getState().auth.accessToken);
        if (error) dispatch(fetchSocialFail(category, error));
        if (error === "Not authorized to access") {
            dispatch(setFlash('error', 'Login required'));
            dispatch(setRedirect('/account/login'));
        }
        if (data) dispatch(addSocialSuccess(category, dataName, data));
        //if successful, backend will send back the newly added recipeId(bookmarks / likes) 
        //or userId(following) in format { id: id }
    }
}

export function removeSocial(category, dataName, id) {
    return async (dispatch, getState) => {
        dispatch(fetchSocialStart(category));
        const { data, error } = await ajax.delete(`/social/${category}/${id}`, getState().auth.accessToken);
        if (error) dispatch(fetchSocialFail(category, error));
        if (error === "Not authorized to access") {
            dispatch(setFlash('error', 'Login required'));
            dispatch(setRedirect('/account/login'));
        }
        if (data) dispatch(deleteSuccess(category, dataName, data));
        //if successful, backend will send back the newly deleted recipeId(bookmarks / likes) 
        //or userId(following) in format { id: id }
    }
}