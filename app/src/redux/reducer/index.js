import {applyMiddleware, combineReducers, createStore} from 'redux';
import {navigationReducer} from './NavigationReducer';
import thunk from 'redux-thunk';
import {LoadingReducer} from './LoadingReducer';

const reducer = combineReducers({
  navigationState: navigationReducer,
  loadingState: LoadingReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
