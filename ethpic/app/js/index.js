/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Blockchain example
// ===========================
$(document).ready(function() {

  $("#blockchain button.set").click(function() {
    var value = $("#blockchain input.text").val();
    var value2 = $("#blockchain input.text2").val();
    value = value + "|" + value2;
    console.log(value);
    EmbarkJS.Storage.saveText(value).then(function(hash) {
      $("span.textHash").html(hash);
      $("input.textHash").val(hash);
    SimpleStorage.add_user(hash);
    console.log("saved");
    });
    addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
    
  });

  $("#blockchain button.get").click(function() {
    var va = $("#blockchain input.text").val();
    console.log(va);
    SimpleStorage.is_there(va).then(function(value) {
      $("#blockchain .value").html(value.toNumber());
      console.log(value);
    });
    addToLog("#blockchain", "SimpleStorage.get()");
  });

});



$(document).ready(function() {
  // automatic set if config/storage.json has "enabled": true and "provider": "ipfs"
  EmbarkJS.Storage.setProvider('ipfs',{server: '10.145.137.74', port: '5001'});

  // $("#storage .error").hide();
  // EmbarkJS.Storage.ipfsConnection.ping()
  //   .then(function(){
  //       $("#status-storage").addClass('status-online');
  //       $("#storage-controls").show();
  //   })
  //   .catch(function(err) {
  //     if(err){
  //       console.log("IPFS Connection Error => " + err.message);
  //       $("#storage .error").show();
  //       $("#status-storage").addClass('status-offline');
  //       $("#storage-controls").hide();
  //     }
  // });

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
