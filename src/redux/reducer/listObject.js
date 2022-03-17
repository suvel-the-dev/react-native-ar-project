// import { storeAsyncStorageData } from '../../helpers/helper';
import { LIST_OBJ, MODEL_ITEMS } from '../constants';

const initialState = { listObjects: {}, modelItems: [] };

const listObject = (state = initialState, action) => {
  switch (action.type) {
    case LIST_OBJ:
      var obj = {
        ...state,
        listObjects: {
          ...state.listObjects,
          [action.payload.uid]: action.payload,
        },
      };
      // storeAsyncStorageData(obj);
      return obj;

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
