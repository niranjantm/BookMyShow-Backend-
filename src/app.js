const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router= require("express").Router();
const bookingRoutes = require("./routes/routes");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
router.use("/", bookingRoutes);



//connecting to the mongoDB atlas DB with a  username and password 
try {
  mongoose.connect(
    "mongodb+srv://vinaykale1999:vinaykale@cluster0.mktz8ju.mongodb.net/BookMyShow?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log("Connected to the DB");
} catch (err) {
  console.log(
    "Error occured while establishing a connection with the database",
    err.message
  );
}

//--------------------------------------listening  the server-----------------------------
const PORT = 8080;
app.listen(PORT, (err) => {
  if (!err) console.log(`Server Listening to port ${PORT}`);
  else console.log("Server failed to launch");
});

module.exports.handler = serverless(app);