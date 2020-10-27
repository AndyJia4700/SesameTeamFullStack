import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

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
    
    // const name = (currentUser && currentUser.first_name) ? currentUser.first_name : "User"
    const photo = (currentUser && currentUser.photoUrl) ? <img src={currentUser.photoUrl} className="tiny-photo"/> : <img className="tiny-no-photo"/>
    
    const greeting = () => (
        <a onClick={() => openModal('profileDropDown')}>
            {photo}
        </a>
    );

    return currentUser ? greeting() : sessionLinks();

}
export default connect(mSTP, mDTP)(SessionShow);
