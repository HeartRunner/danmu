import {
  WIDGET_LOAD,
  WIDGET_LOAD_SUCCESS,
  WIDGET_LOAD_FAIL
} from './actionTypes';

export function load(query) {
  return {
    types: [WIDGET_LOAD, WIDGET_LOAD_SUCCESS, WIDGET_LOAD_FAIL],
    promise: (client) => client.get('/loadWidgets', { params: {q: query}})
  };
}
