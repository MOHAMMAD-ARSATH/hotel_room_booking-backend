const Room = require("../models/room");

const roomController = {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.find({});
      res.send(rooms);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  getRoomById: async (req, res) => {
    try {
      const roomid = req.body.roomid;
      const room = await Room.findOne({ _id: roomid });
      res.send(room);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  addRoom: async (req, res) => {
    try {
      const newRoom = req.body;
      console.log(req.body);
      const room = new Room();
      room.maxcount = newRoom.maxcount;
      room.rentperday = newRoom.rentperday;
      room.type = newRoom.type;
      room.description = newRoom.description;
      room.facilities = newRoom.facilities || [];
      room.currentbookings = [];

      if (newRoom.imageurl1 && newRoom.imageurl1.length > 0) {
        room.imageurls.push(newRoom.imageurl1);
      }
      if (newRoom.imageurl2 && newRoom.imageurl2.length > 0) {
        room.imageurls.push(newRoom.imageurl2);
      }
      if (newRoom.imageurl3 && newRoom.imageurl3.length > 0) {
        room.imageurls.push(newRoom.imageurl3);
      }

      const result = await room.save();
      res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },

  editRoom: async (req, res) => {
    try {
      const roomid = req.body.roomid;
      const updatedRoom = req.body.updatedRoom;
      const room = await Room.findOneAndUpdate(
        { _id: roomid },
        { $set: updatedRoom },
        { new: true }
      );
      res.send(room);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const roomid = req.body.roomid;
      const room = await Room.findOneAndDelete({ _id: roomid });
      res.send(room);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },
};

module.exports = roomController;
