import { FETCH_PUB_FEED_START, FETCH_PUB_FEED_SUCCESS, FETCH_PUB_FEED_FAIL, ADD_TO_PUB_FEED } from '../actions/types'
import { getAjax } from '../../helpers/sendAjax'

export const fetchPubFeedStart = () => ({ type: FETCH_PUB_FEED_START })
export const fetchPubFeedFailed = (error) => ({ type: FETCH_PUB_FEED_FAIL, payload: error })
export const fetchPubFeedSuccess = (recipes) => ({ type: FETCH_PUB_FEED_SUCCESS, payload: recipes })

export function fetchPubFeed() {
    return async (dispatch, getState) => {
        const { privateFeed: { lastFetched }, auth: { accessToken }} = getState();
        dispatch(fetchPubFeedStart())
        const result = await getAjax(`/recipes/feed/public`);
        if (result.error) dispatch(fetchPubFeedFailed(result.error));
        if (result.data) dispatch(fetchPubFeedSuccess(result.data))
    } 
}