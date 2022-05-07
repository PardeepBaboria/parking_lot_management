const
	ParkingLotVehicle = require('./../models/parkingLotVehicle'),
	ParkedVehicle = require('./../models/parkedVehicle'),
	catchAsync = require('../../utils/catchAsync'),
	AppError = require('../../utils/appError');

/**
 * Api to Get Vehicles complete parking history (Lot, Area, Duration, Amount Paid)
 * param: {vehicle_number -in query(optinal)} - To get history of a Vehicle number
 */
exports.list = catchAsync(async (request, response, next) => {

	const filter = {};

	if(request.query.vehicle_number) {
		filter.number = request.query.vehicle_number;
	}

	if(request.query.parked_vehicle_id) {
		filter._id = request.query.parked_vehicle_id;
	}

	const parkedVehicles = await ParkedVehicle
		.find(filter)
		.populate({
			path:'parking_lot',
			select:'title address contact_number',
		})
		.populate({
			path:'parking_lot_vehicle',
			select:'type capacity charge_per_two_hours',
		})
		.select(`
			number
			name
			park_in_at
			park_out_at
			customer
			duration_in_hours
			expenses
			parking_lot
			parking_lot_vehicle
		`);

	response.status(200).json({
		status: 'success',
		data: parkedVehicles,
	});
});


/**
 * Api to Park in a Vehicles at a Parking lot.
 * Fails if parms is invalid, lot is full or Vehicle already parke.
 * param: {parking_lot_vehicle_id -in body(required)} - Id of Parking Lot Vehicle as per Vehicle type
 * param: {vehicle_number -in body(required)} - Vehicle number that need to park
 */
exports.parkin = catchAsync(async (request, response, next) => {

	const {parking_lot_vehicle_id, vehicle_number} = request.body;

	const parkingLotVehicle = await ParkingLotVehicle.findById(parking_lot_vehicle_id);

	if(!parkingLotVehicle) {
		return next(new AppError('Please provide a valid Parking Lot Vehicle Id', 400));
	}

	const isAlreadyParked = await ParkedVehicle.findOne({number: vehicle_number, park_out_at: {$exists: false}});

	if(isAlreadyParked) {
		return next(new AppError('Your Vehicle already Parked', 400));
	}

	const vehicleAlreadyParkedOnThisLot = await ParkedVehicle.find({
		parking_lot_vehicle: parkingLotVehicle.id,
		park_out_at: {$exists: false},
	}).count();

	if(vehicleAlreadyParkedOnThisLot >= parkingLotVehicle.capacity) {
		return next(new AppError('Sorry, Parking Lot for this Vehicle is full', 400));
	}

	const payload = {
		number: request.body.vehicle_number,
		name: request.body.vehicle_name,
		customer: {
			name: request.body.customer?.name,
			contact: request.body.customer?.contact,
		},
		parking_lot: parkingLotVehicle.parking_lot,
		parking_lot_vehicle: parkingLotVehicle.id,
		park_in_at: new Date(),
	};

	const newParking = await ParkedVehicle.create(payload);

	request.query.parked_vehicle_id = newParking.id;

	next();
});

/**
 * Api to Park out a Vehicles from a Parking lot and tell amount due for the duration
 * Fails if parms is invalid, vehicle alrady parked out.
 * param: {vehicle_number -in body(required)} - Vehicle number that need to park out.
 */
exports.parkout = catchAsync(async (request, response, next) => {

	const {vehicle_number} = request.body;

	const parkedVehicle = await ParkedVehicle
		.findOne({number: vehicle_number, park_out_at: {$exists: false}})
		.populate('parking_lot_vehicle');

	if(!parkedVehicle) {
		return next(new AppError('Please provide a valid Vehicle Number', 400));
	}

	parkedVehicle.park_out_at = new Date();
	parkedVehicle.duration_in_hours = (
		Math.abs(parkedVehicle.park_out_at - parkedVehicle.park_in_at) / (60*60*1000)
	).toFixed(2);
	parkedVehicle.expenses = Math.ceil(parkedVehicle.duration_in_hours / 2) * parkedVehicle.parking_lot_vehicle.charge_per_two_hours;

	await parkedVehicle.save();

	request.query.parked_vehicle_id = parkedVehicle.id;

	next();
});