import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, updateUser } from "../../actions/user_action";
import { FiSave} from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

const mSTP = (state, ownProps) => {
    const userId = state.session.currentUser.id;
    const user = state.entities.users[userId];
    return {
        user
    };
}

const mDTP = dispatch => {
    
    return {
      fetchUsers: () => dispatch(fetchUsers()),
      fetchUser: (userId) => dispatch(fetchUser(userId)),
      action: (formData, userId) => dispatch(updateUser(formData, userId)),
    };
}

class ProfileEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.user;
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.updatePersonality = this.updatePersonality.bind(this);
        this.deletePersonality = this.deletePersonality.bind(this);
        this.updateInterest = this.updateInterest.bind(this);
        this.deleteInterest = this.deleteInterest.bind(this);
    }

    componentDidMount(){
        const userId = this.props.match.params.userId;
        // this.props.fetchUsers();
        this.props.fetchUser(userId);
    }

    handleFile(e){
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({
                photoFile: file,
                photoUrl: fileReader.result
            });
        };
        if (file){
            fileReader.readAsDataURL(file);
        }else{
            this.setState({photoUrl: "", photoFile: null});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[id]', this.state.id);
        formData.append("user[first_name]", this.state.first_name);
        formData.append('user[last_name]', this.state.last_name);
        formData.append('user[birthdate]', this.state.birthdate);
        formData.append('user[location]', this.state.location);
        formData.append('user[about]', this.state.about);
        formData.append('user[education]', this.state.education);
        formData.append('user[personality]', this.state.personality);
        formData.append('user[interest]', this.state.interest);
        formData.append('user[skill]', this.state.skill);
        formData.append("user[resume_url]", this.state.resume_url);

        const userId = this.state.id;
        if (this.state.photoFile){
            formData.append('user[photo]', this.state.photoFile);
        }
        this.props.action(formData, userId);
        window.location.replace(`#/users/${userId}`);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    updateSkill(){
        const tag = document.getElementById("skill-input").value;
        if ( tag.split(' ').join('') == "") return null;
        if (!Object.values(this.state.skill).includes(tag)){
            const updatedSkills = Object.values(this.state.skill).concat(tag);
            document.getElementById("skill-input").value = "";
            return this.setState({
                skill: updatedSkills
            })
        }
    }

    deleteSkill(value){
        const deletedSkills = Object.values(this.state.skill).filter( word => word != value)
        return this.setState({
            skill: deletedSkills
        });
    }

    updatePersonality(){
        const tag = document.getElementById("personality-input").value;
        if (tag.split(" ").join("") == "") return null;
        if (!Object.values(this.state.personality).includes(tag)){
            const updatedPersonalitys = Object.values(this.state.personality).concat(tag);
            document.getElementById("personality-input").value = "";
            return this.setState({
                personality: updatedPersonalitys
            })
        }
    }

    deletePersonality(value){
        const deletedPersonalitys = Object.values(this.state.personality).filter( word => word != value)
        return this.setState({
            personality: deletedPersonalitys
        });
    }

    updateInterest(){
        const tag = document.getElementById("interest-input").value;
        if (tag.split(" ").join("") == "") return null;
        if (!Object.values(this.state.interest).includes(tag)){
            const updatedInterests = Object.values(this.state.interest).concat(tag);
            document.getElementById("interest-input").value = "";
            return this.setState({
                interest: updatedInterests
            })
        }
    }

    deleteInterest(value){
        const deletedInterests = Object.values(this.state.interest).filter( word => word != value)
        return this.setState({
            interest: deletedInterests
        });
    }
    
    render(){
        
        if (!this.state.last_name) this.state.last_name="";
        const preview = this.state.photoUrl ? (
          <img src={this.state.photoUrl} className="profile-photo-img" />
        ) : (
          <img className="profile-photo-img"/>
        );

        const skill = (
          <ul>
            {Object.values(this.state.skill).map((skill) => (
              <li key={skill} className="profile-tag-li">
                {skill}
                <span
                  className="profile-tag-li-close"
                  onClick={() => this.deleteSkill(skill)}
                >
                  &times;
                </span>
              </li>
            ))}

            <div className="profile-tag-li-input">
              <input
                type="text"
                id="skill-input"
                placeholder="Add your skill"
              />

              <span className="profile-tag-li-check" onClick={this.updateSkill}>
                <FaCheck />
              </span>
            </div>
          </ul>
        );

        const personality = (
          <ul>
            {Object.values(this.state.personality).map((personality) => (
              <li key={personality} className="profile-tag-li">
                {personality}
                <span
                  className="profile-tag-li-close"
                  onClick={() => this.deletePersonality(personality)}
                >
                  &times;
                </span>
              </li>
            ))}

            <div className="profile-tag-li-input">
              <input
                type="text"
                id="personality-input"
                placeholder="Describe your personality"
              />
              <span
                className="profile-tag-li-check"
                onClick={this.updatePersonality}
              >
                <FaCheck />
              </span>
            </div>
          </ul>
        );
        const interest = (
          <ul>
            {Object.values(this.state.interest).map((interest) => (
              <li key={interest} className="profile-tag-li">
                {interest}
                <span
                  className="profile-tag-li-close"
                  onClick={() => this.deleteInterest(interest)}
                >
                  &times;
                </span>
              </li>
            ))}

            <div className="profile-tag-li-input">
              <input
                type="text"
                id="interest-input"
                placeholder="Add your interest"
              />
              <span
                className="profile-tag-li-check"
                onClick={this.updateInterest}
              >
                <FaCheck />
              </span>
            </div>
          </ul>
        );

        return (
          <form onSubmit={this.handleSubmit}>
            <div className="profile-show-main-div">
              <div className="profile-photo-div">
                {preview}
                <input
                    type="file"
                    onChange={this.handleFile}
                    className=""
                />
                
                <ul className="profile-element-lable-ul">
                  <li>
                    <label className="profile-element-lable">
                      First Name:{" "}
                    </label>
                    <input
                      type="text"
                      value={this.state.first_name}
                      onChange={this.update("first_name")}
                      className="profile-element"
                    />
                  </li>
                  <li>
                    <label className="profile-element-lable">Last Name: </label>
                    <input
                      type="text"
                      value={this.state.last_name}
                      onChange={this.update("last_name")}
                      className="profile-element"
                    />
                  </li>

                  <li>
                    <label className="profile-element-lable">Birthdate:</label>
                    <input
                        type="date"
                        value={this.state.birthdate}
                        onChange={this.update("birthdate")}
                        className="profile-element"
                    />
                  </li>

                  <li>
                    <label className="profile-element-lable">Location: </label>
                    <input
                        type="text"
                        value={this.state.location}
                        onChange={this.update("location")}
                        className="profile-element"
                    />
                  </li>
                </ul>
              </div>

              <ul className="profile-ul">
                <li className="profile-element-li">
                  <label className="profile-element-lable">Education:</label>
                  <input
                    type="text"
                    value={this.state.education}
                    onChange={this.update("education")}
                    className="profile-element-block"
                  />
                </li>

                <li className="profile-element-li">
                  <label className="profile-element-lable">About:</label>
                  <textarea
                    type="text"
                    value={this.state.about}
                    maxLength={250}
                    onChange={this.update("about")}
                    className="profile-element-block about"
                  />
                </li>
                <li className="profile-element-li">
                  <label className="profile-element-lable">Skill:</label>
                  {skill}
                </li>
                <li className="profile-element-li">
                  <label className="profile-element-lable">Personality:</label>
                  {personality}
                </li>
                <li className="profile-element-li">
                  <label className="profile-element-lable">Interest:</label>
                  {interest}
                </li>
              </ul>

              <h3 className="profile-edit-icon">
                <button type="submit">
                  <FiSave />
                </button>
              </h3>
            </div>
          </form>
        );
    }
}

export default connect(mSTP, mDTP)(ProfileEdit)

