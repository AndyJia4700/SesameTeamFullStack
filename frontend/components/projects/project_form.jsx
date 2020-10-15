import React from "react";
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
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  componentDidMount() {
    this.setState({
      leader_id: this.props.currentUser.id,
    });
  }

  addTag(e) {
    e.preventDefault();
    const addedTag = document.getElementById("tag_input").value;

    if (Number(addedTag)) {
      alert("please don't use a number as this tag");
      return null;
    }

    if (addedTag.split(" ").join("") == "") return null;

    if (addedTag.includes(",")) {
      alert("no comma allowed here");
      return null;
    }

    const tagArr = Object.values(this.state.tag_id).map((id) =>
      this.props.tags[id] ? this.props.tags[id].tag_name : id
    );

    if (
      tagArr.includes(addedTag) ||
      Object.values(this.state.tag_id).includes(addedTag)
    ) {
      return null;
    } else {
      this.props.createTag({ tag: { tag_name: addedTag } });
      const updatedTags = Object.values(this.state.tag_id).concat(addedTag);
      document.getElementById("tag_input").value = "";
      this.setState({
        tag_id: updatedTags,
      });
    }
  }

  removeTag(value) {
    const removeTag = Object.values(this.state.tag_id).filter(
      // (id) => this.props.tags[id].tag_name != value
      (id) => id != value
    );
    return this.setState({
      tag_id: removeTag,
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
    formData.append("project[tag_id]", this.state.tag_id);
    formData.append(
      "project[project_description]",
      this.state.project_description
    );

    this.state.role.map(
      (ele) => (
        ele[0].includes("ÿÿ") ? (ele[0] = ele[0]) : (ele[0] = ele[0] + "ÿÿ"),
        ele[1].includes("üü") ? (ele[1] = ele[1]) : (ele[1] = ele[1] + "üü")
      )
    );

    formData.append("project[role]", this.state.role);

    if (this.state.pictureFile) {
      formData.append("project[picture]", this.state.pictureFile);
    }

    if (confirm("Save Changes?")) {
      this.props.action(formData);
      if (!this.state.id) {
        window.location.replace(`#/users/${this.props.currentUser.id}`);
        window.location.reload();
        return false;
      } else {
        const projectId = this.state.id;
        window.location.replace(`#/projects/${projectId}`);
        window.location.reload();
        return false;
      }
    } else {
      window.location.reload();
      return false;
    }
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  updateRole() {
    let roleTitle = document.getElementById("role-title").value;
    let roleDescription = document.getElementById("role-description").value;

    if (roleTitle.split(" ").join("") == "") {
      window.alert("please enter a role title");
      return null;
    }

    if (roleTitle.includes(",")) {
      window.alert("no comma allowed in role title");
      return null;
    }
    if (roleTitle.includes("ÿ")) {
      window.alert("sorry, no ÿ allowed in role title");
      return null;
    }
    if (!roleDescription) return "";
    if (roleDescription.includes("ü")) {
      window.alert("sorry, no ü allowed in role description");
      return null;
    }

    const updateRoles = Object.values(this.state.role);
    updateRoles.push([roleTitle, roleDescription]);

    updateRoles.map(
      (ele) => (
        ele[0].includes("ÿÿ") ? (ele[0] = ele[0]) : (ele[0] = ele[0] + "ÿÿ"),
        ele[1].includes("üü") ? (ele[1] = ele[1]) : (ele[1] = ele[1] + "üü")
      )
    );

    document.getElementById("role-title").value = "";
    document.getElementById("role-description").value = "";

    return this.setState({
      role: updateRoles,
    });
  }

  deleteRole(value) {
    const deletedRoles = Object.values(this.state.role).filter(
      (word) => word != value
    );

    deletedRoles.map(
      (ele) => (
        ele[0].includes("ÿÿ") ? (ele[0] = ele[0]) : (ele[0] = ele[0] + "ÿÿ"),
        ele[1].includes("üü") ? (ele[1] = ele[1]) : (ele[1] = ele[1] + "üü")
      )
    );

    return this.setState({
      role: deletedRoles,
    });
  }

  render() {
    const preview = this.state.pictureUrl ? (
      <img src={this.state.pictureUrl} className="project-form-img" />
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
          <li key={i++} className="project-form-role-li">
            <div className="project-form-role-div">
              <span className="project-form-role-span1">
                {!role[0].includes("ÿÿ") ? role[0] : role[0].slice(0, -2)}
              </span>
              <span
                className="profile-tag-li-close"
                onClick={() => this.deleteRole(role)}
              >
                &times;
              </span>
            </div>
            <p>{!role[1].includes("üü") ? role[1] : role[1].slice(0, -2)}</p>
          </li>
        ))}

        <div className="project-form-role-input-div">
          <div className="project-form-role-div">
            <input
              type="text"
              id="role-title"
              placeholder="Role Titlte"
              className="project-form-roletitle-input"
            />
            <span className="profile-tag-li-check" onClick={this.updateRole}>
              <FaCheck />
            </span>
          </div>
          <textarea
            type="text"
            id="role-description"
            placeholder="Role Description"
          />
        </div>
      </ul>
    );

    const tag_id = (
      <ul>
        {Object.values(this.state.tag_id).map((id) => (
          <li key={id}>
            {this.props.tags[id] ? this.props.tags[id].tag_name : id}
            <span
              className="profile-tag-li-close"
              onClick={() => this.removeTag(id)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
    );

    const tagInput = (
      <div className="project-form-tag-input">
        <input type="text" id="tag_input" placeholder="Add a tag here" />
        <span onClick={this.addTag}>
          <FaCheck />
        </span>
      </div>
    );

    return (
      <form onSubmit={this.handleSubmit} className="project-form-main-div">
        <div className="project-form-title-div">
          <div></div>
          <input
            type="text"
            value={this.state.project_title}
            onChange={this.update("project_title")}
            placeholder="Your project Title"
            className="project-form-title-input"
          />
          <button type="submit" className="">
            <span className="project-form-submit-button">
              {this.props.formType}
            </span>
          </button>
        </div>

        <div className="project-form-div">
          <div className="project-form-img-div">
            <label className="profile-element-lable">
              <input
                type="file"
                onChange={this.handleFile}
                className="project-form-img-upload"
              />
            </label>

            <div>{preview}</div>

            {tag_id}
            {tagInput}
          </div>

          <div className="project-form-rest-div">
            <label className="profile-element-lable">Description:</label>
            <textarea
              type="text"
              value={this.state.project_description}
              onChange={this.update("project_description")}
              placeholder="Description"
              className="project-form-description-input"
            />
            <div>
              <label className="profile-element-lable">Role:</label>
              {role}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectForm;
