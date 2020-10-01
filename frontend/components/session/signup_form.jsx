import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewUser } from '../../actions/session_action';

const mSTP = () => ({
    formType: 'Create account',
    navLink: <Link to="/login" className="">Log in</Link>
});

const mDTP = () => ({
    createNewUser: formUser => dispatch(createNewUser(formUser))
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        username: "",
        password: ""
    };
  }


  render() {
    return <div>signup page</div>;
  }
}

export default connect(mSTP, mDTP)(SignUpForm)


