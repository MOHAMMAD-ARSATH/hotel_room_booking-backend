const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/getallbookings", bookingController.getAllBookings);
router.post("/cancelbooking", bookingController.cancelBooking);
router.post("/getbookingbyuserid", bookingController.getBookingByUserId);
router.post("/bookroom", bookingController.bookRoom);

router.delete('/:id', bookingController.deleteBookingById);

module.exports = router;



