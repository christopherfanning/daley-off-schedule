const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/daleyOffScheduleDB');

const daySchema = new mongoose.Schema({
  date: String,
  daley: String,
  furlough: String,
  platoon: String
});

const memberSchema = new mongoose.Schema({
  name: String,
  daleyDay: String,
  furloughs: Number,
  platoon: String
});


const port = 3000;


const app = express();

app.use(express.urlencoded({
  extended: true
}))


app.set('view engine', 'ejs');
app.use(express.static("public"));

// Init variables. 
let calendar = [];
const daleyDay = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E'];
const shift = [2, 3, 1];

const furlough = Array.from({
  length: 25
}, (_, i) => i + 1);

console.log('These are the furloughs');
console.log(furlough);

// furloughs start january 2nd and last day is january 16th 2021.
// furloughs are 14 days long.
// furloughs start on a 2A.



Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function buildCalendar(year) {
  console.log("I'm building a calendar.");


  let startDate = new Date('January 2, 2021');
  const endDate = new Date('January 12, 2022');

  console.log(`the first date is ${startDate}`);

  // Create the first day of the first furlough of 2021
  calendar.push({
    date: startDate.getDate(),
    year: startDate.getFullYear(),
    month: startDate.getMonth(),
    shift: 2,
    daley: 'A',
    furlough: 1,

  });

  console.log('This is the getDate function on startDate');
  console.log(calendar);
  console.log(startDate.getDate());

  // Inits for the Shift daley and furloughs
  let s = 1;
  let d = 1;
  let f = 0;

  let furloughDayCounter = 0;

  do {
    // console.log(startDate.toLocaleDateString('en-US'));
    // console.log(startDate.toLocaleDateString('en-US') + " is the current date.");
    // console.log(`${endDate.toLocaleDateString('en-US')} is the endDate `);

    // reset daley day back to beginning
    if (d == 15) {
      d = 0;
      f++;
    }

    // reset shift day. 
    if (s == 3) {
      s = 0;
    }


    // increment day
    startDate = startDate.addDays(1);

    calendar.push({
      date: startDate.getDate(),
      year: startDate.getFullYear(),
      month: startDate.getMonth(),
      shift: shift[s],
      daley: daleyDay[d],
      furlough: furlough[f],
    });

    d++
    s++

    // store the dateRunner with daley and furlough attributes.
  } while (startDate.toLocaleDateString('en-US') !== endDate.toLocaleDateString('en-US'));


  console.log("This should be the full calendar object.");
  console.log(calendar);
  console.log(`after adding one to the date it's now ${startDate}`);

  // build array of each day

}

buildCalendar();


app.get('/', (req, res) => {
  // lets create a 'day' object.  
  // let day = new Date();
  // buildCalendar();
  res.render('index');
});

app.get('/members', (req, res) => {
  // list all the members.
  res.render('members');
});

app.post('/members', (req, res) => {
  // Add new member
  // Save the member data object to the currently logged in user.
});

app.get('/login', (req, res) => {

});

app.post('/login', (req, res) => {

  const username = req.body.userName;
  const password = req.body.password;

});

// TODO add route for creating monthly calendars.
app.get('/create', (req, res) => {
  res.render('create-calendar');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});