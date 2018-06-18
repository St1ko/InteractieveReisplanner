var five = require("johnny-five");
var board = new five.Board();

const ns = require ('ns-api') ({
  username: 'w.vangogh@student.fontys.nl',
  password: 'tsONFg3KBtMdzgzXMtwhyvw1wg1vAkoZQitwiMfCcinX_GPDE5439Q'
});

const params = {
  fromStation: 'Eindhoven',
  toStation: 'Tilburg'
};

board.on("ready", function() {
	var i = 0;
  var led = new five.Led(13);

	var buttons = new five.Buttons({
		pins: [2],
	});

	buttons.on('down', function(button) {
		console.log('Pressed: ', button.pin);
		i++;
		console.log(i);
		if (i % 2 == 0) {
			led.off();
		} else {
			led.on();
		}
	});
});
