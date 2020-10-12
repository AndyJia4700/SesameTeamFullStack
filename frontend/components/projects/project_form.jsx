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
    if (!this.state.id) return null;
    const projectId = this.state.id;
    window.location.replace(`#/projects/${projectId}`);
    window.location.reload();
    return false;
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  updateRole(){
    // debugger
    let roleTitle = document.getElementById("role-title").value;
    let roleDescription = document.getElementById("role-description").value;
    
    if (roleTitle.split(" ").join("") == "") {
      window.alert("please enter a role title");
      return null;
    };

    if (roleTitle.includes(",")) {
      window.alert("no comma allowed in role title");
      return null;
    };

    if (!roleDescription) return "";

    const updateRoles = Object.values(this.state.role);
    updateRoles.push([roleTitle, roleDescription]);
    // debugger;
    // document.getElementById("role-title").value = "";
    // document.getElementById("role-description").value = "";

    return this.setState({
      role: updateRoles
    })

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

    // const preview = this.state.pictureUrl ? (
    //   <video className="video-view" controls>
    //     <source src={this.state.pictureUrl} type="video/mp4" />
    //   </video>
    // ) : (
    //   <img className="profile-photo-img" />
    // );
    let i = 0;
    const role = (
      <ul>
        {Object.values(this.state.role).map((role) => (
          <li key={i++} className="">
            <h3>{role[0]}</h3>
            <p>{role[1]}</p>
            <span
              className="profile-tag-li-close"
              onClick={() => this.deleteRole(role)}
            >
              &times;
            </span>
            <br/>
          </li>
        ))}

        <div className="">
          <input type="text" id="role-title" placeholder="Role Titlte" />
          <textarea
            type="text"
            id="role-description"
            placeholder="Role Description"
          />
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