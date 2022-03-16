import { LIST_OBJ, MODEL_ITEMS } from '../constants';

const initialState = { listObjects: {}, modelItems: [] };

const listObject = (state = initialState, action) => {
  switch (action.type) {
    case LIST_OBJ:
      return {
        ...state,
        listObjects: {
          ...state.listObjects,
          [action.payload.uid]: action.payload,
        },
      };

    case MODEL_ITEMS:
      return {
        ...state,
        modelItems: action.payload,
      };

    default:
      return state;
  }
};
export default listObject;
