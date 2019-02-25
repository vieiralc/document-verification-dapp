import React, { Component } from 'react'

class ResultTable extends Component {

    render() {
        return(
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    
                    <table id='my_table' className="table table-striped">
                        <tbody>
                            <tr>
                                <td> Status: </td>
                                <td id='status'> </td>
                            </tr>
                            <tr>
                                <td> Num Documents: </td>
                                <td id='numDocs'> </td>
                            </tr>
                            <tr>
                                <td> Document Registered: </td>
                                <td id='docRes'> </td>
                            </tr>
                            <tr>
                                <td> Document Owner: </td>
                                <td id='docOwner'> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ResultTable;