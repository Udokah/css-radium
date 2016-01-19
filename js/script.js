"use strict";

var button = document.querySelector("#button");
var input = document.querySelector("#input");
var output = document.querySelector("#output");

var selectedLanguage = function() {
  var options = document.getElementsByName("language-option");
  if (options) {
    for (var i = 0; i < options.length; i++) {
      if (options[i].checked) {
        return options[i].value;
      }
    }
  }
};

/**
 * Capitalize a string
 */
var capitalize = function(word) {
  var str = word.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to camel case
 */
var camelize = function(word) {
  var both = word.split("-");
  if (both.length == 2) {
    return both[0].toLowerCase() + capitalize(both[1]);
  } else if (both.length == 3) {
    return capitalize(both[0]) + capitalize(both[1]) + capitalize(both[2]);
  } else {
    return word;
  }
};

/**
 * Generate coffeScript/javascript code
 */
var generateCode = function(cssCode) {
  var resultCode = "";

  /* remove illegal characters { } ' and multiple white spaces */
  var cleanStr = cssCode.replace(/[\{\}\']+/g, "").replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim();

  /* break code into statements */
  var lines = cleanStr.split(";");

  if (lines.length > 1) {
    /**
     * Loop through each line
     * and transform both value and property
     */
    lines.forEach(function(line) {
      if (line.length > 2) {

        /* remove white spaces from both ends */
        var cleanLine = line.trim();

        /* Split statement to property and value */
        var statement = cleanLine.split(":");
        var property = camelize(statement[0].trim()); // change property to camel case
        var value = statement[1].trim();

        /* re-concatenate staement */
        resultCode += property + ": '" + value + "'";
        if (selectedLanguage() == "javascript") {
          resultCode += ","; // add trailing comma if selected language is JavaScript
        }

        resultCode += "\n"; // add new line
      }
    }); // End of loop
  }

  return resultCode;
};

/**
 * Events listerners here
 */
button.addEventListener("click", function() {
  output.value = generateCode(input.value);
});
