import { ajax } from '../../helpers/sendAjax'
import {
    FETCH_PROFILE_RECIPES_START,
    FETCH_PROFILE_RECIPES_SUCCESS,
    FETCH_PROFILE_RECIPES_FAIL
} from './types'

export function fetchProfileRecipesStart(category) {
    return {
        type: FETCH_PROFILE_RECIPES_START,
        payload: { category: category}
    }
}

export function fetchProfileRecipesSuccess(category, recipes) {
    return {
        type: FETCH_PROFILE_RECIPES_SUCCESS,
        payload: { category: category, recipes: recipes }
    }
}

export function fetchProfileRecipesFail(category, error) {
    return {
        type: FETCH_PROFILE_RECIPES_FAIL,
        payload: { category: category, error: error }
    }
}

export const fetchProfileRecipesOwn = (username) => {
    return async function(dispatch, getState) {
        dispatch(fetchProfileRecipesStart('user'));
        const { data, error } = await ajax.get(`/recipes/user/${username}`);
        if (error) return dispatch(fetchProfileRecipesFail('user', error));
        dispatch(fetchProfileRecipesSuccess('user', data));
    }
}

export const fetchProfileRecipesBookmarks = (username) => {
    return async function(dispatch, getState) {
        dispatch(fetchProfileRecipesStart('bookmarks'));
        const { data, error } = await ajax.get(`/recipes/bookmarks/${username}`);
        if (error) return dispatch(fetchProfileRecipesFail('bookmarks', error));
        dispatch(fetchProfileRecipesSuccess('bookmarks', data));
    }
}