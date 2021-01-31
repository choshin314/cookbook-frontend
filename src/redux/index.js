import redux, {combineReducers, applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { setLocalStorage } from '../helpers';

import authReducer from './reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import userRecipesReducer from './reducers/userRecipesReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    userRecipes: userRecipesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const unsubscribe = store.subscribe(() => {
    setLocalStorage('auth', store.getState().auth);
    setLocalStorage('profile', store.getState().profile);
});

export { store };
