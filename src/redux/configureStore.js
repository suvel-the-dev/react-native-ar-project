import {createStore, combineReducers} from 'redux';

import headerReducer from './reducer/headerReducer';

const rootReducer = combineReducers({headerReducer});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
