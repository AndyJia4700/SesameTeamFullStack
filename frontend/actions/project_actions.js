import * as ProjectUtil from "../util/project_util";

export const RECEIVE_ALL_PROJECTS = "RECEIVE_ALL_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";

const receiveAllProjects = (projects) => ({
  type: RECEIVE_ALL_PROJECTS,
  projects,
});

const receiveProject = (project) => ({
  type: RECEIVE_PROJECT,
  project,
});

const removeProject = (projectId) => ({
  type: REMOVE_PROJECT,
  projectId,
});

export const fetchProjects = (query) => (dispatch) =>
  ProjectUtil.fetchProjects(query).then((projects) =>
    dispatch(receiveAllProjects(projects))
  );

export const fetchProject = (projectId) => (dispatch) =>
  ProjectUtil.fetchProject(projectId).then((project) =>
    dispatch(receiveProject(project))
  );

export const createProject = (project) => (dispatch) =>
  ProjectUtil.createProject(project).then((project) =>
    dispatch(receiveProject(project))
  );

export const updateProject = (project) => (dispatch) =>
  ProjectUtil.updateProject(project).then((project) =>
    dispatch(receiveProject(project))
  );

export const deleteProject = (projectId) => (dispatch) =>
  ProjectUtil.deleteProject(projectId).then(() =>
    dispatch(removeProject(projectId))
  );
