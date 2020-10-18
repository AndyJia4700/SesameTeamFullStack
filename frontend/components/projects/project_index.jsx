import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from "../../actions/project_actions";
import { fetchTags } from "../../actions/tag_actions";

const mSTP = state => {
  return {
    projects: Object.values(state.entities.projects),
    tags: state.entities.tags
  }
}

const mDTP = dispatch => {
  // debugger
  return {
    fetchProjects: (query) => dispatch(fetchProjects(query)),
    fetchTags: () => dispatch(fetchTags()),
  };
}

class ProjectIndex extends React.Component{
  constructor(props){
    super(props);
    // this.state.search = "";
    this.tagAttached = this.tagAttached.bind(this);
  }

  componentDidMount(){
    // debugger
    const query = this.props.location.search;
    this.props.fetchProjects(query);
    this.props.fetchTags();
  }

  tagAttached(e){
    e.preventDefault();
    // const tag_id = document.getElementById("")
    // this.setState({
    //   search: 
    // })
    
  }

  render(){
    const {projects, tags} = this.props;
    // debugger;
    const tagList = Object.values(tags).map( tag => 
      <li key={tag.id} className="project-form-tag-li" onClick={this.tagAttached}> 
        {tag.tag_name}
      </li>
    )

    const projectList = projects.map((project) => (

      <li key={project.id} className="project-index-li">
        <Link to={`/projects/${project.id}`}>
          <img src={project.pictureUrl} className="project-index-li-img" />
          <p>{project.project_title}</p>
          <p>{project.tag_id}</p>
        </Link>
      </li>
    ));

    return (
      <div className="profile-index-main-div">
        <ul>{tagList}</ul>
        <ul>{projectList}</ul>
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(ProjectIndex);

