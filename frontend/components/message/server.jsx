import React from 'react';
import { Socket } from 'react-socket-io';
 
const uri = 'http://localhost/test';
const options = { transports: ['websocket'] };
 
class Server extends React.Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <Socket uri={uri} options={options}> 
                { this.props.children }
            </Socket>
        );
    }
}

export default Server;