import { combineReducers, createStore } from './Provider';

import { displayReducer } from './displayRedux';

export default createStore(combineReducers({ display: displayReducer }));
