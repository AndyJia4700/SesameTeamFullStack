import React from 'react';
import {connect} from 'react-redux';
import { deleteProject, fetchProject } from '../../actions/project_actions';
import { fetchUser } from '../../actions/user_actions';
import { fetchTags } from "../../actions/tag_actions";
import {FiEdit, FiTrash2} from 'react-icons/fi'
import { Link } from 'react-router-dom';

const mSTP = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const project = state.entities.projects[projectId];
  const user = project ? state.entities.users[state.entities.projects[projectId].leader_id] : null;
  const tags = state.entities.tags
  return {
    project,
    tags,
    currentUser: state.session.currentUser,
    user,
  }
}

const mDTP = dispatch => {
  return {
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchTags: () => dispatch(fetchTags()),
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
    this.props.fetchTags();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      const userId = this.props.project.leader_id;
      this.props.fetchUser(userId);
    }
  }

  deleteThisProject() {
    const projectId = this.props.match.params.projectId;
    if (confirm("Are you sure to delete?!")){
      this.props.deleteProject(projectId);
      window.location.replace(`#/users/${this.props.currentUser.id}`);
      window.location.reload();
      return false;
    }
  }

  render() {
    if (!this.props.project) return null;
    if (!this.props.user) return null;
    
    const currentUserId = (this.props.currentUser) ? this.props.currentUser.id : null;

    const { project, user } = this.props;

    const role = Object.values(project.role).map((role) => (
      <li key={role} className="project-form-role-li">
        <p>{role[0]}</p>
        {/* <br/> */}
        <p>{role[1]}</p>
      </li>
    ));

    const projectId = this.props.match.params.projectId;

    const edit = (currentUserId == project.leader_id) ? (
            <div className="project-show-logo-edit-delete">
              <button onClick={this.deleteThisProject}>
                <FiTrash2 className="project-show-logo delete"/>
              </button>

              <button>
                <Link to={`/projects/${projectId}/edit`}>
                  <FiEdit className="project-show-logo"/>
                </Link>
              </button>
            </div>
          ) : null;

    const leaderInfo = (
      <Link to={`/users/${user.id}`} className="project-show-leader-img-div">
        <img src={user.photoUrl} className="project-show-leader-info-img" />
        <h4 className="project-show-leader-name">{user.first_name + " " + user.last_name}</h4>
      </Link>
    );

    const tagList = (
      <ul>
        {
          Object.values(project.tag_id).map((id) => (
          <li key={id} className="project-form-tag-li">
            {this.props.tags[id] ? this.props.tags[id].tag_name : id}
          </li>
          ))
        }
      </ul>
    );

    return (
      <div>
        <div className="project-show-leader-info">
          {leaderInfo}
          {edit}
        </div>
      
        <div className="project-show-main-div">
          <h3 className="project-show-title">{project.project_title}</h3>
          <div className="project-show-subdiv">
            <div className="project-show-subdiv1">
              <img src={project.pictureUrl} className="project-show-img"/>
              {tagList}
            </div>
            {/* <video className="video-view" controls>
              <source src={project.pictureUrl} type="video/mp4" />
            </video> */}
            <div className="project-show-subdiv2">
              <p className="project-description">{project.project_description}</p>
              <ul>{role}</ul>
            </div>
          </div>
        </div>

        
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(ProjectShow)