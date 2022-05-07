const
	express = require('express'),
	router = express.Router(),
	swaggerUi = require('swagger-ui-express'),
	swaggerDocSpec = require('../../utils/swagger'),
	parkingRoute = require('./parking'),
	parkingLotRoute = require('./parkingLot');

router.use('/doc/e5y9xM16ZG',swaggerUi.serve, swaggerUi.setup(swaggerDocSpec, {explorer: true}));
router.use('/parking-lot', parkingLotRoute);
router.use('/parking', parkingRoute);

module.exports = router;