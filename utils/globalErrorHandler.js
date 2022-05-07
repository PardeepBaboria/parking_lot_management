module.exports = (error, request, response, next) => {

	if(error.isOperational) {
		return response.status(error.statusCode).json({
			status: error.status,
			message: error.message
		});
	}

	console.error('ERROR', error);

	return response.status(500).json({
		status: 'error',
		message: 'Something went wrong!'
	});
};