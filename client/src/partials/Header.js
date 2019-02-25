import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-dark">
        <div className="navbar-brand">
            <a href="/" id="my_title">Document Verification Dapp</a>
        </div>
        <div>
            <a href={`https://ropsten.etherscan.io/address/${this.props.cbAddress}`} target="_blank" rel="noopener noreferrer"  className="cb_address">{this.props.cbAddress}</a>
        </div>
      </nav>
    )
  }
}

export default Header;