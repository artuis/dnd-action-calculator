$(document).ready(function() {

    var emailCreate = $("#email-account");
    var passCreate = $("#pass-account");
    var accountCreate = $("#account-create");

    const ajaxPost = (url,body) => {
      $.ajax({
        method:"POST",
        url:url,
        data:body
      }).then(apiRes=>{
        return apiRes;
      })
    }

    const ajaxGet = (url) => {
      $.ajax({
        method:"GET",
        url:url,
      }).then(apiRes=>{
        return apiRes;
      })
    }

    const ajaxPut = (url,body) => {
      $.ajax({
        method:"PUT",
        url:url,
        data:body
      }).then(apiRes=>{
        return apiRes;
      })
    }

    const ajaxDelete = (url) => {
      $.ajax({
        method:"DELETE",
        url:url,
      }).then(apiRes=>{
        return apiRes;
      })
    }
  
    $("#save-character").click(() => {
      const newChar = {
        name : $("#character-name").val().trim(),
        player_name : $("#player-name").val().trim(),
        experience : parseInt($("#exp").val().trim()),
        level : parseInt($("#level").val().trim()),
        strength : parseInt($("#str").val().trim()),
        dexterity : parseInt($("#dex").val().trim()),
        constitution : parseInt($("#con").val().trim()),
        intelligence : parseInt($("#int").val().trim()),
        wisdom : parseInt($("#wis").val().trim()),
        charisma : parseInt($("#cha").val().trim()),
        perception : modifier(parseInt($("#wis").val().trim())),
        initiative : parseInt($("#init").val().trim()),
        hp_current : parseInt($("#hp").val().trim()),
        hp_temp : parseInt($("#hp").val().trim()),
        hp_max : parseInt($("#hp").val().trim()),
        armor_class : parseInt($("#ac").val().trim()),
        shield : false
      }
      console.log(newChar)

      ajaxPost("api/characters", newChar)
    })

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

  $(".delete").click(function() {
    console.log("delete " + $(this).attr("id") + " at " +  $(this).closest("table").attr("id"));
    $(this).closest("tr").remove();
  })

  $("#login-btn").click(() => {
    location.href = "/login";
  })

  $("#create-btn").click(() => {
    location.href = "/account";
  })
});
  
    
  
  
  
  
  
  
  
  
  
