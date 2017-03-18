pragma solidity ^0.4.7;
contract SimpleStorage {
  mapping(string => string) storedData;

  function SimpleStorage(string initialValue) {
  }

  function add_user(string x) {    
    storedData[x] = x;
  }

  function is_there(string memory x) constant returns (uint retVal) {
    if (bytes(storedData[x]).length == 0)
      return 0;
    return 1;
  }
}
