

//references
var emailCreate = $("#email-account");
var passCreate = $("#pass-account");
var accountCreate = $("#account-create");
const loginForm = $("#login-form");
const loginEmail = $("#login-email");
const loginPass = $("#login-pass")
const characterModal = $(".new-character-modal");
let charModalFunction = "";

$(document).ready(function() {
  const campaigns = $(".campaign");
  for(let i = 0; i < campaigns.length; i++) {
    let chars = $(campaigns[i]).find("tbody tr");
    let charList = $(campaigns[i]).find(".campaign-char-select");
    for(let j = 0; j < chars.length; j++) {
      let id = $(chars[j]).attr("data-id");
      charList.find(`option[value=${id}]`).remove();
    }
  }
})

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


//signup and login
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
  var newCampaign = {
    name: $("#campaign-name").val()
  }
  ajaxPost("api/campaigns", newCampaign).then(res => location.reload())
})

$(".campaign-add-char-btn").on("click",function() {
  const button = $(this);
  const newName = button.prev().find(":selected").text();
  const newID = button.prev().find(":selected").attr("value");
  const char = {
    id: newID
  }
  
  ajaxPut('api/campaigns/' + $(this).parent().attr("data-id") + "/characters", char).then(function(res){
    
    //add row to table
    const row = $("<tr>").attr("data-id",newID)
    row.append($("<td>").addClass("name").text(newName));
    row.append($("<td>").addClass("text-right").html('<label class="paper-btn char-btn view" for="characterModal">View</label>'));
    row.append($("<td>").addClass("text-right").html('<label class="paper-btn char-btn action">Action</label>'));
    row.append($("<td>").addClass("text-right").html(`<label class="btn-close remove-from-campaign" data-id=${newID}>X</label>`));
    button.closest("thead").next().append(row);
    //remove option from select
    button.prev().find(`option[value=${newID}]`).remove();
  });
})

// $(".remove-from-campaign").on("click", function() {
  
// })

$(".delete-campaign").on("click", function() {
  ajaxDelete(`api/campaigns/${$(this).attr("data-id")}`).then(res=>location.reload());
})

$(".campaign-char-table").on("click", function(e) {
  if($(e.target).hasClass("view")) viewChar(e);
  if($(e.target).hasClass("remove-from-campaign")) removeFromCampaign(e);
})

function removeFromCampaign(e) {
  const button = $(e.target);
  const charName = button.closest("tr").find(".name").text();
  console.log(charName)
  const charId = button.attr("data-id");
  ajaxDelete(`api/campaigns/${button.closest("table").attr("data-id")}/characters/${charId}`).then(res=>{
    button.closest("table").find(".campaign-char-select").append(new Option(charName,charId));
    button.closest("tr").remove();
    //add to select
    
  });
}

$(".delete").click(function (e) {
  ajaxDelete("api/characters/" + $(this).closest("tr").attr("data-id")).then(res=>location.reload());
})

$(".new-char-btn").on("click", () => {
  charModalFunction="add"
  setCharModalState();
})

function viewChar(e) {
  charModalFunction = "view";
  setCharModalState();
  const id = $(e.target).closest("tr").attr("data-id");
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
}

$(".view").click(function(e) {
  viewChar(e);
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
  if(charModalFunction === "add") $("#character-modal-title").text("Create New Character");
  if(charModalFunction === "edit") $("#character-modal-title").text("Edit Character");
  if(charModalFunction === "view") {
    //disable all fields
    $(".new-character-modal input").val("");
    $(".new-character-modal select").prop("disabled",true);
    $(".new-character-modal input").prop("disabled",true);
    $("#save-character").text("Close");
    $("#character-modal-title").text("View Character");
  }
}

$("#login-btn").click(() => {
  location.href = "/login";
})

$("#create-btn").click(() => {
  location.href = "/account";
})

//calculator stuff

$("#attack-stat").on("input", function() {
  const value = $(this).val() != "" ? modifier(parseInt($(this).val())) : 0;
  $("#attack-stat-modifier").val(value)
})

$("#attack-advantage").on("click",function() {
  let other = $("#attack-disadvantage");
  if($(this).prop("checked") && other.prop("checked")) other.prop("checked",false);
})

$("#attack-disadvantage").on("click",function() {
  let other = $("#attack-advantage");
  if($(this).prop("checked") && other.prop("checked")) other.prop("checked",false);
})

$("#use-prof-bonus").on("click",function() {
  if($(this).prop("checked") === false) $("#prof-bonus-field").prop("disabled",true);
  else $("#prof-bonus-field").prop("disabled",false)
})

$("#attack-roll-button").on("click", function() {
  let str = "";
  //advantage
  if($("#attack-advantage").prop("checked")) str+="2d20-L";
  else if($("#attack-disadvantage").prop("checked")) str+="2d20-H"
  else str+="d20"
  //stat modifier
  str+=`+${$("#attack-stat-modifier").val()}`
  //prof
  if($("#use-prof-bonus").prop("checked")) str+=`+${$("#prof-bonus-field").val()}`;
  //other mods
  str+=$("#other-attack-mods-field").val().trim()
  const result = calculate(str).total;
  $("#attack-result").text(result);
})

//damage section
$("#dmg-stat").on("input", function() {
  const value = $(this).val() != "" ? modifier(parseInt($(this).val())) : 0;
  $("#dmg-stat-modifier").val(value)
})

$("#other-weapon-select").on("change", function() {
  const twoHandChkBx = $("#two-handed");
  if($(this).find(":selected").attr("value") === "null") {
    $("#custom-weapon").val("");
    twoHandChkBx.prop("checked", false);
    twoHandChkBx.prop("disabled",true);
    return;
  }
  const data = JSON.parse($(this).find(":selected").attr("data"));
  //set the 2handed
  if(data["1h_dmg"] === null) {
    twoHandChkBx.prop("checked",true);
    twoHandChkBx.prop("disabled",true);
    $("#custom-weapon").val(data["2h_dmg"]);
  }
  else if(data["2h_dmg"] === null) {
    twoHandChkBx.prop("checked",false);
    twoHandChkBx.prop("disabled",true);
    $("#custom-weapon").val(data["1h_dmg"]);
  }
  else {
    twoHandChkBx.prop("disabled",false);
    if(twoHandChkBx.prop("checked")) $("#custom-weapon").val(data["2h_dmg"]);
    else $("#custom-weapon").val(data["1h_dmg"]);
  }
})

$("#two-handed").on("click", function() {
  const data = JSON.parse($("#other-weapon-select").find(":selected").attr("data"));
  if($(this).prop("checked")) $("#custom-weapon").val(data["2h_dmg"]);
  else $("#custom-weapon").val(data["1h_dmg"]);
})

$("#weapon-choice").on("change", function(e) {
  if($(e.target).prop("value") === "equipped-weapon") {
    //set weapon select to equipped weapon
    //disable weapon select
    $("#other-weapon-select").prop("disabled",true);
    //disable damage
    $("#custom-weapon").prop("disabled",true);
  }
  if($(e.target).prop("value") === "another-weapon") {
    //enable weapon select
    $("#other-weapon-select").prop("disabled",false);
    //disable damage
    $("#custom-weapon").prop("disabled",true);
  }
  if($(e.target).prop("value") === "custom-weapon") {
    $("#other-weapon-select :nth-child(1)").prop("selected",true).change();
    //disable weapon select
    $("#other-weapon-select").prop("disabled",true);
    //enable damage
    $("#custom-weapon").prop("disabled",false);
  }
  
})

$("#dmg-roll-button").on("click", function() {
  let str = "";
  //damage
  str += $("#custom-weapon").val().trim();
  //crit
  if($("#crit-hit").prop("checked")) {
    const temp = str.split("d");
    temp[0] = 2*parseInt(temp[0]);
    str = temp.join("d");
  }
  //modifier
  str += `+${$("#dmg-stat-modifier").val().trim()}`
  //other mods
  str += $("#other-dmg-mods-field").val().trim();
  console.log(str);
  $("#dmg-result").text(calculate(str).total);
})

$("#custom-calculate").on("click",function() {
  let expr = $("#custom-expression").val().trim();
  let result = calculate(expr);
  $("#custom-result").text(result.total);
})

// utility functions

// converts ability score to modifier
const modifier = stat => Math.floor((stat - 10) / 2);

const profBonus = level => Math.floor((level+7)/4);











