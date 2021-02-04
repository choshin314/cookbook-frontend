import { getLocalStorage } from "../../helpers";
import {
    FETCH_ALL_SOCIAL_START,
    FETCH_SOCIAL_START,
    FETCH_SOCIAL_FAIL,
    FETCH_SOCIAL_SUCCESS,
    DELETE_SOCIAL_SUCCESS,
    ADD_SOCIAL_SUCCESS,
    TOGGLE_SOCIAL
} from '../actions/types'

const initSocial = {
    following: {
        loading: false,
        userIds: {},
        error: null
    },
    followers: {
        loading: false,
        userIds: {},
        error: null
    },
    bookmarks: {
        loading: false,
        recipeIds: {},
        error: null
    },
    likes: {
        loading: false,
        recipeIds: {},
        error: null
    }
}

export default function reducer(social=initSocial, action) {
    switch(action.type) {
        case FETCH_ALL_SOCIAL_START:
            return {
                following: {
                    ...social.following,
                    error: null,
                    loading: true
                },
                followers: {
                    ...social.followers,
                    error: null,
                    loading: true
                },
                bookmarks: {
                    ...social.bookmarks,
                    error: null,
                    loading: true
                },
                likes: {
                    ...social.likes,
                    error: null,
                    loading: true
                }
            }

        case FETCH_SOCIAL_START:
            return {
                ...social,
                [action.payload]: {
                    ...social[action.payload],
                    error: null,
                    loading: true
                }
            }

        case FETCH_SOCIAL_FAIL: {
            let { category, error } = action.payload;
            return {
                ...social,
                [category]: {
                    ...social[category],
                    error: error,
                    loading: false
                }
            }
        }

        case FETCH_SOCIAL_SUCCESS: {
            let { category, dataName, data } = action.payload;
            const dataObj = {};
            data.forEach(el => dataObj[el.id] = true) //convert id array to obj with ids as keys
            return {
                ...social,
                [category]: {
                    ...social[category],
                    [dataName]: {
                        ...social[category][dataName],
                        ...dataObj
                    },
                    loading: false
                }
            }
        }

        case ADD_SOCIAL_SUCCESS: {
            let { category, dataName, data } = action.payload;
            return {
                ...social,
                [category]: {
                    ...social[category],
                    [dataName]: { 
                        ...social[category][dataName], 
                        [data.id]: true 
                    },
                    loading: false
                }
            }
        }

        case DELETE_SOCIAL_SUCCESS: {
            let { category, dataName, data } = action.payload;
            let filtered = social[category][dataName].filter(socialItem => (
                socialItem.id !== data.id
            ))
            return {
                ...social,
                [category]: {
                    ...social[category],
                    loading: false,
                    [dataName]: { 
                        ...social[category][dataName], 
                        [data.id]: false 
                    }
                }
            }
        }
        default:
            return social
    }
}

