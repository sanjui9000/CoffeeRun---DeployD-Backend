(function(window) {
  "use strict";
  var FORM_SELECTOR_2 = "[data-payment-form='form']";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR_2);

  formHandler.addPaymentSubmitHandler();
  console.log(formHandler);
})(window);
