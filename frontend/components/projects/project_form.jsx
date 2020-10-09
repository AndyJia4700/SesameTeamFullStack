import { takeRight } from 'lodash';
import React from 'react';
import { FaCheck } from "react-icons/fa";

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.project;
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
  }

  componentDidMount() {
    this.setState({
      leader_id: this.props.currentUser.id,
    });
  }

  handleFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        pictureFile: file,
        pictureUrl: fileReader.result,
      });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ pictureUrl: "", pictureFile: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("project[id]", this.state.id);
    formData.append("project[project_title]", this.state.project_title);
    formData.append(
      "project[project_description]",
      this.state.project_description
    );
    formData.append("project[role]", this.state.role);

    if (this.state.pictureFile) {
      formData.append("project[picture]", this.state.pictureFile);
    }
    // debugger;
    this.props.action(formData);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  updateRole(){
    // debugger
    const role = document.getElementById("role").value;
    if (role.split(' ').join('') == "") return null;
    if (!Object.values(this.state.role).includes(role)){
      const updateRoles = Object.values(this.state.role).concat(role);
      document.getElementById("role").value = "";
      return this.setState({
        role: updateRoles
      })
    }
  }

  deleteRole(value){
    // debugger
    const deletedRoles = Object.values(this.state.role).filter(
      (word) => word != value
    );
    return this.setState({
      role: deletedRoles,
    });
  }

  render() {

    const preview = this.state.pictureUrl ? (
      <img src={this.state.pictureUrl} className="profile-photo-img" />
    ) : (
      <img className="profile-photo-img" />
    );

    const role = (
      <ul>
        {Object.values(this.state.role).map((role) => (
          <li key={role} className="profile-tag-li">
            {role}
            <span
              className="profile-tag-li-close"
              onClick={() => this.deleteRole(role)}
            >
              &times;
            </span>
          </li>
        ))}

        <div className="profile-tag-li-input">
          <input type="text" id="role" placeholder="Add your role" />
          <span className="profile-tag-li-check" onClick={this.updateRole}>
            <FaCheck />
          </span>
        </div>
      </ul>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {preview}
          <input type="file" onChange={this.handleFile} />
        </div>

        <div>
          <label htmlFor="">Title:</label>
          <input
            type="text"
            value={this.state.project_title}
            onChange={this.update("project_title")}
            placeholder="Title"
            className="profile-element"
          />
        </div>

        <div>
          <label htmlFor="">Description:</label>
          <textarea
            type="text"
            value={this.state.project_description}
            onChange={this.update("project_description")}
            placeholder="Description"
            className="profile-element"
          />
        </div>

        <div>
          {role}
        </div>

        <button type="submit">{this.props.formType}</button>
      </form>
    );
  }
}

export default ProjectForm;