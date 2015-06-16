var five = require("johnny-five");
var Barcli = require("barcli");

var red = new Barcli({
  label: "Red",
  range: [0, 100],
  color: "red"
});

var green = new Barcli({
  label: "Green",
  range: [0, 100],
  color: "green"
});

var blue = new Barcli({
  label: "Blue",
  range: [0, 100],
  color: "blue"
});

var board = new five.Board().on("ready", function(){

	//figure out how to get the info out of the sensor
	red.update(25);
	green.update(50);
	blue.update(40);

});
