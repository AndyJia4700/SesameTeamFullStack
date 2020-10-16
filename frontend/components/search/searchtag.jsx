import React from 'react';
import { connect } from 'react-redux';
import { fetchTags } from "../../actions/tag_actions";
import { FaCheck } from "react-icons/fa";

const mSTP = state => {
    const tags = state.entities.tags
    return {
        tags
    }
}

const mDTP = dispatch => {
    return {
        fetchTags: () => dispatch(fetchTags()),
    }
}

class SearchTag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: ""
        };
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.props.fetchTags();
    }
    
    update(field){
        return (e) => {
            this.setState({
                [field]: e.currentTarget.value
            })
        }
    }

    render(){
        let searchKey = this.state.search.toLowerCase();
        
        const tagHint = Object.values(this.props.tags).map(tag => {
            if (tag.tag_name && tag.tag_name.toLowerCase().includes(searchKey)) {
                return (
                    <li key={tag.id}>{tag.tag_name}</li>
                )
            }
        });

        return (
          <div className="project-form-tag-input">
            <input
              placeholder="enter tag here"
              type="text"
              id="tag_input"
              value={this.state.search}
              onChange={this.update("search")}
              className="profile-tag-li-input"
            />
            <span className="profile-tag-li-check">
              <FaCheck />
            </span>

            <ul>{tagHint}</ul>
          </div>
        );
    }
    
}

export default connect(mSTP, mDTP)(SearchTag)