import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {

  render() {
    return (
        <nav className="navbar navbar-light bg-dark">
            <Link to='/' id='my_title' className="navbar-brand">Document Verification Dapp</Link>
            <Link to='/' className='cb_address'> {this.props.cbAddress} </Link>
        </nav>
    )
  }
}
