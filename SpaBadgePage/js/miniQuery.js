var miniQuery = (function(){
  var exports = {}
  exports.select = function (selector){
    switch(selector[0]){
      case "#":
      return document.getElementById(selector.slice(1,selector.length));
      break;
      case ".":
      return document.getElementsByClassName(selector.slice(1,selector.length));
      break;
      default:
      return document.getElementsByTagName(selector);
    };
  }

  exports.hide = function(selector){
    var selectedElements = this.select(selector);
    if (selectedElements.length){
      for (var i =0; i< selectedElements.length; i++){
            selectedElements[i].setAttribute("style","display:none");
      }
    }
      else {
          selectedElements.setAttribute("style","display:none");
      }
  };

  exports.show = function(selector){
    var selectedElements = this.select(selector);
    if (selectedElements.length){
      for (var i =0; i< selectedElements.length; i++){
            selectedElements[i].removeAttribute("style","display:none");
      }
    }
      else {
          selectedElements.removeAttribute("style","display:none");
      }
  };

  exports.addClass = function(element, classToAdd) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add(classToAdd);
      }
    } else {
      return elements.classList.add(classToAdd);
    }
  };

  exports.removeClass = function(element, classToRemove) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(classToRemove);
      }
    } else {
      return elements.classList.remove(classToRemove);
    }
  };


  exports.on = function(selector, actionName, funct){
    var selectedElements = this.select(selector);
    if (selectedElements.length){
      for (var i=0; i<selectedElements.length; i++){
        selectedElements[i].addEventListener(actionName, funct);
      }
    } else {
      selectedElements.addEventListener(actionName, funct);
    }
  };

  exports.trigger = function(selector, actionName){
    var selectedElements = this.select(selector);
    if (selectedElements.length){
      for (var i=0; i<selectedElements.length; i++){
        selectedElements[i].dispatchEvent(new Event(actionName));
      }
    } else {
      selectedElements.dispatchEvent(new Event(actionName));
    }
  };

  exports.closest = function(selectedItem, desiredClass){
    while ((selectedItem = selectedItem.parentElement) && !selectedItem.classList.contains(desiredClass));
    return selectedItem;
  }

  exports.ajax = function(request){
    var promise = new Promise(function(resolve, reject){
      var client = new XMLHttpRequest();
      var uri = request["url"];
      var type = request["type"];
      client.open(type, uri);
      client.send();

      client.onload = function(){
        if( (this.status >= 200) && (this.status <= 300) ){
          resolve(this.response);
        }
        else {
          reject(this.statusText);
        }
      }
      client.onerror = function(){
        reject(this.statusText);
      }
    })
    return promise;
  };

  exports.ready = function(funct){

    switch (document.readyState){
      case "loading":
        document.addEventListener("DOMContentLoaded", function(e){
          funct();
        })
        break;
      default:
        funct();
        break;
    }
  }

  return exports;
})();

var $ = miniQuery;


