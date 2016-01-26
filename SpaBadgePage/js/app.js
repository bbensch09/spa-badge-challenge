$.ready(function(){
  console.log("JS ACTIVATED")

});


$.ajax({
  url: 'http://localhost:3000/persons',
  type: "GET"
}).then(function(response){
  console.log("success");
  $.hide('#persons-show');
});
