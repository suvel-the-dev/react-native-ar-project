import { LIST_OBJ } from '../constants';

const initialState = {};

const listObject = (state = initialState, action) => {
  switch (action.type) {
    case LIST_OBJ:
      return {
        ...state,
        [action.payload.uid]: action.payload,
      };

    default:
      return state;
  }
};
export default listObject;
