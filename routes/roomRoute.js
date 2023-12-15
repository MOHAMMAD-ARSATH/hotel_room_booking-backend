const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/getallrooms", roomController.getAllRooms);
router.post("/getroombyid", roomController.getRoomById);
router.post("/addroom", roomController.addRoom);
router.post("/editroom", roomController.editRoom);
router.post("/deleteroom", roomController.deleteRoom);

module.exports = router;



