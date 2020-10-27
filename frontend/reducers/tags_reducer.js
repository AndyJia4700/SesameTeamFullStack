import {
  RECEIVE_ALL_TAGS,
  RECEIVE_TAG,
  REMOVE_TAG,
} from "../actions/tag_actions";
import { merge } from "lodash";

const TagReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ALL_TAGS:
      return merge({}, oldState, action.tags);
    case RECEIVE_TAG:
      return merge({}, oldState, {
        [action.tag.id]: action.tag,
      });
    case REMOVE_TAG:
      let nextState = Object.assign({}, oldState);
      delete nextState[action.tagId];
      return nextState;
    default:
      return oldState;
  }
};

export default TagReducer;
