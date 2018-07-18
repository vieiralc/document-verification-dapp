import React, { Component } from 'react'
import Header from './partials/Header'
import SubmitDocument from './SubmitDocument'
import ChainBlocks from './ChainBlocks'
import Connection from '../contract/ContractConnection'
import '../css/index.css'


export default class App extends Component {

  constructor() {
    super()
    this.defaultAccount = new Connection().getDefaultAccount()
  }

  render() {
    return (
      <div>  
        <Header cbAddress={this.defaultAccount}/>
        <div className='row'>
          <SubmitDocument/>
          <ChainBlocks/>
        </div>
      </div>
    );
  }
}