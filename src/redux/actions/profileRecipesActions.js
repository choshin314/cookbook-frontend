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
    return function(dispatch, getState) {
        dispatch(fetchProfileRecipesStart('user'));
        fetch(`http://localhost:5000/api/recipes/user/${username}`)
            .then(res => res.json())
            .then(recipes => dispatch(fetchProfileRecipesSuccess('user', recipes)))
            .catch(err => dispatch(fetchProfileRecipesFail('user', err.message)))
    }
}

export const fetchProfileRecipesBookmarks = (username) => {
    return function(dispatch, getState) {
        dispatch(fetchProfileRecipesStart('bookmarks'));
        fetch(`http://localhost:5000/api/recipes/bookmarks/${username}`)
            .then(res => res.json())
            .then(recipes => dispatch(fetchProfileRecipesSuccess('bookmarks', recipes)))
            .catch(err => dispatch(fetchProfileRecipesFail('bookmarks', err.message)))
    }
}