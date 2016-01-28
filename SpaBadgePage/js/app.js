$.ready(function(){
  console.log("JS ACTIVATED");
  // getPersons();
  getPersons();

});

// hide #persons-show


var getPersons = function() {
  $.ajax({
    url: 'http://localhost:3000/persons',
    type: "GET"
  }).then(function(response){
    console.log("success");
    var personObjects = JSON.parse(response);
    displayIndexPage(personObjects);
  });
}

var displayIndexPage = function(personObjects){
  $.show('.content-placeholder')
  var theTemplateScript = $.select("#index-names").text;
  var theTemplate = Handlebars.compile(theTemplateScript);
  var persons = [];
  for (var i = 0; i < personObjects.length; i++){
    var context={
      "name": personObjects[i].name,
      "id": personObjects[i].id
    };
    persons.push(context);
  };
  var wrapper = {objects: persons};
  var theCompiledHtml = theTemplate(wrapper);
  $.select('.content-placeholder')[0].innerHTML = theCompiledHtml;
  nameListener();
}

var nameListener = function(){
  $.on('.name-link','click',function(e){
    e.preventDefault();
    var id = parseInt(this.id);
    var clickedName = this.text;
    $.select('.name-placeholder')[0].innerHTML = clickedName;
    getBadges(id);
  })
}

var getBadges = function(id){
  $.ajax({
    url: "http://localhost:3000/persons/"+id,
    type: "GET"
  }).then(function(response){
    console.log("getBadges success");
    var badgeObjects = JSON.parse(response);
      displayPersonShowPage(badgeObjects);
  });
}

var displayPersonShowPage = function(badgeObjects){
  $.show('.person-show-container');
  var theTemplateScript = $.select("#badges-handlebar").text;
  var theTemplate = Handlebars.compile(theTemplateScript);
  var badges = [];
  for (var i = 0; i < badgeObjects.length; i++){
    var context={
      "text": badgeObjects[i].text,
      "voteTotal": badgeObjects[i].vote_total,
      "badge_id": badgeObjects[i].id,
      "person_id": badgeObjects[i].person_id
    };

    badges.push(context);
  };
  var wrapper = {objects: badges};
  var theCompiledHtml = theTemplate(wrapper);
  $.hide('.content-placeholder');
  $.show('.name-placeholder');
  $.select('.badges-placeholder')[0].innerHTML = theCompiledHtml;
  voteButtonListener();
  homeListener();
  badgeListener();
  $.addClass('.new-badge-form',badgeObjects[0].person_id);

}

var homeListener = function(){
  $.on('.nav-link','click',function(e){
    e.preventDefault();
    $.hide('.person-show-container')
    getPersons();
  })
};

var voteButtonListener = function(){
  $.on('button', 'click', function(e){
    console.log("VOTE_LISTENER!");
    e.preventDefault();
    badgeId = parseInt($.closest(this, 'slogan').id);
    createVote(this.classList[0], badgeId);
  });
};

var createVote = function(voteType, badgeId){
  if (getCookie("badge_id"+badgeId) == "true"){
    alert("You can't vote more than once!")
  } else {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/votes/'+badgeId+'/'+voteType

    }).then(function(response){
      console.log("createVote RESPONSE!");
      console.log(response);
      response = JSON.parse(response);
      badgePoints = $.select('.points'+response.id)[0];
      badgePoints.innerHTML = response.vote_total;
      setCookie(("badge_id"+response.id), true)
      getBadges(response.person_id)
    });
  }
};

var getCookie = function(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

var setCookie = function(cname,cvalue){
  document.cookie = cname + "=" + cvalue + "; ";
}


var badgeListener = function(){
  $.on('#submit-new-badge-button','click',function(e){
    e.preventDefault();

    form = document.forms["new-badge-form"];
    content = form.elements["content"].value;
    person_id = form.classList[1];
    console.log("content:"+content, "person_id:"+person_id);
    createBadge(content, person_id)
  })
};

var createBadge = function(content, person_id){
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/badges/"+person_id+"/"+content
  }).then(function(response){
    badgesObjects = JSON.parse(response)
    getBadges(person_id)
  });
}
