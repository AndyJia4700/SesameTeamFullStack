import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions';
import { FiEdit } from "react-icons/fi";
import { fetchProjects } from '../../actions/project_actions';


const mSTP = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const user = state.entities.users[userId];
  const projects = Object.values(state.entities.projects);
  return {
    currentUser: state.session.currentUser,
    user,
    projects,
  }
}

const mDTP = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUsers(userId)),
    fetchProjects: () => dispatch(fetchProjects())
  };
}

class ProfileShow extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    
    const userId = this.props.match.params.userId;
    this.props.fetchUser(userId);
    this.props.fetchProjects();
  }
    
  render(){
    
    if (!this.props.user) return null;

    const { user, projects } = this.props;
    const age = (date) => {
      if(date === null) return 0;
      const birthDate = new Date(date);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() == birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
      ) {
        years--;
      }
        return years;
    }

    const education = user.education == null ? "" : user.education;
    const about = user.about == null ? "" : user.about;
      
    const skill = (
      <ul>
        {
          Object.values(user.skill).map( skill =>
            <li className="profile-tag-li" key={skill}>{skill}</li>
          )
        }
        </ul>
    );

    const personality = (
      <ul>
        {
          Object.values(user.personality).map( personality =>
            <li className="profile-tag-li" key={personality}>{personality}</li>
          )
        }
      </ul>
    );

    const interest = (
      <ul>
        {
          Object.values(user.interest).map( interest =>
            <li className="profile-tag-li" key={interest}>{interest}</li>
          )
        }
      </ul>
    );

    const currentUserId = (this.props.currentUser) ? this.props.currentUser.id : null;
    const edit = (user.id == currentUserId) ? (
      <Link to={`/users/${user.id}/edit`}>
        <FiEdit className="profile-edit-icon-Fi" />
      </Link>
    ) : null

    const projectLists = projects.map((project) => (
      project.leader_id == user.id ? (
      <li key={project.id} className="profile-show-project-li">
        <Link to={`/projects/${project.id}`}>
          <p className="profile-show-project-p">{project.project_title}</p>
          <img src={project.pictureUrl} className="profile-show-project-img" />
        </Link>
      </li>) : null
    ));

    return (
      <div className="profile-show-main-div">
        <div className="profile-photo-div">
          <h3 className="profile-edit-icon">{edit}</h3>
          <img src={user.photoUrl} className="profile-photo-img" />

          <ul className="profile-element-ul">
            <li className="profile-element">
              {user.first_name + "  " + user.last_name}
            </li>
            <li className="profile-element age">{age(user.birthdate)}</li>
            <li className="profile-element">{user.location}</li>
          </ul>
        </div>

        <ul className="profile-ul">
          <li className="profile-element-li">
            <label className="profile-element-lable">Education:</label>
            <div className="profile-element-block">{education}</div>
          </li>
          <li className="profile-element-li">
            <label className="profile-element-lable">About:</label>
            <div className="profile-element-block about">{about}</div>
          </li>
          <li className="profile-element-li">
            <label className="profile-element-lable">Skill:</label>
            <span>{skill}</span>
          </li>
          <li className="profile-element-li">
            <label className="profile-element-lable">Personality:</label>
            <span>{personality}</span>
          </li>
          <li className="profile-element-li">
            <label className="profile-element-lable">Interest:</label>
            <span>{interest}</span>
          </li>
        </ul>

        <div className="profile-show-project-div">
          <label className="profile-element-lable">Lead Project:</label>
          <ul className="profile-show-project-ul">
            {projectLists}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(ProfileShow)
