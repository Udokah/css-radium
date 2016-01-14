"use strict";

var button = document.getElementById("button");
var input = document.getElementById("input");
var output = document.getElementById("output");

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
 * Generate coffeScript code
 */
var generateCoffeeCode = function(cssCode) {
  var coffeCode = "";

  /* remove illegal characters { } ' and multiple white spaces */
  var cleanStr = cssCode.replace(/[\{\}\']+/g, "").replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim();

  /* break code into statements */
  var lines = cleanStr.split(";");

  /**
   * Loop through each line
   * and transform both value and property
   */
  lines.forEach(function(line) {
    if (line.length > 2) {
      var cleanLine = line.trim();
      var statement = cleanLine.split(":");
      var property = camelize(statement[0].trim());
      var value = statement[1].trim();
      coffeCode += property + ": '" + value + "'" + "\n";
    }
  });
  return coffeCode;
};

/**
 * Listen for click
 */
button.addEventListener("click", function() {
  var fromInput = input.value;
  var code = generateCoffeeCode(fromInput);
  output.value = code;
});
