$(document).ready(function() {

    var emailCreate = $("#email-account");
    var passCreate = $("#pass-account");
    var accountCreate = $("#account-create");
  
    $(accountCreate).on("submit", function userCreation(event) {
      event.preventDefault();
  
      var newUser = {
        email: emailCreate.val().trim(),
        password: passCreate.val().trim(),
        
      };
      $.post("/account", newUser, data => {
        console.log(data)
          }
      )
    });
  
    $("#save-character").click(() => {
      console.log("hello");
    })
  
    $("#login-btn").click(() => {
      location.href = "/login";
    })
  
    $("#create-btn").click(() => {
      location.href = "/account";
    })
  
  
  
  
  
  
  
  
  
  });
