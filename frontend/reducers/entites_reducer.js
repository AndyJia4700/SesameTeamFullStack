import { combineReducers } from "redux";
import userReducer from "./users_reducer";
import projectsReducer from "./projects_reducer";
import TagReducer from "./tags_reducer";

const entitiesReducer = combineReducers({
  users: userReducer,
  projects: projectsReducer,
  tags: TagReducer,
});

export default entitiesReducer;
