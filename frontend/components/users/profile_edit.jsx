import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, updateUser } from "../../actions/user_action";

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

        // debugger;

        const userId = this.state.id;
        if (this.state.photoFile){
            formData.append('user[photo]', this.state.photoFile);
        }
        this.props.action(formData, userId);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    updateSkill(){
        const tag = document.getElementById("skill-input").value;
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
        const preview = this.state.photoUrl ? <img src={this.state.photoUrl} className="profile-photo-img"/> : null;
        const birthdate = (
          <div>
            <label className="profile-element-lable">Birthdate</label>
            <input
              type="date"
              value={this.state.birthdate}
              onChange={this.update("birthdate")}
              className="profile-tag-li"
            />
          </div>
        );

        const skill = (
          <ul className="profile-tag-ul">
            <label className="profile-element-lable">Skill</label>
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

            <input type="text" id="skill-input" className="profile-tag-li" />
            <span onClick={this.updateSkill}>Add-skill</span>
          </ul>
        );

        const personality = (
          <div>
            <label className="profile-element-lable">Personality</label>
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

            <input
              type="text"
              id="personality-input"
              className="profile-element"
            />
            <span onClick={this.updatePersonality}>Add-Personality</span>
          </div>
        );
        const interest = (
          <div>
            <label className="profile-element-lable">Interest</label>
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

            <input
              type="text"
              id="interest-input"
              className="profile-tag-li"
              placeholder="Add your interest"
            />
            <span onClick={this.updateInterest}>Add-Interest</span>
          </div>
        );

        return (
          <form onSubmit={this.handleSubmit} >
            {preview}
            <br />
            <label className="profile-element-lable">Update Photo</label>
            <input type="file" onChange={this.handleFile} />
            <br />
            <label className="profile-element-lable">First Name</label>
            <input
              type="text"
              value={this.state.first_name}
              onChange={this.update("first_name")}
              className="profile-element"
            />
            <br />
            <label className="profile-element-lable">Last Name</label>
            <input
              type="text"
              value={this.state.last_name}
              onChange={this.update("last_name")}
              className="profile-element"
            />
            <br />
            {birthdate}
            <br/>
            <label className="profile-element-lable">Education</label>
            <input
              type="text"
              value={this.state.education}
              onChange={this.update("education")}
              className="profile-element"
            />
            <br />
            <label className="profile-element-lable">About</label>
            <textarea
              type="text"
              value={this.state.about}
              onChange={this.update("about")}
              className="profile-element"
            />
            <br />

            {skill}
            {personality}
            {interest}

            <button type="submit">Update</button>
          </form>
        );
    }
}

export default connect(mSTP, mDTP)(ProfileEdit)

