pragma solidity ^0.4.24;

contract DocVerify {
    
    struct Document {
        address owner;
        uint blockTimestamp;
    }
    
    address public creator;
    uint public numDocuments;
    mapping(bytes32 => Document) public documentHashMap;
    
    constructor() public {
        creator = msg.sender;
        numDocuments = 0;
    }
    
    function newDocument(bytes32 hash) public returns (bool success) {
        if (documentExists(hash)) {
            success = false;
        }else {
            Document storage d = documentHashMap[hash];
            d.owner = msg.sender;
            d.blockTimestamp = block.timestamp;
            numDocuments++;
            success = true;
        }
        return success;
    }
    
    function documentExists(bytes32 hash) public view returns (bool exists) {
        if (documentHashMap[hash].blockTimestamp > 0) {
            exists = true;
        } else {
            exists = false;
        }
        return exists;
    }
    
    function getDocument(bytes32 hash) public view returns (uint blockTimestamp, address owner) {
        blockTimestamp = documentHashMap[hash].blockTimestamp;
        owner = documentHashMap[hash].owner;
    }
    
    function destroy() public {
        if(msg.sender == creator) {
            selfdestruct(creator);
        }
    }
    
}