import React from 'react';
import { connect } from 'react-redux';
// import  Server from './server';
// import Script from './script';

const mSTP = state => {
    return {
        currentUser:  state.session.currentUser
    }
}

class liveChat extends React.Component{
    constructor(props){
        super(props);
    }  

    render(){
        return(
            <div id="message-container" className="message-livechat-main-div">
                {/* <Server/>
                <Script/> */}
                
                <form id="send-container" className="message-livechat-form">
                    <input type="text"
                        id="message-input"
                    />
                    <button type="submit" id="send-button">Send</button>
                </form>
            </div>
        )
    }
}

export default connect(mSTP, null)(liveChat);