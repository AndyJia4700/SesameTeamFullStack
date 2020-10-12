import React from 'react';
import {connect} from 'react-redux';
import { deleteProject, fetchProject } from '../../actions/project_actions';
import {FiEdit} from 'react-icons/fi'
import { Link } from 'react-router-dom';

const mSTP = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const project = state.entities.projects[projectId]
  return {
    project,
    currentUser: state.session.currentUser,
  }
}

const mDTP = dispatch => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  };
}

class ProjectShow extends React.Component{
  constructor(props){
    super(props);
    this.deleteThisProject = this.deleteThisProject.bind(this);
  }

  componentDidMount(){
    const projectId = this.props.match.params.projectId;
    this.props.fetchProject(projectId);
  }

  deleteThisProject(){
    const projectId = this.props.match.params.projectId;
    this.props.deleteProject(projectId);
  }

  render(){
    if (!this.props.project) return null;
    const {project} = this.props

    const role = Object.values(project.role).map(role =>
      <li key={role}>
          {role}
      </li>
    );

    const projectId = this.props.match.params.projectId;
    
    const edit = (
      <Link to={`/projects/${projectId}/edit`}>
        <FiEdit />
      </Link>
    );

    return (
      <div className="project-main-div">
        <div>{edit}</div>
        <button onClick={this.deleteThisProject}>Delete</button>
        <h3 className="project-title">{project.project_title}</h3>
        <p className="project-description">{project.project_description}</p>
        <img src={project.pictureUrl} />
        {/* <video className="video-view" controls>
          <source src={project.pictureUrl} type="video/mp4" />
        </video> */}
        <ul>{role}</ul>
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(ProjectShow)