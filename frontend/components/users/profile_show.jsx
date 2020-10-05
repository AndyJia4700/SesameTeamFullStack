import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_action';

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
        // debugger;
        const { user } = this.props;

        const age = (birthDate, otherDate) => {
            birthDate = new Date(birthDate);
            otherDate = new Date(otherDate);

            var years = otherDate.getFullYear() - birthDate.getFullYear();

            if (
                otherDate.getMonth() < birthDate.getMonth() ||
                (otherDate.getMonth() == birthDate.getMonth() &&
                otherDate.getDate() < birthDate.getDate())
            ) {
                years--;
            }
            return years;
        }

        debugger;
        return (
          <div className="profile-show-main-div">
            <Link to={`/users/${user.id}/edit`}>Eidt Profile</Link>
            <div className="profile-photo-div">
              <img src={user.photoUrl} className="profile-photo-img" />

              <h3>
                <input
                //   placeholder="firstname"
                  value={user.first_name + "  " + user.last_name}
                  className="profile-element"
                  readOnly={true}
                />
              </h3>

              {user.birthdate}
              {user.location}
            </div>

            <ul>
              <li>Education: {user.education}</li>
              <li>Skill[]: {user.skill}</li>
              <li>Personality[]: {user.personality}</li>
              <li>Interest[]: {user.interest}</li>
              <li>About: {user.about}</li>
            </ul>
          </div>
        );
    }
}

export default connect(mSTP, mDTP)(ProfileShow)
