import { convertToQueryString } from '../../helpers'
import { ajax } from '../../helpers/sendAjax'
import { setFlash } from './flashActions'
import {
    SEARCH_ALL_START,
    SEARCH_START,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    RESET_SEARCH
} from './types'

export const searchAllStart = () => ({ type: SEARCH_ALL_START })
export const searchStart = (category) => ({ type: SEARCH_START, payload: category })
export const searchFail = (category, error) => ({ type: SEARCH_FAIL, payload: { category, error } })
export const searchSuccess = (category, data) => ({ type: SEARCH_SUCCESS, payload: { category, data }})
export const resetSearch = () => ({ type: RESET_SEARCH })

export function getSearchResults(category, query, filter) {
    return async function(dispatch, getState) {
        const formattedQuery = convertToQueryString(query);
        const { ids: uniqueIds, results: currentResults } = getState().search[category];
        let uniqueResults;
        dispatch(searchStart(category));
        const result = await ajax.get(`/${category}?q=${formattedQuery}&filter=${filter}&o=${currentResults.length}`);
        if (result.error) {
            dispatch(setFlash('error', "Uh oh, couldn't get search results.  Try again later."));
            return dispatch(searchFail(category, result.error))
        } 
        uniqueResults = result.data.filter(item => !uniqueIds[item.id]);
        dispatch(searchSuccess(category, uniqueResults))
    }
}