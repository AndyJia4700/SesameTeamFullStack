import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewUser } from '../../actions/session_action';

const mSTP = ({errors}) => ({
    errors: errors,
    formType: 'Create account',
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
          <form onSubmit={this.handleSubmit}>
            
            <input
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.update("email")}
              className=""
            />
            
            <input
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.update("password")}
              className=""
            />
            
            <input 
                type="submit"
                value={this.props.formType}
                className=""
            />
            <div>Have an account? {this.props.navLink}</div>
          </form>
        );
    }
}

export default connect(mSTP, mDTP)(SignUpForm)


