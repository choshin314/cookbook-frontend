import redux, {combineReducers, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import { setLocalStorage } from '../helpers';

import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    user: userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

const unsubscribe = store.subscribe(() => {
    setLocalStorage('global', store.getState());
});

