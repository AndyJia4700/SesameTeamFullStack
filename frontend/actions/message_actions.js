import * as MessageUtil from "../util/message_util";

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

const receiveAllMessages = (messages) => ({
  type: RECEIVE_ALL_MESSAGES,
  messages,
});

const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message,
});

// const removeMessage = (MessageId) => ({
//   type: REMOVE_Message,
//   MessageId,
// });

export const fetchMessages = () => (dispatch) =>
  MessageUtil.fetchMessages().then((messages) =>
    dispatch(receiveAllMessages(messages))
  );

export const fetchMessage = (messageId) => (dispatch) =>
  MessageUtil.fetchMessage(messageId).then((message) =>
    dispatch(receiveMessage(message))
  );

export const createMessage = (message) => (dispatch) =>
  MessageUtil.createMessage(message).then((message) =>
    dispatch(receiveMessage(message))
  );

// export const deleteMessage = (MessageId) => (dispatch) =>
//   MessageUtil.deleteMessage(MessageId).then(() =>
//     dispatch(removeMessage(MessageId))
//   );