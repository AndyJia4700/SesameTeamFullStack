import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_action';
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

        return (
          <div className="profile-show-main-div">
            <h3 className="profile-edit-icon">
              <Link to={`/users/${user.id}/edit`}>
                <FiEdit />
              </Link>
            </h3>

            <div className="profile-photo-div">
              <img src={user.photoUrl} className="profile-photo-img" />

              <h3>
                <input
                  value={user.first_name + "  " + user.last_name}
                  className="profile-element"
                  readOnly={true}
                />
              </h3>

              <div className="profile-age">
                {age(user.birthdate) + " years old"}
              </div>
            </div>

            {/* {user.location} */}

            <ul className="profile-ul">
              <li>
                Education: <span>{user.education}</span>
              </li>
              <li>
                Skill[]: <span>{user.skill}</span>
              </li>
              <li>
                Personality[]: <span>{user.personality}</span>
              </li>
              <li>
                Interest[]: <span>{user.interest}</span>
              </li>
              <li>
                About: <span>{user.about}</span>
              </li>
            </ul>
          </div>
        );
    }
}

export default connect(mSTP, mDTP)(ProfileShow)
