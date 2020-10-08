import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_action';

const mSTP = state => {
    return {
        currentUser:  state.session.currentUser
    }
}

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    
})

class ProfileDropDown extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.logout().then(this.props.closeModal());
        window.location.replace("/")
    }

    render(){
        const {currentUser} = this.props
        return(
            <div className="modal-child-div">
                
                <Link to={`/users/${currentUser.id}`}>Profile</Link>
                <br/>
                <button onClick={this.handleClick}>logout</button>
            </div>
        )
    }

}

export default connect(mSTP, mDTP)(ProfileDropDown);