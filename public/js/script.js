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
          
          }
      )
    });
  
    $("#save-character").click(() => {
      console.log("hello");
    })

    $(".delete").click(function() {

      console.log("delete " + $(this).attr("id") + " at " +  $(this).closest("table").attr("id"));
      $(this).closest("tr").remove();
    })

});
