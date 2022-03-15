import { LIST_OBJ, MODEL_ITEMS } from '../constants';

export function addListObj(listObj) {
  return {
    type: LIST_OBJ,
    payload: listObj,
  };
}

export function addModelItems(model) {
  return {
    type: MODEL_ITEMS,
    payload: model,
  };
}
