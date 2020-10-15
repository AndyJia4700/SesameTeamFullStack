export const fetchTags = () =>
  $.ajax({
    url: "api/tags",
});

export const fetchTag = (tagId) => {
  return $.ajax({
    url: `api/tags/${tagId}`,
  });
};

export const createTag = (tag) => {
  // debugger
  return $.ajax({
    method: "POST",
    url: "/api/tags",
    data: tag
  })
};

export const deleteTag = (tagId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/Tags/${tagId}`,
  });
}
