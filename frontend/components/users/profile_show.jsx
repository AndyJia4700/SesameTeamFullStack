import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions';
import { FiEdit } from "react-icons/fi";


const mSTP = (state, ownProps) => {
    // debugger;
    const userId = state.session.currentUser.id;
    const user = state.entities.users[userId];
    return {
        currentUser: state.session.currentUser,
        user
    }
}

const mDTP = dispatch => {
    return {
      fetchUsers: () => dispatch(fetchUsers()),
      fetchUser: (userId) => dispatch(fetchUsers(userId)),
    };
}

class ProfileShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // debugger;
        this.props.fetchUsers();
    }
    
    render(){
        const { user } = this.props;

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
        )
        const personality = (
            <ul>
                {
                    Object.values(user.personality).map( personality =>
                        <li className="profile-tag-li" key={personality}>{personality}</li>
                    )
                }
            </ul>
        )
        const interest = (
            <ul>
                {
                    Object.values(user.interest).map( interest =>
                        <li className="profile-tag-li" key={interest}>{interest}</li>
                    )
                }
            </ul>
        )

        return (
          <div className="profile-show-main-div">
            <div className="profile-photo-div">
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

            <h3 className="profile-edit-icon">
              <Link to={`/users/${user.id}/edit`}>
                <FiEdit className="profile-edit-icon-Fi" />
              </Link>
            </h3>
          </div>
        );
    }
}

export default connect(mSTP, mDTP)(ProfileShow)
