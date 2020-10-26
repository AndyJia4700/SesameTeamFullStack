import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from "../../actions/project_actions";
import { fetchTags } from "../../actions/tag_actions";
import { FiCheck, FiSearch } from "react-icons/fi"

const mSTP = state => {
  return {
    projects: Object.values(state.entities.projects),
    tags: state.entities.tags
  }
}

const mDTP = dispatch => {
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
    this.tagRemove = this.tagRemove.bind(this);
    this.update = this.update.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }

  componentDidMount(){
    // debugger
    this.props.fetchTags();
    const query = this.props.location.search
    this.props.fetchProjects(query);
  }

  tagAttached(value){
    if (this.state.tagArr.length > 3) return null;
    const val = parseInt(value);
    const newVal = this.state.tagArr.concat(val);
    document.getElementById("tag-filter").value = "";

    if (!this.state.tagArr.includes(val)){
      return this.setState({
        tagArr: newVal
      });
    }
  }

  tagRemove(value){
    const removeTag = this.state.tagArr.filter(
      id => id != value
    )
    return this.setState({
      tagArr: removeTag
    })
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

    const mainSearch = (
      <div className="project-index-main-search-div">
        <input 
          type="text"
          id="main-search"
          placeholder="What's in your mind?"
        />
        <span onClick={this.updateHistory} className="project-index-main-search-span">
          <FiSearch/>
        </span>
      </div>
    );
    
    if (!Object.values(this.props.tags)[0])return null;

    const {projects, tags} = this.props;

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

    const tagFilter = this.state.tagArr.map(tagId =>
      <li key={tagId*2} className="project-index-tagfilter-li">
        {tags[tagId].tag_name + '  '}

        <span onClick={() => this.tagRemove(tagId)}>
          &times;
        </span>
      </li>
    )
    
    const tagInput = (
      <input 
        type="text"
        id="tag-filter"
        placeholder="Filter Input limit 4"
        onChange={this.update("search")}
        // onClick={() => document.getElementById('tagHint').style.display = "inline"}
      />
    );

    let tagSearchKey = this.state.search.toLowerCase();
    const tagHint = Object.values(this.props.tags).map((tag) => {
      if (tag.tag_name && tag.tag_name.toLowerCase().includes(tagSearchKey)) {
        return (
        <li 
          key={tag.id} 
          className="project-form-tag-search-li" 
          onClick={() => this.tagAttached(tag.id)}
        >
          {tag.tag_name}
        </li>
        )
      }
    });

    const resultList = projectList.map(project =>
      <li key={project.id} >
        <Link to={`/projects/${project.id}`} className="project-index-result-li">
          <img src={project.pictureUrl} className="project-index-li-img" />
          <div className="project-index-result-li-div">
            <p className="project-index-result-li-div-title">{project.project_title}</p>
            {/* <p className="project-index-result-li-div-description">{project.project_description}</p> */}
            
            <ul>
              {
                project.tag_id.map(id => 
                  <li key={id} className="project-form-tag-li">
                    {this.props.tags[id].tag_name}
                  </li>
                )
              }
            </ul>
          </div>
        </Link>
      </li>
    );

    return (
      <div>
        <div className="project-index-search-div">
            {mainSearch}

            <ul className="project-index-tagfilter-ul">
            {tagFilter}
            </ul>

            <div>{tagInput}
              <ul id="tagHint" className="project-index-search-hint-ul">
                {tagHint}
              </ul>
            </div>

          </div>

        <div className="project-index-main-div">
          <ul className="project-index-project-ul">
            {resultList}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(ProjectIndex);

