import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { BiMessageAltDots } from 'react-icons/bi';

const mSTP = state => ({
    currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

const Footer = ({currentUser, openModal}) => {

    return(
        <div className="message-logo" onClick={() => openModal('messageBox')}>
            <BiMessageAltDots/>
        </div>
    )
}

export default connect(mSTP, mDTP)(Footer);