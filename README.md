### Document Verification Dapp

![alt text](https://github.com/vieiralc/document-verification-dapp/blob/master/img/Capture.PNG)

Requirements:
<ul>
  <li> NPM </li>
  <li> Ganache </li>
</ul>

#### To install:

<p> Download Ganache at https://truffleframework.com/ganache </br> 

    You can use truffle framework to deploy the smart contract
    but I used the remix solidity IDE to deploy the sc to a personal ethereum blockchain.
    On http://remix.ethereum.org go to run and in environment select Web3 Provider,
    use the localhost provided by ganache HTTP://127.0.0.1:7545. Copy the contract address and past 
    it on /scr/contract/ContractConnection.js
</p>

###### Then run:

```
 $ npm install
```

<p> The react app will open on http://localhost:3000 </p>
