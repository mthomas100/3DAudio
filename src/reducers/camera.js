import { TOGGLE_MINIMIZE, UNTOGGLE_MINIMIZE } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MINIMIZE:
      return [...state, payload];
    case UNTOGGLE_MINIMIZE:
      return state.filter(e => e !== payload);
    default:
      return state;
  }
}

//template reducers/alert.js