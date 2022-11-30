const express = require('express');
const router = express.Router();
const controller = require("../controllers/bookings");

router.get('/', controller.getBookings);
router.get('/:id', controller.getBooking);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
