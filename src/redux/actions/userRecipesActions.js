import {
    FETCH_USER_RECIPES_START,
    FETCH_USER_RECIPES_SUCCESS,
    FETCH_USER_RECIPES_FAIL
} from './types'

export function fetchUserRecipesStart(category) {
    return {
        type: FETCH_USER_RECIPES_START,
        payload: { category: category}
    }
}

export function fetchUserRecipesSuccess(category, recipes) {
    return {
        type: FETCH_USER_RECIPES_SUCCESS,
        payload: { category: category, recipes: recipes }
    }
}

export function fetchUserRecipesFail(category, error) {
    return {
        type: FETCH_USER_RECIPES_FAIL,
        payload: { category: category, error: error }
    }
}

export const fetchUserRecipesOwn = (username) => {
    return function(dispatch, getState) {
        dispatch(fetchUserRecipesStart('user'));
        fetch(`http://localhost:5000/api/recipes/user/${username}`)
            .then(res => res.json())
            .then(recipes => dispatch(fetchUserRecipesSuccess('user', recipes)))
            .catch(err => dispatch(fetchUserRecipesFail('user', err.message)))
    }
}

export const fetchUserRecipesBookmarks = (username) => {
    return function(dispatch, getState) {
        dispatch(fetchUserRecipesStart('bookmarks'));
        fetch(`http://localhost:5000/api/recipes/bookmarks/${username}`)
            .then(res => res.json())
            .then(recipes => dispatch(fetchUserRecipesSuccess('bookmarks', recipes)))
            .catch(err => dispatch(fetchUserRecipesFail('bookmarks', err.message)))
    }
}