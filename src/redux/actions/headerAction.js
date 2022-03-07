import {HEADER_NAME} from '../constants';

export function changeHeader(header) {
  return {
    type: HEADER_NAME,
    payload: header,
  };
}
