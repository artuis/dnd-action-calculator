

//references
var emailCreate = $("#email-account");
var passCreate = $("#pass-account");
var accountCreate = $("#account-create");
const loginForm = $("#login-form");
const loginEmail = $("#login-email");
const loginPass = $("#login-pass")


//ajax functions
const ajaxPost = (url, body) => {
  return $.ajax({
    method: "POST",
    url: url,
    data: body
  })
}

const ajaxGet = (url) => {
  return $.ajax({
    method: "GET",
    url: url,
  })
}

const ajaxPut = (url, body) => {
  return $.ajax({
    method: "PUT",
    url: url,
    data: body
  })
}

const ajaxDelete = (url) => {
  return $.ajax({
    method: "DELETE",
    url: url,
  })
}

//create character
$("#save-character").click(() => {
  const newChar = {
    name: $("#character-name").val().trim(),
    player_name: $("#player-name").val().trim(),
    experience: parseInt($("#exp").val().trim()),
    level: parseInt($("#level").val().trim()),
    strength: parseInt($("#str").val().trim()),
    dexterity: parseInt($("#dex").val().trim()),
    constitution: parseInt($("#con").val().trim()),
    intelligence: parseInt($("#int").val().trim()),
    wisdom: parseInt($("#wis").val().trim()),
    charisma: parseInt($("#cha").val().trim()),
    perception: modifier(parseInt($("#wis").val().trim())),
    initiative: parseInt($("#init").val().trim()),
    hp_current: parseInt($("#hp").val().trim()),
    hp_temp: parseInt($("#hp").val().trim()),
    hp_max: parseInt($("#hp").val().trim()),
    armor_class: parseInt($("#ac").val().trim()),
    shield: false
  }
  console.log(newChar)

  ajaxPost("api/characters", newChar)
})

//create campaign
$("#save-campaign").click(() => {
  console.log("save campaign");
  var newCampaign = {
    name: $("#campaign-name").val()
  }
  ajaxPost("api/campaigns", newCampaign)

  location.reload();
})


// converts ability score to modifier
const modifier = (stat) => {
  Math.floor((stat - 10) / 2)
}

accountCreate.on("submit", function(event) {
  event.preventDefault();
  const newAcct = {
    email: emailCreate.val().trim(),
    password: passCreate.val().trim()
  }
  
  ajaxPost("/api/accounts/signup",newAcct).then(res => location.href = '/campaigns').fail(err => {
    let msg;
    if(err.responseJSON.errors[0].message === "accounts.email must be unique") msg = "An account with that email already exists";
    else if(err.responseJSON.errors[0].message === "Validation isEmail on email failed") msg = "Please enter a valid email address";
    else msg = "Something went wrong"
    $(".error-message").text(msg)
  });
})

loginForm.on("submit", function(event) {
  event.preventDefault();
  const acct = {
    email: loginEmail.val().trim(),
    password: loginPass.val().trim()
  }
  ajaxPost("/api/accounts/login",acct).then(res => location.href = '/campaigns').fail(err => {
    $(".error-message").text("Incorrect email or password")
    loginPass.val("");
  });
})


$(".delete").click(function () {
  console.log("delete " + $(this).attr("id") + " at " + $(this).closest("table").attr("id"));
  $(this).closest("tr").remove();
})

$("#login-btn").click(() => {
  location.href = "/login";
})

$("#create-btn").click(() => {
  location.href = "/account";
})












