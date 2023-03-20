// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  
  // store date param
  let date = req.params.date;
  let unixDate
  let dateObj
  let utcDate

  // check if date param is a number
  let isItUnix = /^\d+$/.test(date)

  // create date obj to translate into utc and unix date
  // if no param date in url
  if (!date) {
    dateObj = new Date()
    // if date is a unix number
  } else if (date && isItUnix) {
    unixDate = parseInt(date)
    dateObj = new Date(unixDate)
    // if date is not a number
  } else if (date && !isItUnix){
    dateObj = new Date(date)
  }

  // check if date is invalid by turning it into a string
  if (dateObj.toString() === "Invalid Date") {
    return res.json({error: "Invalid Date"})
  }

  // methods to change the date into unix and utc formats
  unixDate = dateObj.getTime()
  utcDate = dateObj.toUTCString()

  // json response object for given route
  res.json({unix: unixDate, utc: utcDate});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});