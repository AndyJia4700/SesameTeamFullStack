import React from 'react';
import { Route } from 'react-router-dom';
import SignUpForm from '../components/session/signup_form'
import LogInForm from '../components/session/login_form'
import { AuthRoute } from '../util/route_utils';
import SplashPage from "./home/splash";

class App extends React.Component{

    render(){
        return (
          <div>
            <nav> this is top nav</nav>
            <div>
                <Route exact path="/" component={SplashPage}/>
                <AuthRoute path="/signup" component={SignUpForm} />
                <AuthRoute path="/login" component={LogInForm} />
            </div>
            <footer>this is footer</footer>
          </div>
        );
    }
}

export default App;