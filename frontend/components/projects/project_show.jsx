import React from 'react';
import {connect} from 'react-redux';
import { fetchProject } from '../../actions/project_actions';


const mSTP = (state, ownProps) => {
    const projectId = ownProps.match.params.projectId;
    const project = state.entities.projects[projectId]
    return {
        project,
        currentUser: state.session.currentUser,
    }
}

const mDTP = dispatch => {
    return {
      fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    };
}

class ProjectShow extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const projectId = this.props.match.params.projectId;
        this.props.fetchProject(projectId);
    }

    render(){
        if (!this.props.project) return null;
        return <div>{this.props.project.project_description}</div>;
    }
}

export default connect(mSTP, mDTP)(ProjectShow)