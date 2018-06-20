var five = require("johnny-five");
var moment = require("moment");
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
		// console.log('Vertrek: ', moment(data[i].ActueleVertrekTijd).format("HH:mm"));
		// console.log('Aankomst: ', moment(data[i].ActueleAankomstTijd).format("HH:mm"));
		// console.log('Reistijd: ', data[i].ActueleReisTijd);
		// console.log('Spoor Vertrek: ', data[i].ReisDeel[0].ReisStop[0].Spoor);
		// console.log('Spoor Aankomst: ', data[i].ReisDeel[0].ReisStop.pop().Spoor);
		// console.log();
		console.log('Aantal overstappen: ', data[i].AantalOverstappen);

		for (var j=0; j < data[i].ReisDeel.length; j++) {
			printReisdeel(data[i].ReisDeel[j]);
		}
	}

	// console.dir (err || data, {
	// 	depth: null,
	// 	colors: true
	// });
}

function printReisdeel(reisdeel) {
	console.log(reisdeel.ReisStop[0].Naam, moment(reisdeel.ReisStop[0].Tijd).format("HH:mm"), reisdeel.ReisStop[0].Spoor);
	console.log('|');
	console.log('|');

	var endStation = reisdeel.ReisStop.pop();
	console.log(endStation.Naam, moment(endStation.Tijd).format("HH:mm"), endStation.Spoor);
	console.log();
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
		// Get travel advice
		ns.reisadvies (params, myCallback);
	});
});
