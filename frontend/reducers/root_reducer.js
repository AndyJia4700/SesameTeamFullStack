import { combineReducers } from "redux";
import entitiesReducer from "./entites_reducer";
import sessionReducer from "./session_reducer";
import uiReducer from "./ui_reducer";

const rootReducer = combineReducers({
    session: sessionReducer,
    entities: entitiesReducer,
    ui: uiReducer,
});

export default rootReducer;