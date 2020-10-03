import React from 'react';
import { Route } from 'react-router-dom';
import SignUpForm from '../components/session/signup_form'
import LogInForm from '../components/session/login_form'
import { AuthRoute } from '../util/route_utils';
import SplashPage from "./home/splash";
import SessionShow from './home/session_show';
import Modal from './modal/modal';

class App extends React.Component{

    render(){
        const nav = (
          <nav>
            <div>
              <a href="">Project</a>
            </div>

            <div>
              <a href="#/">SesameTeam</a>
            </div>

            <div>
              <SessionShow/>
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
              <AuthRoute path="/signup" component={SignUpForm} />
              <AuthRoute path="/login" component={LogInForm} />
            </div>

            {footer}
          </div>
        );
    }
}

export default App;