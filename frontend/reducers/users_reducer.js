import {merge} from "lodash";
import { RECEIVE_CURRENT_USER } from "../actions/session_action";
import { RECEIVE_ALL_USERS, RECEIVE_USER } from "../actions/user_action";

const userReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case RECEIVE_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case RECEIVE_ALL_USERS:
            return merge({}, state, action.users);
        default:
            return state
    }
};

export default userReducer;