const
	express = require('express'),
	parkingLotController = require('../controllers/parkingLot'),
	router = express.Router();

router.get('/list', parkingLotController.list);

module.exports = router;