import React, { Component } from 'react'
import ContractConnection from '../contract/ContractConnection'
import InfoTable from './InfoTable'
import Form from './Form'
import SubmissionTable from './SubmissionTable'
import ResultTable from './ResultTable'


export default class SubmitDocument extends Component {
  
    constructor() {
        super()
        this.connection     = new ContractConnection()
        this.contract       = this.connection.getContract()
        this.accountBalance = this.connection.getDefaultAccountBalance()
    }

    render() {
        return (
            <div className='col-md-6'>
                <InfoTable sm_address={this.contract.address} cb_balance={this.accountBalance}/>
                <Form/>                
                <SubmissionTable contract={this.contract}/>
                <ResultTable/>
            </div>
        )
    }
}