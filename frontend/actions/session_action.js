import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

const recieveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const createNewUser = formUser => dispatch => (
    APIUtil.postUser(formUser)
    .then(
        user => dispatch(receiveCurrentUser(user)),
        error => dispatch(receiveSessionErrors(error.responseJson))
    )
);

export const login = formUser => dispatch => (
    APIUtil.postSession(formUser)
    .then(
        user => dispatch(receiveCurrentUser(user)),
        error => dispatch(receiveSessionErrors(error.responseJson))
    )
);

export const logout = () => dispatch => (
    APIUtil.deleteSession()
    .then(
        () => dispatch(logoutCurrentUser())
    )
);



