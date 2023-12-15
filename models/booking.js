const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        // room: { type: String, required: true },
        status: { type: String, required: true, default: "booked" },
        // transactionid: { type: String, required: true },
        roomid: { type: String, required: true },
        userid: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneno: { type: Number, required: true },
        altphone: { type: Number, required: true },
        type: { type: String, required: true },
        count: { type: String, required: true },
        fromdate: { type: String, required: true },
        todate: { type: String, required: true },
        totalamount: {
            type: Number,
            required: true,
        },
        totaldays: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
