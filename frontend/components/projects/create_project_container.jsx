import React from "react";
import { connect } from 'react-redux';
import { createProject } from "../../actions/project_actions";
import { createTag, fetchTags } from "../../actions/tag_actions";
import ProjectForm from './project_form';
import {GrSave} from 'react-icons/gr';


const mSTP = (state) => {
  const tags = state.entities.tags;
  return{
    project: {
      project_title: "",
      project_description: "",
      role: [],
      tag_id: [],
    },
    tags,
    tag: {
      tag_name: "",
    },
    currentUser: state.session.currentUser,
    formType: <GrSave/>,
  }
};

const mDTP = (dispatch) => ({
  action: (project) => dispatch(createProject(project)),
  fetchTags: () => dispatch(fetchTags()),
  createTag: (tag) => dispatch(createTag(tag)),
});

class CreateProjectForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTags();
  }

  render(){
    if (!this.props.currentUser) return null;
    
    const {
      action,
      project,
      currentUser,
      formType,
      tags,
      createTag,
    } = this.props;

    return (
      <div>
        <ProjectForm
          action={action}
          project={project}
          currentUser={currentUser}
          formType={formType}
          tags={tags}
          createTag={createTag}
        />
      </div>
    );
  }
}



export default connect(mSTP, mDTP)(CreateProjectForm);