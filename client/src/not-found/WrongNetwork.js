import React, { Component } from 'react'

import "./style.css";

class WrongNetwork extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <p className="message">
                    Sorry you are on the wrong net. <br/>
                    Please, connect to Ropsten Network
                </p>
            </div>
        )
    } 
}

export default WrongNetwork;