const bookingRoutes = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const Booking = require("../models/Schema");
bookingRoutes.use(bodyParser.urlencoded({ extended: false }));
bookingRoutes.use(bodyParser.json());
bookingRoutes.use(cors());


 function verify(req,res,next)
 {

  console.log("Verified");
  next();
 }


  //POST endpoint for creating a movie booking ------------------------------------------------//
  // this route with POST will create a booking document in the MongoDB collection,
  // will return 200 with success message on successful document creation in mongoDB,else will return an error with status 400
bookingRoutes.post("/api/booking",verify, async (req, res,next) => {
    console.log(req.body);
    const booking = new Booking({
      movie: req.body.movie,
      seats: req.body.seats,
      slot: req.body.slot,
    });
    try {
      await booking.save();
      console.log("Your booking is confirmed");
      // return  res.status(200).send({ message: "Your booking has been confirmed" }) ;

      return res.sendFile
      
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({ message: `${err.message}` });
    }




  });
  


  // GET endpoint for getting the last booking-------------------------------------------------//
  //this route with GET will return the latest booking details
  //Will retrieve the last booking details from the MongoDB BookMyShow collection and send it to the client with 200 status code, 
  //if no booking found; will still return 200 with no bookings found message, 500 status code will be returned with error message in case of server connection error

  bookingRoutes.get("/api/booking", async (req, res) => {
    try {

      //we find the last n records in descending order and grab the first one by booking[0], if not found will go into the else block
      const booking = await Booking.find().sort({ createdOn: -1 }).limit(1);
      if (booking[0]) {
        res.status(200).send(booking[0]);
      } else {
        res.status(200).send({ message: "No previous bookings found" });
      }
    } catch (err) {
      res.status(500).send({ message: "error while getting the last booking" });
      console.log("error while getting the last booking", err);
    }
  });

  module.exports=bookingRoutes;