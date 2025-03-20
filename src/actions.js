import { SAVE_ITEM_POSITIONS } from './actionTypes';

export const saveItemPositions = (positions) => ({
    type: SAVE_ITEM_POSITIONS,
    payload: positions,
});
export const addItems = (items) => ({
  type: 'ADD_ITEMS',
  payload: items,
});