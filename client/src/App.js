import React, { Component } from "react";
import DocVerify from "./contracts/DocVerify.json";
import getWeb3 from "./utils/getWeb3";
import "./css/index.css";

import Header from './partials/Header';
import InfoTable from './partials/InfoTable';
import Form from './partials/Form';
import SubmissionTable from './partials/SubmissionTable';
import ResultTable from './partials/ResultTable';

import WrongNetwork from './not-found/WrongNetwork';
import Spinner from './common/Spinner';

class App extends Component {
  state = { 
    numDocuments: 0, 
    web3: null, 
    accounts: null, 
    contract: null, 
    balance: null,
    correctNetwork: true 
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DocVerify.networks[networkId];
      const instance = new web3.eth.Contract(
        DocVerify.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      if (networkId === 4447) {
        this.setState({ web3, accounts, contract: instance }, this.getUserBalance);
      } else {
        this.setState({ correctNetwork: false });
      }
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getUserBalance = async () => {
    let balance = await this.state.web3.eth.getBalance(this.state.web3.eth.defaultAccount);
    this.setState({ balance: this.state.web3.utils.fromWei(balance, 'ether') })
  };

  render() {

    if (!this.state.correctNetwork) {
      return <WrongNetwork/>;
    }

    if (!this.state.web3) {
      return <Spinner/>;
    }

    return (
      <div className="App">
        <Header cbAddress={this.state.web3.eth.defaultAccount}/>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <InfoTable 
                sm_address={this.state.contract.options.address}
                cb_balance={this.state.balance}
              />
              <Form
                web3={this.state.web3}
              />
              <SubmissionTable 
                contract={this.state.contract} 
                accounts={this.state.accounts} 
                web3={this.state.web3}
              />
              <ResultTable/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
