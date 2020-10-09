import { combineReducers } from "redux";
import userReducer from "./users_reducer";
import projectsReducer from "./projects_reducer";

const entitiesReducer = combineReducers({
  users: userReducer,
  projects: projectsReducer,
});

export default entitiesReducer;
