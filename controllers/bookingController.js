const express = require("express");
const moment = require("moment");
const stripe = require("stripe")("sk_test_51OAx74SGDjJ9frH6Sfwl2UD2DcAvRRePslQecYo7lWromhQ96BDHe18o9vYZS7MYZLRk2yWkhFZNskaAIm4ilYVj00loaEBlsO");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");

const bookingController = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.send(bookings);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },

  cancelBooking: async (req, res) => {
    const { bookingid, roomid } = req.body;
    try {
      const bookingitem = await Booking.findOne({ _id: bookingid });

      bookingitem.status = "cancelled";
      await bookingitem.save();
      const room = await Room.findOne({ _id: roomid });
      const bookings = room.currentbookings;
      const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
      room.currentbookings = temp;
      await room.save();

      res.send("Your booking cancelled successfully");
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },

  getBookingByUserId: async (req, res) => {
    const { userid } = req.body;
    try {
      const bookings = await Booking.find({ userid: userid });
      res.send(bookings);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },

  bookRoom: async (req, res) => {
    const { room, userid, fromdate, todate, type, count, altphone, totalamount, totaldays } = req.body;

    try {
        // Find the user based on the userid
        const user = await User.findOne({ _id: userid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new booking with the user's phone number
        const newBooking = new Booking({
            roomid: room._id,
            userid,
            type,
            count,
            phoneno: user.phone, // Use user's phone number
            altphone,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount,
            totaldays,
            name: user.name, // Include name in the booking
            email: user.email, // Include email in the booking
        });

        const booking = await newBooking.save();

        // Update the room with the new booking information
        const roomtemp = await Room.findOne({ _id: room._id });

        roomtemp.currentbookings.push({
            bookingid: booking._id,
            roomtype: booking.type,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid,
            status: booking.status,
        });

        await roomtemp.save();

        res.send('Room Booked Successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
},

deleteBookingById: async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},


  
};

module.exports = bookingController;

// const express = require("express");
// const moment = require("moment");
// const stripe = require("stripe")("sk_test_51OAx74SGDjJ9frH6Sfwl2UD2DcAvRRePslQecYo7lWromhQ96BDHe18o9vYZS7MYZLRk2yWkhFZNskaAIm4ilYVj00loaEBlsO", { apiVersion: 'latest' });
// const { v4: uuidv4 } = require("uuid");
// const router = express.Router();

// const Booking = require("../models/booking");
// const Room = require("../models/room");
// const User = require("../models/user");

// const bookingController = {
//   getAllBookings: async (req, res) => {
//     try {
//       const bookings = await Booking.find();
//       res.send(bookings);
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: error });
//     }
//   },

//   cancelBooking: async (req, res) => {
//     const { bookingid, roomid } = req.body;
//     try {
//       const bookingitem = await Booking.findOne({ _id: bookingid });

//       bookingitem.status = "cancelled";
//       await bookingitem.save();
//       const room = await Room.findOne({ _id: roomid });
//       const bookings = room.currentbookings;
//       const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
//       room.currentbookings = temp;
//       await room.save();

//       res.send("Your booking cancelled successfully");
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: error });
//     }
//   },

//   getBookingByUserId: async (req, res) => {
//     const { userid } = req.body;
//     try {
//       const bookings = await Booking.find({ userid: userid });
//       res.send(bookings);
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: error });
//     }
//   },

//   bookRoom: async (req, res) => {
//     const { room, userid, fromdate, todate, type, count, altphone, totalamount, totaldays, token } = req.body;

//     try {
//       const customer = await stripe.customers.create({
//         email: token.email,
//         source: token.id
//       })
//       const payment = await stripe.charges.create({
//         amount: totalamount * 100, // Convert totalamount to cents
//         customer: customer.id,
//         currency: 'inr',
//         receipt_email: token.email
//       }, {
//         idempotencyKey: uuidv4()
//       });
//       console.log('Total Amount:', totalamount);
// console.log('Customer ID:', customer.id);
// console.log('Token Email:', token.email);

//       res.send('Payment Sucessfull, Your Room is booked')
//     }
//     catch(error) {
//       console.log(error);
//       return res.status(400).json({ message: error });
//     }
 
//     if(payment) {
//       try {
//         // Find the user based on the userid
//         const user = await User.findOne({ _id: userid });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Create a new booking with the user's phone number
//         const newBooking = new Booking({
//             roomid: room._id,
//             userid,
//             type,
//             count,
//             phoneno: user.phone, // Use user's phone number
//             altphone,
//             fromdate: moment(fromdate).format("DD-MM-YYYY"),
//             todate: moment(todate).format("DD-MM-YYYY"),
//             totalamount,
//             totaldays,
//             name: user.name, // Include name in the booking
//             email: user.email, // Include email in the booking
//         });

//         const booking = await newBooking.save();

//         // Update the room with the new booking information
//         const roomtemp = await Room.findOne({ _id: room._id });

//         roomtemp.currentbookings.push({
//             bookingid: booking._id,
//             roomtype: booking.type,
//             fromdate: moment(fromdate).format("DD-MM-YYYY"),
//             todate: moment(todate).format("DD-MM-YYYY"),
//             userid,
//             status: booking.status,
//         });

//         await roomtemp.save();

//         res.send('Room Booked Successfully');
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
//   }
    
// },

// deleteBookingById: async (req, res) => {
//   try {
//     await Booking.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Booking deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// },


  
// };

// module.exports = bookingController;
