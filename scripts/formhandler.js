(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    } else if (this.$formElement[0].id == "coffeeForm") {
      // Coffee order Form

      FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log("Setting submit handler for coffee form");
        this.$formElement.on("submit", function(event) {
          event.preventDefault();

          var data = {};
          $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
            console.log(item.name + " is " + item.value);
          });
          console.log(data);

          // Handle acheivement here

          if (data.size == "grande" && data.strength > 68 && data.flavor != "") {
            var modalText;
            var modalBody;
            if (data.flavor == "caramel") {
              modalText = "Dulce de Leche Unlocked";
              modalBody = "WOW! Wanna put some dulce the leche in that coffee?";
            } else if (data.flavor == "almond") {
              modalText = "Almond Milk Unlocked";
              modalBody = "WOW! Shall we change the order to Almond milk too?";
            } else if (data.flavor == "mocha") {
              modalText = "Extra Beans Unlocked";
              modalBody = "WOW! Why not rather go with some Kenyan beans?";
            }
            $("#achievementsModal .modal-title").text(modalText);
            $("#achievementsModal .modal-body").text(modalBody);
            $("#achievementsModal").modal("show");
          }

          fn(data);
          this.reset();
          sliderOutput.textContent = 30;
          sliderOutput.style.color = "green";
          sliderLabel.style.color = "green";
          this.elements[0].focus();
        });
      };

      FormHandler.prototype.addInputHandler = function(fn) {
        console.log("Setting input handler for form to email");
        this.$formElement.on("input", "[name='emailAddress']", function(event) {
          var emailAddress = event.target.value;
          var message = "";
          if (fn(emailAddress)) {
            event.target.setCustomValidity("");
          } else {
            message = emailAddress + " is not an authorized email address!";
            event.target.setCustomValidity(message);
          }
        });
      };

      var slider = document.getElementById("strengthLevel");
      var sliderOutput = document.getElementById("strengthOutput");
      var sliderLabel = document.getElementById("strengthLabel");

      sliderOutput.style.color = "green";
      sliderLabel.style.color = "green";

      slider.addEventListener("input", function() {
        var color;
        sliderOutput.textContent = slider.value;
        if (slider.value < 34) {
          color = "green";
        } else if (slider.value < 68) {
          color = "#aaaa00";
        } else {
          color = "red";
        }
        sliderOutput.style.color = color;
        sliderLabel.style.color = color;
      });
    } else if (this.$formElement[0].id == "paymentForm") {
      FormHandler.prototype.addPaymentSubmitHandler = function() {
        console.log("Setting submit handler for payment form");
        this.$formElement.on("submit", function(event) {
          event.preventDefault();

          var data = {};
          $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
            console.log(item.name + " is " + item.value);
          });
          console.log(data);
          var modalBody = "Thank you for your payment, " + data.title + " " + data.username;
          $("#ex1 p").text(modalBody);
          $("#ex1").modal("show");
        });
      };
    }
  }

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
