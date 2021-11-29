//import the require dependencies
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
app.set('view engine', 'ejs');
const bcrypt = require("bcrypt");
const UserProfile=require("./model/UserProfile");
const config = require('./config');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: config.frontEnd, credentials: true }));

//use express session to maintain session data
app.use(session({
  secret: 'cmpe202_airline',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', config.frontEnd);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const db = config.mongoURI;
const mongoose = require('mongoose');

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(db, options, (err, res) => {
  if (err) {
      console.log(err);
      console.log(`MongoDB Connection Failed`);
  } else {
      console.log(`MongoDB Connected`);
  }
});


app.get("/", (req, res) => {

});


app.post('/signup', async function (req, res) {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  console.log("Registering New User");
  const newUser = {
    firstName: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address:req.body.address,
  };
  new UserProfile(newUser).save((error, data) => {
    if (error) {
      res.status(500).end("Error Occured");
    } else {
      var JSONStr = JSON.stringify(data);
      res.status(200).end(JSONStr);
    }
  })
});


app.post('/login', async function (req, res) {
  UserProfile.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.status(500).end("UnSuccessful Login");
    }
    if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, matchPassword) {
          if (err) return error;
          if (matchPassword) {
            const userData = {
              _id: user._id,
              firstName: user.name,
              lastName: user.lastName,
              email: user.email,
              address:user.address,
            };
            var JSONStr = JSON.stringify(userData);
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

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;