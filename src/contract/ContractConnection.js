import { Component } from 'react'
import counterABI from './counterABI.json'
import Web3 from 'web3'

const ContractAddress = '0x8cdaf0cd259887258bc13a92c0a6da92698644c0'

export default class ContractConnection extends Component{

    constructor() {
        super()
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
        this.web3.eth.defaultAccount = this.web3.eth.accounts[0]
    }

    getContract() {
        if (this.web3 && this.web3.isConnected()) 
            return this.web3.eth.contract(counterABI).at(ContractAddress)
        return null
    }

    getDefaultAccount() {
        return this.web3.eth.defaultAccount
    }

    getDefaultAccountBalance() {
        return this.web3.fromWei(this.web3.eth.getBalance(this.web3.eth.defaultAccount), "ether").toFixed(5)
    }

    getWeb3() {
        return this.web3
    }

}