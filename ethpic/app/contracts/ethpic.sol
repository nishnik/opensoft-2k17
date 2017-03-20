pragma solidity ^0.4.7;
contract EthPic {
  mapping(address => string) userData;
  mapping(string => string) topicData;

  function EthPic(string initialValue) {
  }

  function add_data(string user_ipfs_hash, string topic, string topic_ipfs_hash) {    
    userData[msg.sender] = user_ipfs_hash;
    topicData[topic] = topic_ipfs_hash;
  }

  function get_user() constant returns (string retVal) {
    if (bytes(userData[msg.sender]).length != 0)
      return userData[msg.sender];
    return "Not there";
  }

  function get_topic(string topic) constant returns (string retVal) {
    if (bytes(topicData[topic]).length != 0)
      return topicData[topic];
    return "Not there";
  }


  function addr() constant returns (address retVal) {
    return msg.sender;
  }
}
