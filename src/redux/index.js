import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { setLocalStorage } from '../helpers';

import authReducer from './reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import userRecipesReducer from './reducers/userRecipesReducer'
import flashReducer from './reducers/flashReducer'
import redirectReducer from './reducers/redirectReducer'
import publicFeedReducer from './reducers/publicFeedReducer'
import privateFeedReducer from './reducers/privateFeedReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    userRecipes: userRecipesReducer,
    flash: flashReducer,
    redirect: redirectReducer,
    publicFeed: publicFeedReducer,
    privateFeed: privateFeedReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const unsubscribe = store.subscribe(() => {
    setLocalStorage('auth', store.getState().auth);
});

export { store };
