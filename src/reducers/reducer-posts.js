import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action = {}) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_POST:
      const newState = { ...state, [action.payload.data.id]: action.payload.data };
      return newState;
    case DELETE_POST:
      //return state without the object of deleted id
      return _.omit(state, action.payload);
    default:
      return state;

  }
}
