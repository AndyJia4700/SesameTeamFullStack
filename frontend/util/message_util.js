export const fetchMessages = () =>
  $.ajax({
    url: "api/messages",
});

export const fetchMessage = (messageId) => {
  return $.ajax({
    url: `api/messages/${messageId}`,
  });
};

export const createMessage = (message) => {
  return $.ajax({
    method: "POST",
    url: "/api/messages",
    data: message
  })
};

// export const deleteMessage = (MessageId) => {
//   return $.ajax({
//     method: "DELETE",
//     url: `/api/messages/${MessageId}`,
//   });
// }
