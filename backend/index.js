//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
app.set('view engine', 'ejs');

const config = require('./config');
const { auth, checkAuth } = require('./passport');
auth();

//use cors to allow cross origin resource sharing
app.use(cors({ origin: config.frontEnd, credentials: true }));

//use express session to maintain session data
app.use(session({
  secret: 'cmpe202_airline',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
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

mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 4
}).then((err, result) => {
  console.log("connected!!!");
});


app.get("/", (req, res) => {
});


app.post('/signup', async function (req, res) {
  
});


app.post('/login', async function (req, res) {

  
});

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;