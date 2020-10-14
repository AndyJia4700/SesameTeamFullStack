import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from "../../actions/project_actions";


const mSTP = state => {
    return {
        projects: Object.values(state.entities.projects)
    }
}

const mDTP = dispatch => {
    return {
        fetchProjects: () => dispatch(fetchProjects())
    }
}

class ProjectIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchProjects();
    }

    render(){
        const {projects} = this.props;

        const projectList = projects.map((project) => (
          <li key={project.id} className="project-index-li">
            <Link to={`/projects/${project.id}`}>
              <img src={project.pictureUrl} className="project-index-li-img" />
              <p>{project.project_title}</p>
            </Link>
          </li>
        ));

        return (
          <div className="profile-index-main-div">
            <ul>{projectList}</ul>
          </div>
        );
    }
}

export default connect(mSTP, mDTP)(ProjectIndex);

