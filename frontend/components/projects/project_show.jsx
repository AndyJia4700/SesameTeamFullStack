import React from 'react';
import {connect} from 'react-redux';
import { deleteProject, fetchProject } from '../../actions/project_actions';
import { fetchUser } from '../../actions/user_actions';
import {FiEdit} from 'react-icons/fi'
import { Link } from 'react-router-dom';

const mSTP = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const project = state.entities.projects[projectId];
  const user = project ? state.entities.users[state.entities.projects[projectId].leader_id] : null

  return {
    project,
    currentUser: state.session.currentUser,
    user
  }
}

const mDTP = dispatch => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
}

class ProjectShow extends React.Component {
  constructor(props) {
    super(props);
    this.deleteThisProject = this.deleteThisProject.bind(this);
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.fetchProject(projectId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      const userId = this.props.project.leader_id;
      this.props.fetchUser(userId);
    }
  }

  deleteThisProject() {
    const projectId = this.props.match.params.projectId;
    this.props.deleteProject(projectId);
    window.location.replace(`#/users/${this.props.currentUser.id}`);
    window.location.reload();
    return false;
  }

  render() {
    if (!this.props.project) return null;
    if (!this.props.user) return null;
    const { project, user, currentUser } = this.props;

    const role = Object.values(project.role).map((role) => (
      <li key={role}>{role}</li>
    ));

    const projectId = this.props.match.params.projectId;

    const edit = currentUser.id == project.leader_id ? (
            <div>
              <button onClick={this.deleteThisProject}>Delete</button>
              <Link to={`/projects/${projectId}/edit`}>
                <FiEdit />
              </Link>
            </div>
          ) : null;

    const leaderInfo = (
      <Link to={`/users/${user.id}`}>
        <img src={user.photoUrl} className="profile-photo-img" />
        <h4>{user.first_name + user.last_name}</h4>
      </Link>
    );

    return (
      <div className="project-main-div">
        
        {edit}
        {leaderInfo}
        
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