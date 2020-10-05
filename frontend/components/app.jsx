import React from 'react';
import { AuthRoute } from '../util/route_utils';
import { Route } from 'react-router-dom';
import LogInForm from '../components/session/login_form'
import Modal from './modal/modal';
import SessionShow from './home/session_show';
import SignUpForm from '../components/session/signup_form'
import SplashPage from "./home/splash";
import ProfileShow from "./users/profile_show";
import ProfileEdit from "./users/profile_edit";

class App extends React.Component{

    render(){
        const nav = (
          <nav className="nav-top">
            <div className="nav-top-element">
              <a href="">Explore</a>
            </div>

            <div className="sesame-word-logo-div">
              <a href="#/">
                <img src={window.sesameteamwordURL} />
              </a>
            </div>

            <div className="nav-top-element">
              <SessionShow />
            </div>
          </nav>
        );

        const footer = (
          <div>
            This is footer
          </div>
        );

        return (
          <div>
            <Modal/>
            {nav}

            <div>
              <Route exact path="/" component={SplashPage}/>
              <Route exact path="/users/:userId" component={ProfileShow}/>
              <Route exact path="/users/:userId/edit" component={ProfileEdit}/>
              
              <AuthRoute path="/signup" component={SignUpForm} />
              <AuthRoute path="/login" component={LogInForm} />
            </div>

            {footer}
          </div>
        );
    }
}

export default App;