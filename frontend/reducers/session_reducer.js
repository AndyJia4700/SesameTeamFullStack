import {merge} from 'lodash';
import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from '../actions/session_action';


const sessionReducer = (state = {id: null}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type){
        case RECEIVE_CURRENT_USER:
            newState = merge({}, state);
            newState.id = action.user.id;
            return newState;
        case LOGOUT_CURRENT_USER:
            newState = merge({}, state);
            newState.id = null;
        default:
            return state;
    }
};

export default sessionReducer;