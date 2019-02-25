const assert = require("assert");
const DocVerify = artifacts.require("./DocVerify.sol");

contract("DocVerify", accounts => {

  let docVerify;
  let creator = accounts[0];
  let user = accounts[1];
  let hash = "0x3fd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab";

  before("initializes the contract", async() => {
    docVerify = await DocVerify.new();
  });

  it("...should start with the correct values", async () => {
    let owner = await docVerify.creator();
    let numDocs = await docVerify.numDocuments();
    assert.equal(owner, creator, 'Should be the same address');
    assert.equal(numDocs, 0, 'should start with 0 documents registered');
  });

  it("registers a document", async() => {
    await docVerify.newDocument(hash, {from: user})
      .then(txHash => {
        assert.equal(txHash.receipt.status, true, 'should return true');
      });
  });

});
