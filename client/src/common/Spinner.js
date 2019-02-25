import React from 'react';
import spinner from './spinner.gif';

export default () => {
    return(
        <div style={{ marginTop: "10%"}}>
            <img
                src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
            <h3 className="text-center" style={{ color: "whitesmoke", fontSize: '32px' }}> Connecting to metamask, Web3, accounts, and contract... </h3>
        </div>
    );
};
