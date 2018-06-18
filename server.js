var five = require("johnny-five");
var board = new five.Board();

const ns = require ('ns-api') ({
  username: 'w.vangogh@student.fontys.nl',
  password: 'tsONFg3KBtMdzgzXMtwhyvw1wg1vAkoZQitwiMfCcinX_GPDE5439Q'
});

const params = {
  fromStation: 'Eindhoven',
  toStation: 'Boxtel',
	previousAdvices: 0,
	nextAdvices: 2
};

function myCallback (err, data) {
	console.log('Aantal trajecten: ', data.length);

	//return individual items from data array
	for (var i = 0; i < data.length; i++) {
		console.log('Vertrek: ', data[i].ActueleVertrekTijd);
		console.log('Aankomst: ', data[i].ActueleAankomstTijd);
		console.log('Reistijd: ', data[i].ActueleReisTijd);
		console.log('Spoor Vertrek: ', data[i].ReisDeel[0].ReisStop[0].Spoor);
		console.log('Spoor Aankomst: ', data[i].ReisDeel[0].ReisStop.pop().Spoor);
		console.log();
	}

	// returns the whole data array
  // console.dir (err || data, {
  //   depth: null,
  //   colors: true
  // });
}

board.on("ready", function() {
	var buttons = new five.Buttons({
		pins: [2],
	});

	buttons.on('down', function(button) {
		console.log('Pressed: ', button.pin);
		// Get travel advise
		ns.reisadvies (params, myCallback);
	});
});
