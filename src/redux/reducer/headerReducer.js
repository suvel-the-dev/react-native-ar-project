import {LIST_OBJ} from '../constants';

const initialState = {listObj: []};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_OBJ:
      return {
        ...state,
        listObj: action.payload,
      };
    default:
      return state;
  }
};
export default headerReducer;
