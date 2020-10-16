import React from 'react';
import { connect } from 'react-redux';
import { updateProject, fetchProject } from "../../actions/project_actions";
import { fetchTags, createTag } from "../../actions/tag_actions";
import ProjectForm from './project_form';
import { FiSave } from "react-icons/fi";

const mSTP = (state, ownProps) => {
    const projectId = ownProps.match.params.projectId;
    const project = state.entities.projects[projectId];
    const tags = state.entities.tags

    return {
      currentUser: state.session.currentUser,
      project,
      tags,
      formType: <FiSave/>,
    };
};

const mDTP = dispatch => {
    return {
        fetchProject: (projectId) => dispatch(fetchProject(projectId)),
        fetchTags: () => dispatch(fetchTags()),
        createTag: tag => dispatch(createTag(tag)),
        action: (formData, projectId) => dispatch(updateProject(formData, projectId)),
    };
}

class EditProjectForm extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const projectId = this.props.match.params.projectId;
        this.props.fetchProject(projectId);
        this.props.fetchTags();
    }

    render(){
        const {action, project, currentUser, formType, tags, createTag} = this.props;

        if (!project) return null;
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

export default connect(mSTP, mDTP)(EditProjectForm)

