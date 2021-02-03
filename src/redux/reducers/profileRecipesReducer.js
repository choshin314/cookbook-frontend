import {
    FETCH_PROFILE_RECIPES_START,
    FETCH_PROFILE_RECIPES_SUCCESS,
    FETCH_PROFILE_RECIPES_FAIL
} from '../actions/types'

const initProfileRecipes = {
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

export default function profileRecipesReducer(profileRecipes=initProfileRecipes, action) {
    const payload = action.payload;
    switch(action.type) {
        case FETCH_PROFILE_RECIPES_START:
            return {
                ...profileRecipes,
                [payload.category]: { ...profileRecipes[payload.category], loading: true }
            }
        case FETCH_PROFILE_RECIPES_SUCCESS:
            return {
                ...profileRecipes,
                [payload.category]: { recipes: payload.recipes, loading: false, error: null }
            }

        case FETCH_PROFILE_RECIPES_FAIL:
            return {
                ...profileRecipes,
                [payload.category]: {
                    ...profileRecipes[payload.category],
                    loading: false,
                    error: payload.error
                }
            }
        default: 
            return profileRecipes;
    }
}