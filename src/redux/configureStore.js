import { createStore, combineReducers } from 'redux';

import listObject from './reducer/listObject';

const rootReducer = combineReducers({ listObject });

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
