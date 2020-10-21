export const fetchchannels = () =>
  $.ajax({
    url: "api/channels",
});

export const fetchChannel = (channelId) => {
  return $.ajax({
    url: `api/channels/${channelId}`,
  });
};

export const createChannel = (channel) => {
  return $.ajax({
    method: "POST",
    url: "/api/channels",
    data: channel
  })
};