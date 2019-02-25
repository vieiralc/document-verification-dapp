import React, { Component } from 'react'

class InfoTable extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">

            <table id="my_table" className="table table-striped">

                <tbody>
                    <tr>
                        <td> Contract Address </td>
                        <td> { this.props.sm_address } </td>
                    </tr>
                    <tr>
                        <td> Acct Balance </td>
                        <td> { this.props.cb_balance } <strong> ETH </strong> </td>
                    </tr>
                </tbody>

            </table>

        </div>
      </div>
    )
  }
}

export default InfoTable;