import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/session_action";

const mSTP = ({ errors }) => ({
  errors: errors,
  formType: "Log In",
  navLink: (
    <Link to="/signup" className="">
      Sign Up
    </Link>
  ),
});

const mDTP = (dispatch) => {
  // debugger;
  return {
    login: (formUser) => dispatch(login(formUser)),
  };
};

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger;
    this.props.login(Object.assign({}, this.state));
  }

  handleClick(e){
    e.preventDefault();
    this.setState({
        email: "000@demo.com",
        password: "123456"
    }, () => this.props.login(Object.assign({}, this.state)))
  }

  render() {
    // debugger;
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

        <input type="submit" value={this.props.formType} className="" />
        <button onClick={this.handleClick}>Demo</button>
        <div>New Here? {this.props.navLink}</div>
      </form>
    );
  }
}

export default connect(mSTP, mDTP)(LogInForm);
