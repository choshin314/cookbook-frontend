import { FETCH_PUB_FEED_START, FETCH_PUB_FEED_SUCCESS, FETCH_PUB_FEED_FAIL, ADD_TO_PUB_FEED } from '../actions/types'

const initFeed = { recipes: [], loading: false, error: null }

export default function reducer(feedState=initFeed, action) {
    switch(action.type) {
        case FETCH_PUB_FEED_START: 
            return { ...feedState, loading: true }
        case FETCH_PUB_FEED_FAIL:
            return { ...feedState, loading: false, error: action.payload }
        case FETCH_PUB_FEED_SUCCESS:
            return { error: null, loading: false, recipes: [...feedState.recipes, ...action.payload ]}
        default: 
            return feedState
    }
}

