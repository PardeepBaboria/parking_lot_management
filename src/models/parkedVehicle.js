const mongoose = require('mongoose');

const parkedVehicle = new mongoose.Schema({

	number: {
		type: String,
		trim: true,
		minlength: 9,
		maxlength: 10,
		required: [true, 'Must to specify Vehicle Number'],
	},

	name: {
		type: String,
	},

	customer: {

		name: {
			type: String,
		},

		contact: {
			type: String,
		},
	},

	parking_lot: {
		type: mongoose.Schema.ObjectId,
		ref: 'parking_lot',
		required: [true, 'Must to specify Parking Lot'],
	},

	parking_lot_vehicle: {
		type: mongoose.Schema.ObjectId,
		ref: 'parking_lot_vehicle',
		required: [true, 'Must to specify Parking Lot Vehicle'],
	},

	park_in_at: {
		type: Date,
	},

	park_out_at: {
		type: Date,
	},

	duration_in_hours: {
		type: Number,
	},

	expenses: {
		type: Number,
	},

	active: {
		type: Boolean,
		default: true,
		select: false
	},
},
{timestamps: true});

parkedVehicle.pre(/^find/, function(next) {

	this.find({active: {$ne: false}});

	next();
});

module.exports = mongoose.model('parked_vehicle', parkedVehicle);