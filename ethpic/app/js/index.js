/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Blockchain example
// ===========================

$(document).ready(function() {
  $("button.userSet").click(function() {
    var topic_value = $(".inputTopic").val();
    addToLog("#blockchain", "value(" + topic_value + ")");

    var input_file = $(".userUploadFile");
    EmbarkJS.Storage.uploadFile(input_file).then(function(input_file_hash) {
      console.log("topic_value", topic_value);
      console.log("input_file_hash", input_file_hash);
      $("span.userFileIpfsHash").html(input_file_hash);
      $("input.fileIpfsHash").val(input_file_hash);
      EthPic.get_topic(topic_value).then(function(topic_hash_db) {
        if (topic_hash_db == "Not there") {
          topicfile = '"' + input_file_hash + '"'; // this should be a list
          EmbarkJS.Storage.saveText(topicfile).then(function(topicfile_hash) {
            console.log("topicfile_hash", topicfile_hash);

          EthPic.get_user().then(function(user_hash_db) {
            if (user_hash_db == "Not there") {
              userfile = '"' + input_file_hash + '"';
              EmbarkJS.Storage.saveText(userfile).then(function(userfile_hash) {
                console.log("userfile_hash", userfile_hash);
                EthPic.add_data(userfile_hash, topic_value, topicfile_hash, {gas: 1000000});
              });
            }
            else {
              
              EmbarkJS.Storage.get(user_hash_db).then(function(userfile_hash_db) {
                console.log("user content", userfile_hash_db)
                userfile = userfile_hash_db + ", " + '"' + input_file_hash + '"';
                EmbarkJS.Storage.saveText(userfile).then(function(userfile_hash) {
                  console.log("userfile_hash", userfile_hash);
                  EthPic.add_data(userfile_hash, topic_value, topicfile_hash, {gas: 1000000});
                });
              });
            }
          });
            
          });
          
        }
        else {
          // get file from ipfs
          EmbarkJS.Storage.get(topic_hash_db).then(function(topicfile_content) {
            console.log("topic content", topic_value, topicfile_content)
            topicfile = topicfile_content + ", " + '"' + input_file_hash + '"'; // this should be a list
            EmbarkJS.Storage.saveText(topicfile).then(function(topicfile_hash) {
              console.log("topicfile_hash", topicfile_hash);
            

            EthPic.get_user().then(function(user_hash_db) {
              if (user_hash_db == "Not there") {
                userfile = '"' + input_file_hash + '"';
                EmbarkJS.Storage.saveText(userfile).then(function(userfile_hash) {
                  console.log("user_hash", userfile_hash);
                  EthPic.add_data(userfile_hash, topic_value, topicfile_hash, {gas: 1000000});
                });
              }
              else {
                // get file from ipfs
                EmbarkJS.Storage.get(user_hash_db).then(function(userfile_content) {
                  console.log("user content", userfile_content)
                  userfile = userfile_content + ", " + '"' + input_file_hash+ '"';
                  EmbarkJS.Storage.saveText(userfile).then(function(userfile_hash) {
                    console.log("user_hash", userfile_hash);
                    EthPic.add_data(userfile_hash, topic_value, topicfile_hash, {gas: 1000000});
                  });
                });
              }
            });
              // EthPic.add_data(hash, topic_value, hash_topic, {gas: 1000000});
            });
            
          });
        }
      });

    });

    
    addToLog("#storage", "EmbarkJS.Storage.uploadFile($('input[type=file]')).then(function(hash) { })");
  });

});

$(document).ready(function() {

  $("#blockchain button.set").click(function() {
    var value = parseInt($("#blockchain input.text").val(), 10);
    EthPic.add_data(value, value, value, value);
    addToLog("#blockchain", "SimpleStorage.set(" + value + ")");
  });

  $("#blockchain button.get").click(function() {
    EthPic.addr().then(function(value) {
      $("#blockchain .value").html(value);
    });
    addToLog("#blockchain", "SimpleStorage.get()");
  });

  EmbarkJS.Storage.setProvider('ipfs',{server: 'localhost', port: '5001'});

  $("#storage button.setIpfsText").click(function() {
    var value = $("#storage input.ipfsText").val();
    EmbarkJS.Storage.saveText(value).then(function(hash) {
      $("span.textHash").html(hash);
      $("input.textHash").val(hash);
    });
    addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  });

  $("#storage button.loadIpfsHash").click(function() {
    var value = $("#storage input.textHash").val();
    EmbarkJS.Storage.get(value).then(function(content) {
      $("span.ipfsText").html(content);
    });
    addToLog("#storage", "EmbarkJS.Storage.get('" + value + "').then(function(content) { })");
  });

  $("#storage button.uploadFile").click(function() {
    var input = $("#storage input[type=file]");
    console.log(input);
    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
      $("span.fileIpfsHash").html(hash);
      $("input.fileIpfsHash").val(hash);
    });
    addToLog("#storage", "EmbarkJS.Storage.uploadFile($('input[type=file]')).then(function(hash) { })");
  });

  $("#storage button.loadIpfsFile").click(function() {
    var hash = $("#storage input.fileIpfsHash").val();
    var url = EmbarkJS.Storage.getUrl(hash);
    var link = '<a href="' + url + '" target="_blank">' + url + '</a>';
    $("span.ipfsFileUrl").html(link);
    $(".ipfsImage").attr('src', url);
    addToLog("#storage", "EmbarkJS.Storage.getUrl('" + hash + "')");
  });

});

