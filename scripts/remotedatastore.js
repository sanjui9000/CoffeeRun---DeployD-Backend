(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    var data = {};
    data["emailAddress"] = key;
    data["coffee"] = val;
    var test_datastore = new App.RemoteDataStore(this.serverUrl);
    $.get(this.serverUrl, function(serverResponse) {
      for (var i in serverResponse) {
        if (serverResponse[i].emailAddress == key) {
          $.post(this.serverUrl + "/" + serverResponse[i].id, data, function(serverResponse) {
            console.log(serverResponse);
          });
          test_datastore.getAll();
          return;
        } else {
          continue;
        }
      }
      $.post(this.serverUrl, data, function(serverResponse) {
        console.log(serverResponse);
        test_datastore.getAll();
      });
    }.bind(this));

  };

  RemoteDataStore.prototype.getAll = function() {
    $.get(this.serverUrl, function(serverResponse) {
      // console.log(serverResponse);
      var check_list = new App.CheckList("[data-coffee-order='checklist']");
      for (var i = 0; i < serverResponse.length; i++) {
        check_list.addRow(serverResponse[i].coffee);
      }
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    $.get(this.serverUrl + "?emailAddress=" + key, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.get(this.serverUrl + "?emailAddress=" + key, function(response) {
      var data = response;
      $.ajax(this.serverUrl + "/" + data[0].id, {
        type: "DELETE"
      });
    }.bind(this));
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
