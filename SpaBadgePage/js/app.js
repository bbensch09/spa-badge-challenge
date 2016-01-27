$.ready(function(){
  console.log("JS ACTIVATED");
  // getPersons();
  getPersons();

});

// hide #persons-show
// $.ajax({
//   url: 'http://localhost:3000/persons',
//   type: "GET"
// }).then(function(response){
//   console.log("success");
//   $.hide('#persons-show');
// });

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
  var theTemplateScript = $.select("#badges-handlebar").text;
  var theTemplate = Handlebars.compile(theTemplateScript);
  var badges = [];
  for (var i = 0; i < badgeObjects.length; i++){
    var context={
      "text": badgeObjects[i].text,
    };
    badges.push(context);
  };
  var wrapper = {objects: badges};
  var theCompiledHtml = theTemplate(wrapper);
  $.select('.badges-placeholder')[0].innerHTML = theCompiledHtml;
  // voteListener();
  // homeListener();
}
