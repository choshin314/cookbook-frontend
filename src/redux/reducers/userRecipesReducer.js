import {
    FETCH_USER_RECIPES_START,
    FETCH_USER_RECIPES_SUCCESS,
    FETCH_USER_RECIPES_FAIL
} from '../actions/types'

const initUserRecipes = {
    user: {
        loading: false,
        recipes: [],
        error: null,
    },
    bookmarks: {
        loading: false,
        recipes: [],
        error: null
    }
};

export default function userRecipesReducer(userRecipes=initUserRecipes, action) {
    const payload = action.payload;
    switch(action.type) {
        case FETCH_USER_RECIPES_START:
            return {
                ...userRecipes,
                [payload.category]: { ...userRecipes[payload.category], loading: true }
            }
            break;

        case FETCH_USER_RECIPES_SUCCESS:
            return {
                ...userRecipes,
                [payload.category]: { recipes: payload.recipes, loading: false, error: null }
            }
            break;

        case FETCH_USER_RECIPES_FAIL:
            return {
                ...userRecipes,
                [payload.category]: {
                    ...userRecipes[payload.category],
                    loading: false,
                    error: payload.error
                }
            }
            break;
        default: 
            return userRecipes;
    }
}