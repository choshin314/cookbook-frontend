import redux, {combineReducers, applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { setLocalStorage } from '../helpers';

import userReducer from './reducers/userReducer'
import profileReducer from './reducers/profileReducer'
import userRecipesReducer from './reducers/userRecipesReducer'

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    userRecipes: userRecipesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const unsubscribe = store.subscribe(() => {
    setLocalStorage('global', store.getState());
});

export { store };
