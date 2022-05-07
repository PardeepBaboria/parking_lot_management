const
	fs = require('fs'),
	database = require('../utils/mongo'),
	ParkingLot = require('../src/models/parkingLot'),
	ParkingLotVehicle = require('../src/models/parkingLotVehicle');

database.connect();

// READ JSON FILE
const parkingLots = JSON.parse(fs.readFileSync(`${__dirname}/parkingLot.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async() => {

	try {

		for(const parkingLot of parkingLots) {

			const newParkingLot = await ParkingLot.create(parkingLot);

			for(const vehicle of parkingLot.vehicles) {
				vehicle.parking_lot = newParkingLot.id;
			}

			await ParkingLotVehicle.create(parkingLot.vehicles);
		}

		console.log('Data successfully loaded!');
	} catch(err) {
		console.log(err);
	}

	process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async() => {

	try {

		await ParkingLotVehicle.deleteMany();
		await ParkingLot.deleteMany();

		console.log('Data successfully deleted!');
	} catch(err) {
		console.log(err);
	}

	process.exit();
};

if(process.argv[2] === '--import') {
	importData();
} else if(process.argv[2] === '--delete') {
	deleteData();
}