// This example shows how to use node-pixel using Johnny Five as the
// hook for the board.

var five = require("johnny-five");
var pixel = require("node-pixel");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

// how many frames per second do you want to try?
//
// 13 is the max fps I've gotten to work with the 40 pixel NeoPixel Arduino
// shield https://www.adafruit.com/product/1430.  Milage may vary.
var fps = 13;

board.on("ready", function() {

	console.log("Board ready, lets add light");

	// setup the node-pixel strip.
	strip = new pixel.Strip({
		data: 6,
		length: 40,
		board: this,
		controller: "FIRMATA",
//        controller: "I2CBACKPACK"
	});

	strip.on("ready", function() {
		console.log("Strip ready, let's go");

		//staticRainbow(fps);
		dynamicRainbow(fps);
	});

	// just in case you need to check some things out.
	// this.repl.inject({
	// 	strip:strip
	// });

	function dynamicRainbow(delay){
		console.log('dynamicRainbow');

		var showColor;
		var cwi = 0; // colour wheel index (current position on colour wheel)
		var foo = setInterval(function(){
			if (++cwi > 255) {
				cwi = 0;
			}

			for(var i = 0; i < strip.stripLength(); i++) {
				showColor = Wheel( ( cwi+i ) & 255 );
				strip.pixel( i ).color( showColor );
			}
			strip.show();
		}, 1000/delay);
	}

	function staticRainbow(delay){
		console.log('staticRainbow');

		var showColor;
		for(var i = 0; i < strip.stripLength(); i++) {
			showColor = Wheel( ( i*256 / strip.stripLength() ) & 255 );
			strip.pixel( i ).color( showColor );
		}
		strip.show();
	}

	// Input a value 0 to 255 to get a color value.
	// The colours are a transition r - g - b - back to r.
	function Wheel( WheelPos ){
		var r,g,b;
		WheelPos = 255 - WheelPos;

		if ( WheelPos < 85 ) {
			r = 255 - WheelPos * 3;
			g = 0;
			b = WheelPos * 3;
		} else if (WheelPos < 170) {
			WheelPos -= 85;
			r = 0;
			g = WheelPos * 3;
			b = 255 - WheelPos * 3;
		} else {
			WheelPos -= 170;
			r = WheelPos * 3;
			g = 255 - WheelPos * 3;
			b = 0;
		}

		return "rgb(" + r +"," + g + "," + b + ")";
	}

});
