import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewUser } from '../../actions/session_action';

const mSTP = ({errors}) => ({
    errors: errors,
    formType: 'Create Account',
    navLink: <Link to="/login" className="">Log in</Link>
});

const mDTP = dispatch => {
    // debugger;
    return {
    createNewUser: formUser => dispatch(createNewUser(formUser))
    }
};

class SignUpForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }
  
    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }
  
    handleSubmit(e){
        e.preventDefault();
        this.props.createNewUser(Object.assign({}, this.state))
    }


    render(){
        return (
          <form className="sign-log-form" onSubmit={this.handleSubmit}>
            <img src={window.sesameteamURL} className="sesameteam-logo" />
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.update("email")}
              className="sign-log-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.update("password")}
              className="sign-log-input"
              minLength={6}
            />

            <input
              type="submit"
              value={this.props.formType}
              className="sign-log-button"
            />
            <div className="sign-log-switch">
              Have an account?{" "}
              <span className="sign-log-span">{this.props.navLink}</span>
            </div>
          </form>
        );
    }
}

export default connect(mSTP, mDTP)(SignUpForm)


