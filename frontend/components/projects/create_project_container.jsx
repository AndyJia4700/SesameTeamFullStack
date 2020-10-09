import React from "react";
import { connect } from 'react-redux';
import { createProject } from '../../actions/project_actions';
import ProjectForm from './project_form';
import {GrSave} from 'react-icons/Gr';

const mSTP = (state) => {
  return{
    project: {
      project_title: "",
      project_description: "",
      role: [],
    },
    currentUser: state.session.currentUser,
    formType: <GrSave/>
  }
};

const mDTP = dispatch => ({
  action: project => dispatch(createProject(project))
});



export default connect(mSTP, mDTP)(ProjectForm)