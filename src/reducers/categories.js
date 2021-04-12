import { CATEGORIES_LOADED, CATEGORIES_LOAD_FAILED } from '../actions/types';

const initialState = [];

const categoriesReducer = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_LOADED:
      return payload;
    case CATEGORIES_LOAD_FAILED:
    default:
      return state;
  }
};

export default categoriesReducer;
