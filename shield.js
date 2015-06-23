// This example shows how to use node-pixel using Johnny Five as the
// hook for the board.

var five = require("johnny-five");
var pixel = require("node-pixel");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

var fps = 100; // how many frames per second do you want to try?

board.on("ready", function() {

	console.log("Board ready, lets add light");

	strip = new pixel.Strip({
		data: 6,
		length: 40,
		board: this,
		controller: "FIRMATA",
//        controller: "I2CBACKPACK"
	});

	strip.on("ready", function() {

		console.log("Strip ready, let's go");
		rainbow(fps);

	});

	this.repl.inject({
		strip:strip
	});

	function rainbow(delay){
		var showColor;
		console.log('rainbow');

		for(var j = 0; j < 256; j++) {
			for(var i = 0; i < strip.stripLength(); i++) {

				showColor = Wheel( ( i+j ) & 255 );
				strip.pixel( i ).color( showColor );
				// Illustrates the problem
				if (strip.pixel( 0 ).color().color === 'red'){
					console.log(showColor);
					console.log(strip.pixel( 0 ).color());
				}
			}
			strip.show();
		}
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
