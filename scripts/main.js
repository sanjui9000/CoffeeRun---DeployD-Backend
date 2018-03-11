(function(window) {
  "use strict";
  var $ = window.jQuery;
  var FORM_SELECTOR = "[data-coffee-order='form']";
  var CHECKLIST_SELECTOR = "[data-coffee-order='checklist']";
  var SERVER_URL = "http://localhost:2403/coffeeorders";
  var App = window.App;
  var Truck = App.Truck;
  // var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck("Serenity", remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  console.log(formHandler);

  // Handle reset to change strength element span and label back to defaults
  $("#resetButton").click(function() {
    var sliderOutput = document.getElementById("strengthOutput");
    var sliderLabel = document.getElementById("strengthLabel");
    sliderOutput.textContent = 30;
    sliderOutput.style.color = "green";
    sliderLabel.style.color = "green";
  });

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);
