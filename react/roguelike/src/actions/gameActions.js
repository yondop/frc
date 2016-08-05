import * as types from '../constants/actionTypes';

export function load(data) {
  return {
    type: types.GAME_LOAD,
    data
  };
}

export function move(vector) {
  return {
    type: types.MOVE,
    vector
  };
}
