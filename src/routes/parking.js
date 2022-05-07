const
	express = require('express'),
	parkingController = require('../controllers/parking'),
	router = express.Router();

router.get('/list', parkingController.list);
router.post('/park-in', parkingController.parkin, parkingController.list);
router.post('/park-out', parkingController.parkout, parkingController.list);

module.exports = router;