import { 
    FETCH_FEED_START, 
    FETCH_FEED_SUCCESS, 
    FETCH_FEED_FAIL, 
    STORE_FRESH_FEED_ITEMS, 
    SHOW_FRESH_FEED_ITEMS,
    RESET_FEEDS 
} from './types'
import { ajax } from '../../helpers/sendAjax'
import { setFlash } from './flashActions'
import { logoutUser } from './authActions'

export const resetFeeds = () => ({ type: RESET_FEEDS })
export const fetchFeedStart = () => ({ type: FETCH_FEED_START })
export const fetchFeedFail = (error) => ({ type: FETCH_FEED_FAIL, payload: error })
export const fetchFeedSuccess = (feedName, recipes) => ({ 
    type: FETCH_FEED_SUCCESS, 
    payload: { feedName, recipes }  
})
export const storeFreshFeedItems = (feedName, recipes) => ({
    type: STORE_FRESH_FEED_ITEMS,
    payload: { feedName, recipes }
})
export const showFreshFeedItems = (feedName) => ({ type: SHOW_FRESH_FEED_ITEMS, payload: feedName })

export function fetchFeedFirst(feedName) {
    return async (dispatch, getState) => {
        dispatch(resetFeeds());
        dispatch(fetchFeedStart());
        let oldestTime = getState().feeds[feedName].oldestTime;
        const result = await ajax.get(`/recipes/feed/${feedName}?older=${oldestTime || new Date().toISOString()}`);
        if (result.error) {
            if(result.status === 401) return dispatch(logoutUser("Invalid token, please log back in"))
            dispatch(fetchFeedFail(result.error))
            dispatch(setFlash('error', 'Could not retrieve feed'))
        } else {
            dispatch(fetchFeedSuccess(feedName, result.data))
        }
    }
}
export function fetchFeedArchive(feedName) {
    return async (dispatch, getState) => {
        if (feedName !== 'public' && feedName !== 'private') return;
        dispatch(fetchFeedStart());
        let oldestTime = getState().feeds[feedName].oldestTime; //should already be ISOString
        const result = await ajax.get(`/recipes/feed/${feedName}?older=${oldestTime || new Date().toISOString()}`);
        if (result.error) {
            dispatch(fetchFeedFail(result.error))
            dispatch(setFlash('error', 'Could not retrieve feed'))
        } else {
            dispatch(fetchFeedSuccess(feedName, result.data))
        }
    }
}

export function fetchFreshFeedItems(feedName) {
    return async (dispatch, getState) => {
        if (feedName !== 'public' && feedName !== 'private') return;
        const newestTime = getState().feeds[feedName].newestTime; //should already be ISOString
        const result = await ajax.get(`/recipes/feed/${feedName}?newer=${newestTime}`);
        if (result.error) {
            dispatch(fetchFeedFail(result.error))
        } else {
            dispatch(storeFreshFeedItems(feedName, result.data))
        }
    }
}

//get 10 most recent 
    //load them into recipes
    //save most recent recipe.createdAt into mostRecent 

//getOlder
    //get 10 more (offset = recipes.length)
    //load them into recipes
    //do NOT update mostRecent 

//getNewer 
    //check for recipes newer than mostRecent 
    //load resulting recipes into newRecipes (spread them in to the BEGINNING, then spread the existing)
    //update mostRecent 
    //this will be done every 5 minutes (every minute to test);
//transferNewRecipes 
    //button at top of feed will display N newRecipes
    //on button click, dispatch transferNewRecipes 
    //reducer -> recipes: [ ...newRecipes, ...recipes ]
    //reducer -> ids: { ...ids, ...newIds }