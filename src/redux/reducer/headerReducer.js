import {HEADER_NAME} from '../constants';

const initialState = {name: []};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEADER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};
export default headerReducer;
