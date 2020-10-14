import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, updateUser } from "../../actions/user_actions";
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

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.updateFiled = this.updateFiled.bind(this);
    this.deleteFiled = this.deleteFiled.bind(this);
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.fetchUser(userId);
  }

  handleFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        photoFile: file,
        photoUrl: fileReader.result,
      });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ photoUrl: "", photoFile: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user[id]", this.state.id);
    formData.append("user[first_name]", this.state.first_name);
    formData.append("user[last_name]", this.state.last_name);
    formData.append("user[birthdate]", this.state.birthdate);
    formData.append("user[location]", this.state.location);
    formData.append("user[about]", this.state.about);
    formData.append("user[education]", this.state.education);
    formData.append("user[personality]", this.state.personality);
    formData.append("user[interest]", this.state.interest);
    formData.append("user[skill]", this.state.skill);
    formData.append("user[resume_url]", this.state.resume_url);

    const userId = this.state.id;
    if (this.state.photoFile) {
      formData.append("user[photo]", this.state.photoFile);
    }
    
    if (confirm("Save Changes?")) {
      this.props.action(formData, userId);
      setTimeout(() => {
        window.location.replace(`#/users/${userId}`);
        window.location.reload();
        return false;
      }, 500);
    } else {
      window.location.reload();
      return false;
    }

  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  updateFiled(ele) {
    const id = `${ele + "-input"}`;
    const tag = document.getElementById(`${id}`).value;

    if (tag.split(" ").join("") == "") return null;
    if (tag.includes(",")) {
      window.alert("no comma allowed");
      return null;
    }

    if (!Object.values(this.state[ele]).includes(tag)) {
      const updatedFields = Object.values(this.state[ele]).concat(tag);
      document.getElementById(`${id}`).value = "";
      return this.setState({
        [ele]: updatedFields,
      });
    }
  }

  deleteFiled(ele,value){
    const deletedFields = Object.values(this.state[ele]).filter(
      (word) => word != value
    );

    return this.setState({
      [ele]: deletedFields,
    });
  }


  render() {
    if (!this.state.last_name) this.state.last_name = "";
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} className="profile-photo-img" />
    ) : (
      <img className="profile-photo-img" />
    );

    const skill = (
      <ul>
        {Object.values(this.state.skill).map((skill) => (
          <li key={skill} className="profile-tag-li">
            {skill}
            <span
              className="profile-tag-li-close"
              onClick={() => this.deleteFiled("skill", skill)}
            >
              &times;
            </span>
          </li>
        ))}

        <div className="profile-tag-li-input">
          <input type="text" id="skill-input" placeholder="Add your skill" />

          <span
            className="profile-tag-li-check"
            onClick={() => this.updateFiled("skill")}
          >
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
              onClick={() => this.deleteFiled("personality", personality)}
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
            onClick={() => this.updateFiled("personality")}
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
              onClick={() => this.deleteFiled("interest", interest)}
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
            onClick={() => this.updateFiled("interest")}
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
              className="profile-photo-upload"
            />

            <ul className="profile-element-lable-ul">
              <li>
                <label className="profile-element-lable">First Name: </label>
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
              <FiSave className="profile-edit-icon-Fi"/>
            </button>
          </h3>
        </div>
      </form>
    );
  }
}

export default connect(mSTP, mDTP)(ProfileEdit)

