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
    $.post(this.serverUrl, data, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  // Get using id
  RemoteDataStore.prototype.get = function(key) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  // Get using email
  RemoteDataStore.prototype.getUsingEmail = function(key) {
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
