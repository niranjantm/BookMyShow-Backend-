const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;



//Validates the new booking object creation and throws the respective validation errors

const Booking = new Schema({
  movie: {
    type: String,
    required: [true, "movie name not defined"],
    enum: ['Suraj par mangal bhari', 'Tenet', 'The war with grandpa', 'The personal history of David Copperfield', 'Come Play'],
  },
  seats: {
    type: seatSchema,
    required: [true, "seats not provided"],
  },
  slot: { type: String, required: [true, "slot not provided"]},
  createdOn: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
});

//this creates a seperate schema for seats for ease of  maintenance 
const seatSchema = new Schema({
  A1: { type: Number, required: [true, "a1 not provided"] },
  A2: { type: Number, required: [true, "a2 not provided"] },
  A3: { type: Number, required: [true, "a3 not provided"] },
  A4: { type: Number, required: [true, "a4 not provided"] },
  D1: { type: Number, required: [true, "d1 not provided"] },
  D2: { type: Number, required: [true, "d1 not provided"] },
});



module.exports = mongoose.model("Booking", Booking);
