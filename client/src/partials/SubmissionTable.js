import React, { Component } from 'react';
import $ from 'jquery';

class SubmissionTable extends Component {

    componentDidMount() {
        this.props.contract.methods.getNumDocs().call({ from: this.props.accounts[0]} )
            .then(numDocs => {
                console.log('numDocs: '+numDocs);
                $('#numDocs').html(numDocs);
            });
    }

    submitDocument = event => {
        $('#status').html('Submitting document, please wait...');
        
        setTimeout(async () => {
            let hash = $('#fileHash').text()
            console.log('hash: '+hash);
            const { contract, accounts } = this.props;
            console.log('contract add: '+contract.options.address);
            await contract.methods.newDocument(hash).send({ from: accounts[0] })
                .then(res => {
                    $('#status').html('Document hash submitted')
                })
                .catch(err =>  {
                    console.log(err.message);
                    $('#status').html('Error in submitting document hash')
                })

            contract.methods.getNumDocs().call({from: accounts[0]})
                .then(numDocs => {
                    $("#numDocs").html(numDocs);
                })
        }, 2000)
    }

    verifyDocument = event => {
        $('#status').html('Verifying document, please wait...')
        
        setTimeout(async() => {
            let hash = $('#fileHash').text();
            
            const { contract, accounts } = this.props;

            await contract.methods.documentExists(hash).send({ from: accounts[0]})
                .then(res => {
                    if (res) {
                        $('#status').html('Document Verified');
                    }
                })
                .catch(err => {
                    $('#status').html('Document cannot be verified');
                });
            
            contract.methods.getDocument(hash).call({ from: accounts[0]} )
                .then(result => {
                    let date = this.formatDate(result);
                    $('#docRes').html(date);
                    $('#docOwner').html(result.owner);
                });

        }, 2000)
    }

    formatDate(result) {
        let date = new Date(result.date * 1000);
                    
        // formatting day
        const day = date.getDate().toString();
        const dayf = day.length === 1 ? '0'+day : day;

        // formatting month
        const month = (date.getMonth() + 1).toString();
        const monthf = month.length === 1 ? '0'+month : month;
        
        const yearF = date.getFullYear();

        // get hour/min/seg/mili
        const hour = date.getHours().toString();
        const hourf = hour.length === 1 ? '0'+hour : hour;

        const min = date.getMinutes().toString();
        const minf = min.length === 1 ? '0'+min : min;
        
        const sec = date.getSeconds().toString();
        const secf = sec.length === 1 ? '0'+sec : sec;

        date = `${monthf}/${dayf}/${yearF} - ${hourf}h${minf}min${secf}sec`;
        return date;
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

export default SubmissionTable;