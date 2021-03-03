import { FEED_LIMIT } from '../../constants'
import { 
    FETCH_FEED_START, 
    FETCH_FEED_SUCCESS, 
    FETCH_FEED_FAIL, 
    STORE_FRESH_FEED_ITEMS,
    SHOW_FRESH_FEED_ITEMS,
    RESET_FEEDS, 
    LOGOUT 
} from '../actions/types'

const initFeed = {
    loading: false,
    error: null,
    private: {
        recipes: [],
        newRecipes: [],
        ids: {},
        endOfList: false,
        newestTime: null,
        oldestTime: null
    },
    public: {
        recipes: [],
        newRecipes: [],
        ids: {},
        endOfList: false,
        newestTime: null,
        oldestTime: null
    }
}

export default function reducer(feeds=initFeed, action) {
    switch(action.type) {
        case RESET_FEEDS:
        case LOGOUT:
            return {
                loading: false,
                error: null,
                private: {
                    recipes: [],
                    newRecipes: [],
                    ids: {},
                    endOfList: false,
                    newestTime: null,
                    oldestTime: null
                },
                public: {
                    recipes: [],
                    newRecipes: [],
                    ids: {},
                    endOfList: false,
                    newestTime: null,
                    oldestTime: null
                }
            }
        case FETCH_FEED_START: 
            return { ...feeds, loading: true }

        case FETCH_FEED_FAIL:
            return { ...feeds, loading: false, error: action.payload }

        case FETCH_FEED_SUCCESS: {
            let { feedName, recipes: fetched } = action.payload;
            let newIds = {};
            let oldestFetched;
            fetched = fetched.filter(rec => !feeds[feedName].ids[rec.id]);
            fetched.forEach(rec => newIds[rec.id] = true);
            oldestFetched = fetched.length > 0 ? 
                fetched[fetched.length - 1].createdAt : 
                feeds[feedName].oldestTime
            
            return { 
                ...feeds,
                error: null, 
                loading: false,
                [feedName]: {
                    ...feeds[feedName],
                    ids: { ...feeds[feedName].ids, ...newIds },
                    recipes: [ ...feeds[feedName].recipes, ...fetched ],
                    endOfList: fetched.length < FEED_LIMIT,
                    oldestTime: oldestFetched,
                    newestTime: feeds[feedName].newestTime || fetched[0].createdAt
                }
            }
        }

        case STORE_FRESH_FEED_ITEMS: {
            let { feedName, recipes: fetched } = action.payload;
            fetched = fetched.filter(rec => !feeds[feedName].ids[rec.id]);

            if (fetched.length === 0) return feeds;
            return {
                ...feeds,
                [feedName]: {
                    ...feeds[feedName],
                    newRecipes: [ ...fetched, ...feeds[feedName].newRecipes ],
                    newestTime: fetched[0].createdAt || feeds[feedName].newestTime
                }
            }
        }

        case SHOW_FRESH_FEED_ITEMS: {
            let feedName = action.payload;
            let newIds = {};
            newIds = feeds[feedName].newRecipes.forEach(rec => newIds[rec.id] = true);
            
            return {
                ...feeds,
                [feedName]: {
                    ...feeds[feedName],
                    ids: { ...newIds, ...feeds[feedName].ids },
                    recipes: [ ...feeds[feedName].newRecipes, ...feeds[feedName].recipes ],
                    newRecipes: []
                }
            }
        }

        default: 
            return feeds
    }
}
