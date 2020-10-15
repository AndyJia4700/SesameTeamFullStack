import React from "react";
import { connect } from 'react-redux';
import { createProject } from "../../actions/project_actions";
import { createTag, fetchTags } from "../../actions/tag_actions";
import ProjectForm from './project_form';
import {GrSave} from 'react-icons/gr';
import { FaCheck } from "react-icons/fa";



const mSTP = (state) => {
  return{
    project: {
      project_title: "",
      project_description: "",
      role: [],
      tag_id: [],
    },
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



export default connect(mSTP, mDTP)(ProjectForm)