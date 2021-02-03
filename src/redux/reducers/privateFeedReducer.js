import { FETCH_PVT_FEED_FAIL, FETCH_PVT_FEED_START, FETCH_PVT_FEED_SUCCESS } from "../actions/types";
import { getAjax } from '../../helpers/sendAjax'

const twoWeeksAgo = new Date() - 1209600000;

const initFeed = { 
    recipes: [], 
    loading: false, 
    error: null, 
    lastFetched: twoWeeksAgo 
}

export default function reducer(feedState=initFeed, action) {
    switch(action.type) {
        default: 
            return feedState;
    }
}

const fetchPvtFeedStart = () => ({ type: FETCH_PVT_FEED_START })
const fetchPvtFeedFailed = (error) => ({ type: FETCH_PVT_FEED_FAIL, payload: error })
const fetchPvtFeedSuccess = (recipes) => ({ type: FETCH_PVT_FEED_SUCCESS, payload: recipes })

function fetchPvtFeed() {
    return async (dispatch, getState) => {
        const { privateFeed: { lastFetched }, auth: { accessToken }} = getState();
        dispatch(fetchPvtFeedStart())
        const result = await getAjax(`/api/recipes/private/${lastFetched}`, accessToken);
        if (result.error) dispatch(fetchPvtFeedFailed(result.error));
        if (result.data) dispatch(fetchPvtFeedSuccess(result.data))
    } 
}