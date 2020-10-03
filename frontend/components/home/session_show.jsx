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
        <nav>
            <Link to="/login" className="">login</Link>
        </nav>
    );

    const greeting = () => (
        <nav>
            <div>
                <a onClick={() => openModal('profileDropDown')}>
                    {currentUser.id}
                </a>
            </div>
        </nav>
    );

    return currentUser ? greeting() : sessionLinks();

}
export default connect(mSTP, mDTP)(SessionShow);
