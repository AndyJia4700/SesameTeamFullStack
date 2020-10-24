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
            <div>
                this is Splash page
            </div>
        )
    }
}

// export default connect(mSTP)(mDTP)(SplashPage);
export default (SplashPage);

