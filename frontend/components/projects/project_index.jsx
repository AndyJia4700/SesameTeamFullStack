import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from "../../actions/project_actions";
import { fetchTags } from "../../actions/tag_actions";
import { FiCheck, FiSearch } from "react-icons/fi"

const mSTP = state => {
  // debugger
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
    // debugger
    super(props);
    this.state = {
      tagArr: [],
      search: "",
    };
    this.tagAttached = this.tagAttached.bind(this);
    this.update = this.update.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }

  componentDidMount(){
    debugger
    this.props.fetchTags();
    const query = this.props.location.search
    this.props.fetchProjects(query);
  }

  tagAttached(e){
    e.preventDefault();
    const newVal = this.state.tagArr.concat(e.currentTarget.value)
    if (!this.state.tagArr.includes(e.currentTarget.value)){
      return this.setState({
        tagArr: newVal
      });
    }
  }

  update(field){
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  updateHistory(){
    let changes = document.getElementById("main-search") ? document.getElementById("main-search").value : "";
    this.props.history.push({
      search: `?${changes}`
    });
    window.location.reload();
  }

  render(){
    // debugger
    const mainSearch = (
      <div>
        <input 
          type="text"
          id="main-search"
          placeholder="What's in your mind?"
        />
        <span onClick={this.updateHistory}><FiSearch/></span>
      </div>
    );
    const {projects, tags} = this.props;

    // const tagList = Object.values(tags).map( tag => 
    //   <li 
    //     key={tag.id}
    //     id={"tag"+tag.id}
    //     value={tag.id}
    //     onClick={this.tagAttached}> 
    //     {tag.tag_name}
    //   </li>
    // );

    let projectList;
    const projectF1 = projects.filter(project =>
      project.tag_id.includes(this.state.tagArr[0])
    );
    const projectF2 = projectF1.filter(project =>
      project.tag_id.includes(this.state.tagArr[1])
    );
    const projectF3 = projectF2.filter(project =>
      project.tag_id.includes(this.state.tagArr[2])
    );
    const projectF4 = projectF3.filter(project =>
      project.tag_id.includes(this.state.tagArr[3])
    );

    projectList = this.state.tagArr[0] ? projectF1 : projects;
    projectList = this.state.tagArr[1] ? projectF2 : projectList;
    projectList = this.state.tagArr[2] ? projectF3 : projectList;
    projectList = this.state.tagArr[3] ? projectF4 : projectList;


    // debugger;
    const tagFilter = this.state.tagArr.map(tagId =>
      <li key={tagId*2}>
        {this.props.tags[tagId].tag_name}
        <span>
          &times;
        </span>
      </li>
    )
    
    const tagInput = (
      <div>
        <input 
          type="text"
          id="tag-filter"
          placeholder="Filter Input"
          onChange={this.update("search")}
        />
        <span onClick={this.tagAttached}>
          <FiCheck/>
        </span>
      </div>
    );

    

    const resultList = projectList.map(project =>
      <li key={project.id}>
        <Link to={`/projects/${project.id}`}>
          <img src={project.pictureUrl} className="project-index-li-img" />
          <p>{project.project_title}</p>
          <ul>
            {
              project.tag_id.map(id => 
                <li key={id} className="project-form-tag-li">
                  {this.props.tags[id].tag_name}
                </li>
              )
            }
          </ul>
        </Link>
      </li>
    );

    return (
      <div className="profile-index-main-div">
        {mainSearch}
        <div>{this.state.tagArr}</div>
        {/* <ul>{tagList}</ul> */}
        <div>
          <ul>{tagFilter}</ul>
          {tagInput}
        </div>
        <ul>{resultList}</ul>
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(ProjectIndex);

