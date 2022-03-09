import {LIST_OBJ} from '../constants';

export function addListObj(listObj) {
  return {
    type: LIST_OBJ,
    payload: listObj,
  };
}