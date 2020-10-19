import React from 'react';
import { FiSearch } from 'react-icons/fi'
import { AuthRoute, ProtRoute } from '../util/route_utils';
import { Route } from 'react-router-dom';
import LogInForm from '../components/session/login_form'
import Modal from './modal/modal';
import SessionShow from './home/session_show';
import SignUpForm from '../components/session/signup_form'
import SplashPage from "./home/splash";
import ProfileShow from "./users/profile_show";
import ProfileEdit from "./users/profile_edit";
import ProjectCreateContainer from "./projects/create_project_container";
import ProjectEditContainer from './projects/edit_project_container';
import ProjectShow from './projects/project_show';
import ProjectIndex from "./projects/project_index";

class App extends React.Component{

    render(){
        const nav = (
          <nav className="nav-top">
            <div className="nav-top-element">
              <a href="#/projects">Explore</a>
            </div>

            <div className="sesame-word-logo-div">
              <a href="#/">
                <img src={window.sesameteamwordURL} />
              </a>
            </div>

            {/* <div>
              <FiSearch />
              <input type="text" placeholder="search" />
            </div> */}

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
            <Modal />
            {nav}

            <div>
              <Route exact path="/" component={SplashPage} />

              <Route exact path="/users/:userId" component={ProfileShow} />
              
              <ProtRoute exact path="/users/:userId/edit" component={ProfileEdit} />

              <ProtRoute exact path="/project/new" component={ProjectCreateContainer} />

              <Route exact path="/projects/:projectId" component={ProjectShow} />
              <Route exact path="/projects" component={ProjectIndex} />

              <Route
                exact
                path="/projects/:projectId/edit"
                component={ProjectEditContainer}
              />

              <AuthRoute path="/signup" component={SignUpForm} />
              <AuthRoute path="/login" component={LogInForm} />
            </div>

            {/* {footer} */}
          </div>
        );
    }
}

export default App;