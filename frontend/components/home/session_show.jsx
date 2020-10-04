import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_action';

const mSTP = state => ({
    currentUser: state.session.currentUser
})

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
})
const SessionShow = ({currentUser, openModal}) => {
    const sessionLinks = () => (
            <Link to="/login" className="">Log in</Link>
    );

    const greeting = () => (
        <a onClick={() => openModal('profileDropDown')}>
            Hello, {currentUser.id}
        </a>
    );

    return currentUser ? greeting() : sessionLinks();

}
export default connect(mSTP, mDTP)(SessionShow);
