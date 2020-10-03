import React from 'react';
import { connect } from 'react-redux';
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
    }

    render(){
        const {currentUser} = this.props
        return(
            <div className="modal-child-div">
                <button onClick={this.handleClick}>logout</button>
            </div>
        )
    }

}

export default connect(mSTP, mDTP)(ProfileDropDown);