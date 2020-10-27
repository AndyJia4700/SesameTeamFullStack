import * as ChannelUtil from "../util/channel_util";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

const receiveAllChannels = (channels) => ({
  type: RECEIVE_ALL_CHANNELS,
  channels,
});

const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel,
});

// const removeChannel = (ChannelId) => ({
//   type: REMOVE_CHANNEL,
//   ChannelId,
// });

export const fetchChannels = () => (dispatch) =>
  ChannelUtil.fetchChannels().then((channels) =>
    dispatch(receiveAllChannels(channels))
  );

export const fetchChannel = (channelId) => (dispatch) =>
  ChannelUtil.fetchChannel(channelId).then((channel) =>
    dispatch(receiveChannel(channel))
  );

export const createChannel = (channel) => (dispatch) =>
  ChannelUtil.createChannel(channel).then((channel) =>
    dispatch(receiveChannel(channel))
  );

// export const deleteChannel = (channelId) => (dispatch) =>
//   ChannelUtil.deleteChannel(channelId).then(() =>
//     dispatch(removeChannel(channelId))
//   );