import React, { Component } from 'react'
import ContractConnection from '../contract/ContractConnection'
import $ from 'jquery'

export default class SubmissionTable extends Component {
    
    constructor(props) {
        super(props)
        this.contract = new ContractConnection().getContract()
    }

    componentDidMount() {
        this.contract.numDocuments.call((err, numDocuments) => {
            $("#numDocs").html(numDocuments.toNumber());
        })
    }

    submitDocument = event => {
        $('#status').html('Submitting document, please wait...')
        setTimeout(() => {
            let hash = $('#fileHash').text()
            this.contract.newDocument(hash, (err, res) => {
              if (err) 
                this.setStatus('Error in submitting document hash')
              else {
                // res contém a TX HASH
                if (res) {
                    $('#status').html('Document hash submitted')
                    this.contract.numDocuments.call((err, numDocuments) => {
                        $("#numDocs").html(numDocuments.toNumber());
                    })
                } else
                    $('#status').html('Error in submitting document hash')
              }
            })
        }, 2000)
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    verifyDocument = event => {
        $('#status').html('Verifying document, please wait...')
        setTimeout(() => {
            let hash = $('#fileHash').text()
            this.contract.documentExists(hash, (err, res) => {
                if (res) {
                    this.contract.getDocument(hash, (error, result) => {
                        let theDate = new Date(result[0].toNumber() * 100)
                        let dateString = theDate.toLocaleDateString()
                        $('#docRes').html(dateString)
                        $('#docOwner').html(result[1])
                        $('#status').html('Document Verified')
                    })
                } else
                    $('#status').html('Document cannot be verified')
            })
        }, 2000)
    }

    render() {
      return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
            
                <table id='my_table' className="table table-striped">
                    <tbody>
                        <tr>
                            <td><strong>File</strong></td>
                            <td><span id='fileName'></span></td>
                        </tr>
                        <tr>
                            <td><strong>Hash</strong></td>
                            <td><span id='fileHash'></span></td>
                        </tr>
                        <tr>
                            <td> <strong> Options: </strong> </td>
                            <td rowSpan='2'>
                                <button className="btn waves-effect waves-light" onClick={e => this.submitDocument(e)}> Submit </button> &nbsp;
                                <button className="btn waves-effect waves-light" onClick={e => this.verifyDocument(e)}> Verify
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      )
    }
}