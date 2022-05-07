const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({

	title: {
		type: String,
		trim: true,
		required: [true, 'Parking Lot must have a Title'],
	},

	address: {
		type: String,
	},

	contact_number: {
		type: String,
	},

	active: {
		type: Boolean,
		default: true,
		select: false
	},
},
{timestamps: true});

parkingLotSchema.virtual('vehicles', {
	ref: 'parking_lot_vehicle',
	localField: '_id',
	foreignField: 'parking_lot'
});

parkingLotSchema.pre(/^find/, function(next) {

	this.find({active: {$ne: false}});

	next();
});

module.exports = mongoose.model('parking_lot', parkingLotSchema);