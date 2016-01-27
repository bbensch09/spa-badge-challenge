$.ready(function(){
  console.log("JS ACTIVATED");
  // getPersons();
  getPersons();

});

// hide #persons-show
$.ajax({
  url: 'http://localhost:3000/persons',
  type: "GET"
}).then(function(response){
  console.log("success");
  $.hide('#persons-show');
});

var getPersons = function() {
  $.ajax({
    url: 'http://localhost:3000/persons',
    type: "GET"
  }).then(function(response){
    console.log("success");
    console.log(response);
    var personObjects = JSON.parse(response);
  // console.log(personObjects);
  testHandlebars(personObjects);
});
}

var testHandlebars = function(personObjects){
  // select script tag
  // var theTemplateScript = $.select("#index-names");
  // select text of script tag
  var theTemplateScript = $.select("#index-names").text;
  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);
  // Define our data object
  var persons = [];
  for (var i = 0; i < personObjects.length; i++){
    var context={
      "name": personObjects[i].name,
      "id": personObjects[i].id
    };
    persons.push(context);
  };
  // Pass our data to the template
  var wrapper = {objects: persons};
  var theCompiledHtml = theTemplate(wrapper);
  debugger
  // var parser = new DOMParser()
  // var theCompiledHtmlDocObj = parser.parseFromString(theCompiledHtml, "text/xml")
  // Add the compiled html to the page
  // $.select('.content-placeholder').html(theCompiledHtml);
  $.select('.content-placeholder')[0].innerHTML = theCompiledHtml;
  // debugger
}
