//import the require dependencies
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
app.set("view engine", "ejs");
const bcrypt = require("bcrypt");
const UserProfile = require("./model/UserProfile");
const Booking = require("./model/Booking");
const config = require("./config");
const Flight = require("./model/Flight");
const Airplane = require("./model/Airplane");
const Airline = require("./model/Airline");
const Airport = require("./model/Airport");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: config.frontEnd, credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe202_airline",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.frontEnd);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const db = config.mongoURI;
const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(db, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

app.get("/", (req, res) => {});

app.post("/signup", async function (req, res) {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  console.log("Registering New User");
  const newUser = {
    firstName: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    mileagePoints: 0,
  };
  new UserProfile(newUser).save((error, data) => {
    if (error) {
      res.status(500).end("Error Occured");
    } else {
      data.password = "";
      var JSONStr = JSON.stringify(data);
      res.status(200).end(JSONStr);
    }
  });
});

app.post("/cancelReservation", async function (req,res){
  try {
    const update = { $set: { bookingStatus: "Cancelled"} };
    const bookings = await Booking.findOneAndUpdate({ _id: req.body.bookingId }, update,(error,data)=>{
      if(error){
        res.status(500).end("Error Occured");
      }else{
        var JSONStr = JSON.stringify(data);
        res.status(200).end(JSONStr);
      }
    })
  }catch{
    res.status(500).end("Error Occured");
  }
});

app.post("/updateReservation", async function (req,res){
  try {
    const update = { $set: { seatNumber: req.body.seatNumber} };
    const bookings = await Booking.findOneAndUpdate({ _id: req.body.bookingId }, update,(error,data)=>{
      if(error){
        res.status(500).end("Error Occured");
      }else{
        var JSONStr = JSON.stringify(data);
        res.status(200).end(JSONStr);
      }
    })
  }catch{
    res.status(500).end("Error Occured");
  }
});

app.post("/updateProfile", async function (req, res) {
  const filter = { _id: req.body._id };
  const newUser = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
    },
  };
  UserProfile.updateOne(filter, newUser, (error, data) => {
    if (error) {
      res.status(500).end("Error Occured");
    } else {
      data.password = "";
      var JSONStr = JSON.stringify(data);
      res.status(200).end(JSONStr);
    }
  });
});

app.post("/login", async function (req, res) {
  UserProfile.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.status(500).end("User Not Found");
    }
    if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, matchPassword) {
          if (err) return error;
          if (matchPassword) {
            user.password = "";
            var JSONStr = JSON.stringify(user);
            res.status(200).end(JSONStr);
          } else {
            res.status(500).end("UnSuccessful Login");
          }
        }
      );
    } else {
      res.status(500).end("UnSuccessful Login");
    }
  });
});

app.post("/getbookings", async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.body.userId })
      .populate("userId", ["firstName", "lastName"])
      .populate("flightId", [
        "departureAirport",
        "arrivalAirport",
        "arrivalDateTime",
        "departureDateTime",
      ])
      .sort({ Time: "desc" });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error " + err,
    });
  }
});

app.post("/createReservation", async (req, res, next) => {
  const newBooking = {
    userId: req.body.userId,
    flightId: req.body.flightId,
    bookingDate: req.body.bookingDate,
    seatNumber: req.body.seatNumber,
    bookingStatus: req.body.bookingStatus,
    price: req.body.price,
    isMileage: req.body.isMileage,
    departureTime: req.body.departureTime,
    arrivalTime: req.body.arrivalTime,
  };
  new Booking(newBooking).save((error, data) => {
    if (error) {
      res.status(500).end("Error Occured");
    } else {
      var JSONStr = JSON.stringify(data);
      res.status(200).end(JSONStr);
    }
  });
});

app.get("/getMileageActivity", async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.query.userId })
      .populate({
        path: "flightId",
        model: "Flight",
        populate: {
          path: "departureAirport",
          model: "Airport",
        },
      })
      .populate({
        path: "flightId",
        model: "Flight",
        populate: {
          path: "arrivalAirport",
          model: "Airport",
        },
      })
      .sort({ Time: "desc" });
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error " + err,
    });
  }
});

app.post("/getSeatInfoFromBookings", async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      flightId: req.body.flightId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
    })
      .populate("userId", ["firstName", "lastName"])
      .populate("flightId", [
        "departureAirport",
        "arrivalAirport",
        "arrivalDateTime",
        "departureDateTime",
      ])
      .sort({ Time: "desc" });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error " + err,
    });
  }
});

app.post("/getBooking", async (req, res, next) => {
  try {
    if (req.body.isAdmin  === true){
    const bookings = await Booking.find()
      .populate("userId")
      .populate({
        path: "flightId",
        model: "Flight",
        populate: [
          {
            path: "arrivalAirport",
            model: "Airport",
          },
          {
            path: "departureAirport",
            model: "Airport",
          },
        ],
      })
      .sort({ Time: "desc" });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } else {
    const userId = req.body.userId 
    const bookings = await Booking.find({ userId: req.body.userId })
      .populate("userId")
      .populate({
        path: "flightId",
        model: "Flight",
        populate: [
          {
            path: "arrivalAirport",
            model: "Airport",
          },
          {
            path: "departureAirport",
            model: "Airport",
          },
        ],
      })
      .sort({ Time: "desc" });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error " + err,
    });
  }

}
);

app.get("/allAirports", function (req, res) {
  Airport.find().exec((error, result) => {
    if (error) {
      // console.log(error);
      res.status(404).end();
    } else {
      let response = {};
      result.map((item) => {
        response[item.city] = item;
      });
      // console.log(response);
      res.status(200).send(response);
    }
  });
});

app.get("/flights", function (req, res) {
  Flight.find({
    departureAirport: mongoose.Types.ObjectId(req.query.departLoc),
    arrivalAirport: mongoose.Types.ObjectId(req.query.arriveLoc),
  })
    .populate(["airplaneId", "airlineId", "departureAirport", "arrivalAirport"])
    .exec((error, result) => {
      if (error) {
        // console.log(error);
        res.status(404).end();
      } else {
        let response = [];
        result.map((item) => {
          let remainingSeats =
            item.airplaneId.noOfSeats - item.airplaneId.seats.length;
          if (
            item.departureDateTime.toDateString() ===
              new Date(req.query.departDate).toDateString() &&
            remainingSeats > 0
          ) {
            item.airplaneId.seats = null;
            response.push(item);
          }
        });
        console.log(response);
        res.status(200).send(response);
      }
    });
});

app.get("/allFlights", function (req, res) {
  Flight.find()
    .populate(["airplaneId", "airlineId", "departureAirport", "arrivalAirport"])
    .exec((error, result) => {
      if (error) {
        res.status(404).end();
      } else {
        let response = [];
        result.map((item) => {
          let remainingSeats =
            item.airplaneId.noOfSeats - item.airplaneId.seats.length;
          if (remainingSeats > 0) {
            item.airplaneId.seats = null;
            response.push(item);
          }
        });
        console.log(response);
        res.status(200).send(response);
      }
    });
});

app.post("/updatePoints", async function (req, res) {
  UserProfile.findOneAndUpdate(
    { _id: req.body.userId },
    { $set: { mileagePoint: req.body.price } },
    { new: true }
  )
    .then((result) => {
      return res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: "Server Error " + err,
      });
    });
});

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
