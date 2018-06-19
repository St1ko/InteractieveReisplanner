var five = require("johnny-five");
var board = new five.Board();

const ns = require ('ns-api') ({
  username: 'w.vangogh@student.fontys.nl',
  password: 'tsONFg3KBtMdzgzXMtwhyvw1wg1vAkoZQitwiMfCcinX_GPDE5439Q'
});

const params = {
  fromStation: 'Eindhoven',
  toStation: '',
	previousAdvices: 0,
	nextAdvices: 2
};

function myCallback (err, data) {
	console.log('Aantal trajecten: ', data.length);
	console.log();
	//return individual items from data array
	for (var i = 0; i < data.length; i++) {
		console.log('Reisadviezen voor: ', params.fromStation, '-->', params.toStation);
		console.log('Vertrek: ', retrieveTime(data[i].ActueleVertrekTijd));
		console.log('Aankomst: ', retrieveTime(data[i].ActueleAankomstTijd));
		console.log('Reistijd: ', data[i].ActueleReisTijd);
		console.log('Spoor Vertrek: ', data[i].ReisDeel[0].ReisStop[0].Spoor);
		console.log('Spoor Aankomst: ', data[i].ReisDeel[0].ReisStop.pop().Spoor);
		console.log();
	}

	function retrieveTime(input){
		return input.substr(11, 5);
	}

	// returns the whole data array
  // console.dir (err || data, {
  //   depth: null,
  //   colors: true
  // });
}

board.on("ready", function() {
	var buttons = new five.Buttons({
		pins: [2,4,6,8],
	});

	buttons.on('down', function(button) {
		console.log('Pressed button: ', button.pin);
		switch (button.pin) {
			case 2:
				params.toStation = 'Tilburg';
				break;
			case 4:
				params.toStation = 'Breda';
				break;
			case 6:
				params.toStation = 'Rotterdam';
				break;
			case 8:
				params.toStation = 'Den Bosch';
				break;
		}
		// Get travel advise
		ns.reisadvies (params, myCallback);
	});
});
