import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, updateUser } from "../../actions/user_action";

const mSTP = (state, ownProps) => {
    const userId = state.session.currentUser.id;
    const user = state.entities.users[userId];
    return {
        user
    };
}

const mDTP = dispatch => {
    
    return {
      fetchUsers: () => dispatch(fetchUsers()),
      fetchUser: (userId) => dispatch(fetchUser(userId)),
      action: (formData, userId) => dispatch(updateUser(formData, userId)),
    };
}

class ProfileEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.user;
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        const userId = this.props.match.params.userId;
        // this.props.fetchUsers();
        this.props.fetchUser(userId);
    }

    handleFile(e){
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({
                photoFile: file,
                photoUrl: fileReader.result
            });
        };
        if (file){
            fileReader.readAsDataURL(file);
        }else{
            this.setState({photoUrl: "", photoFile: null});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[id]', this.state.id);
        formData.append("user[first_name]", this.state.first_name);
        formData.append('user[last_name]', this.state.last_name);
        formData.append('user[birthdate]', this.state.birthdate);
        formData.append('user[location]', this.state.location);
        formData.append('user[about]', this.state.about);
        formData.append('user[education]', this.state.education);
        formData.append('user[personality]', this.state.personality);
        formData.append('user[interest]', this.state.interest);
        formData.append('user[skill]', this.state.skill);
        formData.append("user[resume_url]", this.state.resume_url);

        const userId = this.state.id;
        if (this.state.photoFile){
            formData.append('user[photo]', this.state.photoFile);
        }
        this.props.action(formData, userId);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    updateArray(){
        
    }
    
    render(){
        
        if (!this.state.last_name) this.state.last_name="";
        const preview = this.state.photoUrl ? <img src={this.state.photoUrl} className="profile-photo-img"/> : null;
        // debugger;


        return (
          <form onSubmit={this.handleSubmit}>
            {preview}
            <br />
            <label htmlFor="">Update Photo</label>
            <input type="file" onChange={this.handleFile} />
            <br />
            <label htmlFor="">First Name</label>
            <input
              type="text"
              value={this.state.first_name}
              onChange={this.update("first_name")}
              className="profile-element"
            />
            <br />
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              value={this.state.last_name}
              onChange={this.update("last_name")}
              className="profile-element"
            />
            <br />

            <label htmlFor="">Skill</label>
            {
                Object.values(this.state.skill).map(skill => (
                <li key={skill}>
                    <input
                    type="text"
                    value={skill}
                    onChange={this.updateArray}
                    />
                </li>
                ))
            }

            <button type="submit">Update</button>
          </form>
        );
    }
}

export default connect(mSTP, mDTP)(ProfileEdit)

