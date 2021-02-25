import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { setLocalStorage } from '../helpers';

import authReducer from './reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import profileRecipesReducer from './reducers/profileRecipesReducer'
import flashReducer from './reducers/flashReducer'
import redirectReducer from './reducers/redirectReducer'
import publicFeedReducer from './reducers/publicFeedReducer'
import privateFeedReducer from './reducers/privateFeedReducer'
import socialReducer from './reducers/socialReducer'
import searchReducer from './reducers/searchReducer'

const appReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    profileRecipes: profileRecipesReducer,
    flash: flashReducer,
    redirect: redirectReducer,
    publicFeed: publicFeedReducer,
    privateFeed: privateFeedReducer,
    social: socialReducer,
    search: searchReducer
})

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = undefined
        localStorage.clear();
    }
    return appReducer(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const unsubscribe = store.subscribe(() => {
    setLocalStorage('auth', store.getState().auth);
    setLocalStorage('social', store.getState().social);
});

export { store };
