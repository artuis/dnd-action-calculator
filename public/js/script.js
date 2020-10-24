

//references
var emailCreate = $("#email-account");
var passCreate = $("#pass-account");
var accountCreate = $("#account-create");
const loginForm = $("#login-form");
const loginEmail = $("#login-email");
const loginPass = $("#login-pass")
const characterModal = $(".new-character-modal");
let charModalFunction = "";

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

//handle character modal button
$("#save-character").on("click", () => {
  if(charModalFunction === "view") return;
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
    hp_temp: 0,
    hp_max: parseInt($("#hp").val().trim()),
    armor_class: parseInt($("#ac").val().trim()),
    shield: $("#shield").is(':checked'),
    RaceId: $("#race").find(":selected").attr("value"),
    ClassId: $("#class").find(":selected").attr("value"),
    WeaponId: $("#weapon").find(":selected").attr("value"),
  }
  console.log(newChar)
  if(charModalFunction === "add") ajaxPost("api/characters", newChar).then(res => location.reload());
  if(charModalFunction === "update") {
    console.log(characterModal.attr("data-id"));
    newChar.id = characterModal.attr("data-id");
    ajaxPut("api/characters", newChar).then(res => location.reload());
  }
})

//create campaign
$("#save-campaign").click(() => {
  console.log("save campaign");
  var newCampaign = {
    name: $("#campaign-name").val()
  }
  ajaxPost("api/campaigns", newCampaign).then(res => location.reload())
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


$(".delete").click(function (e) {
  //console.log("delete " + $(this).attr("id") + " at " + $(this).closest("table").attr("id"));
  ajaxDelete("api/characters/" + $(this).closest("tr").attr("data-id")).then($(this).closest("tr").remove());
})

$(".new-char-btn").on("click", () => {
  charModalFunction="add"
  setCharModalState();
})

$(".view").click(function(e) {
  charModalFunction = "view";
  setCharModalState();
  const id = $(this).closest("tr").attr("data-id");
  characterModal.attr("data-id", id);
  ajaxGet("/api/characters/" + id).then(char => {
    $("#character-name").val(char.name),
    $("#player-name").val(char.player_name),
    $("#exp").val(char.experience),
    $("#level").val(char.level),
    $("#str").val(char.strength),
    $("#dex").val(char.dexterity),
    $("#con").val(char.constitution),
    $("#int").val(char.intelligence),
    $("#wis").val(char.wisdom),
    $("#cha").val(char.charisma),
    $("#wis").val(char.wisdom),
    $("#init").val(char.initiative),
    $("#hp").val(char.hp_current),
    $("#ac").val(char.armor_class),
    $("#shield").prop("checked",char.shield),
    $(`#race option[value=${char.RaceId}]`).prop("selected",true),
    $(`#class option[value=${char.ClassId}]`).prop("selected",true),
    $(`#weapon option[value=${char.WeaponId}]`).prop("selected",true)
  });
  
})

$(".update").click(function(e) {
  charModalFunction = "update";
  setCharModalState();
  const id = $(this).closest("tr").attr("data-id");
  characterModal.attr("data-id", id);
  ajaxGet("/api/characters/" + id).then(char => {
    $("#character-name").val(char.name),
    $("#player-name").val(char.player_name),
    $("#exp").val(char.experience),
    $("#level").val(char.level),
    $("#str").val(char.strength),
    $("#dex").val(char.dexterity),
    $("#con").val(char.constitution),
    $("#int").val(char.intelligence),
    $("#wis").val(char.wisdom),
    $("#cha").val(char.charisma),
    $("#wis").val(char.wisdom),
    $("#init").val(char.initiative),
    $("#hp").val(char.hp_current),
    $("#ac").val(char.armor_class),
    $("#shield").prop("checked",char.shield),
    $(`#race option[value=${char.RaceId}]`).prop("selected",true),
    $(`#class option[value=${char.ClassId}]`).prop("selected",true),
    $(`#weapon option[value=${char.WeaponId}]`).prop("selected",true)
  });
  
})

const setCharModalState = () => {
  if(charModalFunction === "add" || charModalFunction === "update") {
    //enable and clear all fields
    $(".new-character-modal input").val("");
    $(".new-character-modal select").prop("disabled",false);
    $(".new-character-modal select :nth-child(1)").prop("selected",true);
    $(".new-character-modal input").prop("disabled",false);
    $("#save-character").text("Save");
  }
  if(charModalFunction === "view") {
    //disable all fields
    $(".new-character-modal input").val("");
    $(".new-character-modal select").prop("disabled",true);
    $(".new-character-modal input").prop("disabled",true);
    $("#save-character").text("Close");
  }
}

$("#login-btn").click(() => {
  location.href = "/login";
})

$("#create-btn").click(() => {
  location.href = "/account";
})












