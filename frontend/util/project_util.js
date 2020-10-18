export const fetchProjects = (query) =>{
  // debugger
  return $.ajax({
    url: `/api/projects?title=${query}`,
  });
};

export const fetchProject = (projectId) => {
  return $.ajax({
    url: `/api/projects/${projectId}`,
  });
};

export const createProject = (formData) =>
  $.ajax({
    method: "POST",
    url: "/api/projects",
    data: formData,
    contentType: false,
    processData: false,
    dataType: "json",
  });

export const updateProject = (formData, projectId) => {
  // debugger
  return $.ajax({
    method: "PATCH",
    url: `/api/projects/${projectId}`,
    data: formData,
    contentType: false,
    processData: false,
    dataType: "json",
  });
};

export const deleteProject = (projectId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/projects/${projectId}`,
});
