const
	ParkingLot = require('./../models/parkingLot'),
	catchAsync = require('../../utils/catchAsync');

exports.list = catchAsync(async (request, response, next) => {

	const
		filter = {},
		{parking_lot_id} = request.query;

	if(parking_lot_id) {
		filter._id = parking_lot_id;
	}

	const parkingLots = await ParkingLot.find(filter)
		.populate('vehicles')
		.populate({
			path:'vehicles',
			select:'type capacity charge_per_two_hours',
		})
		.select('title address contact_number vehicles')
		.sort({createdAt: -1})
		.lean();

	response.status(200).json({
		status: 'success',
		data: parkingLots,
	});
});