const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const dbConfig = require("./config/db");
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const contactRoutes = require('./routes/contactRoute');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000/', 'https://arsath-cjpallazzio.com/']
}
)); 


app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);
app.use('/api/contacts', contactRoutes);

const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node app listening on ${port} port!`));
