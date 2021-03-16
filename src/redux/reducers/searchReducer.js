import { getLocalStorage } from "../../helpers";
import {
    SEARCH_ALL_START,
    SEARCH_START,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    RESET_SEARCH,
    LOGOUT
} from '../actions/types'

let initSearch = getLocalStorage('searchResults') || {
    users: {
        loading: false,
        ids: {},
        results: [],
        endOfResults: false,
        error: null
    },
    recipes: {
        loading: false,
        ids: {},
        results: [],
        endOfResults: false,
        error: null
    }
}

//fetch users - store list of userIds and users 
//if results.data.length <  limit, endOfList = true 
//fetch more users 
    //send same request, this time with offset = users.length 
    //usersToAdd = results.data.filter(user => !userIds[user.id])
    //spread usersToAdd into users list, add those IDs to userIds
export default function reducer(searchResults=initSearch, action) {
    switch(action.type) {
        case RESET_SEARCH:
        case LOGOUT:
            return {
                users: {
                    loading: false,
                    ids: {},
                    results: [],
                    endOfResults: false,
                    error: null
                },
                recipes: {
                    loading: false,
                    ids: {},
                    results: [],
                    endOfResults: false,
                    error: null
                }
            }
        case SEARCH_ALL_START:
            return {
                users: {
                    loading: false,
                    ids: {},
                    results: [],
                    endOfResults: false,
                    error: null
                },
                recipes: {
                    loading: false,
                    ids: {},
                    results: [],
                    endOfResults: false,
                    error: null
                }
            }

        case SEARCH_START: {
            const category = action.payload;
            return {
                ...searchResults,
                [category]: {
                    ...searchResults[category],
                    error: null,
                    loading: true
                }
            }
        }

        case SEARCH_FAIL: {
            const { category, error } = action.payload;
            return {
                ...searchResults,
                [category]: {
                    ...searchResults[category],
                    error: error,
                    loading: false
                }
            }
        }
        
        case SEARCH_SUCCESS: {
            const { category, data: newResults } = action.payload;
            const additionalIds = {};
            newResults.forEach(newResult => {
                additionalIds[newResult.id] = true;
            });
            return {
                ...searchResults,
                [category]: {
                    ...searchResults[category],
                    error: false,
                    loading: false,
                    ids: { ...searchResults[category].ids, ...additionalIds },
                    results: [ ...searchResults[category].results, ...newResults ],
                    endOfResults: newResults.length === 0
                }
            }
        }

        default:
            return searchResults
    }
}

