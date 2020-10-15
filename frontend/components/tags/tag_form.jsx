import React from "react";
import { connect } from "react-redux";
import { fetchTags, createTag } from "../../actions/tag_actions";
import { FaCheck } from "react-icons/fa";
const mSTP = (state) => {
  return {
    tag: {
      tag_name: "",
      tag_id: [],
    },
  };
};

const mDTP = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    createTag: (tagId) => dispatch(createTag(tagId)),
  };
};

class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.tag;
    this.update = this.update.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  componentDidMount() {
    this.props.fetchTags();
  }

  addTag() {
    const addedTag = document.getElementById("tag_input").value;
    const updatedTags = !Object.values(this.state.tag_id).includes(addedTag)
      ? Object.values(this.state.tag_id).concat(addedTag)
      : null;
    this.state.tag_name = addedTag;
    this.state.tag_id = updatedTags;
    document.getElementById("tag_input").value = "";
    this.props.createTag(this.state);
  }

  removeTag(value) {
    const removeTag = Object.values(this.state.tag_id).filter(
      (word) => word != value
    );
    return this.setState({
      tag_id: removeTag,
    });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  render() {
    const tag_id = (
      <ul>
        {Object.values(this.state.tag_id).map((tagName) => (
          <li key={tagName}>
            {tagName}
            <span
              className="profile-tag-li-close"
              onClick={() => this.removeTag(tagName)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
    );

    return (
      <div>
        {tag_id}
        <div>
          <input type="text" id="tag_input" placeholder="Add a tag here" />
          <span onClick={() => this.addTag()}>
            <FaCheck />
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mSTP, mDTP)(TagForm);
