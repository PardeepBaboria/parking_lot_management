const 
	mongoose = require('mongoose'),
	enums = require('../asserts/enums');

const parkingLotVehicle = new mongoose.Schema({

	type: {
		type: String,
		enum: enums.parking_lot.vehicle.type,
		required: [true, 'Parking Lot vehilce must have a Type'],
	},

	parking_lot: {
		type: mongoose.Schema.ObjectId,
		ref: 'parking_lot',
		required: [true, 'Must to specify Vehicle Parking Lot'],
	},

	capacity: {
		type: Number,
	},

	charge_per_two_hours: {
		type: Number,
	},

	active: {
		type: Boolean,
		default: true,
		select: false
	},
},
{timestamps: true});

parkingLotVehicle.pre(/^find/, function(next) {

	this.find({active: {$ne: false}});

	next();
});

module.exports = mongoose.model('parking_lot_vehicle', parkingLotVehicle);