import React from 'react';
import { connect } from 'react-redux';

// const mSTP = state => {
//     return null
// }


// const mDTP = dispatch => {
//     return null
// }

class SplashPage extends React.Component{
    render(){
        return (
            <div className="splash-main-div">
                <img src={window.sesameteamURL} className="sesameteam-logo"/>
                <h4>
                    Welcome to Sesame Team.
                    <br/>
                    The idea of this site is to build team portfolio together. 
                    <br/>
                    You can post an idea and see who wants to work on your project.
                    <br/>
                    Just explore any topic you may interest, and connect leader to join his/her project.
                    <br/>
                    
                    
                </h4>
            
            </div>
        )
    }
}

// export default connect(mSTP)(mDTP)(SplashPage);
export default (SplashPage);

