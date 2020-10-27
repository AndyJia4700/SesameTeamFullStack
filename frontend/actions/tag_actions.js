import * as TagUtil from "../util/tag_util";

export const RECEIVE_ALL_TAGS = "RECEIVE_ALL_TAGS";
export const RECEIVE_TAG = "RECEIVE_TAG";
export const REMOVE_TAG = "REMOVE_TAG";

const receiveAllTags = (tags) => ({
  type: RECEIVE_ALL_TAGS,
  tags,
});

const receiveTag = (tag) => ({
  type: RECEIVE_TAG,
  tag,
});

const removeTag = (tagId) => ({
  type: REMOVE_TAG,
  tagId,
});

export const fetchTags = () => (dispatch) =>
  TagUtil.fetchTags().then((tags) =>
    dispatch(receiveAllTags(tags))
  );

export const fetchTag = (tagId) => (dispatch) =>
  TagUtil.fetchTag(tagId).then((tag) =>
    dispatch(receiveTag(tag))
  );

export const createTag = (tag) => (dispatch) =>
  TagUtil.createTag(tag).then((tag) =>
    dispatch(receiveTag(tag))
  );

export const deleteTag = (tagId) => (dispatch) =>
  TagUtil.deleteTag(tagId).then(() =>
    dispatch(removeTag(tagId))
  );