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




const {
  urlencoded
} = require('express');
const port = 3000;


const app = express();

app.use(express.urlencoded({
  urlencoded: true
}));

app.set('view engine', 'ejs')

// Init variables. 
const daleyDays = ['A', 'B', 'C', 'D', 'E'];
const furloughs = Array.from({
  length: 10
}, (_, i) => i + 1);


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

  do {
    console.log(startDate.toLocaleDateString('en-US'));
    console.log(startDate.toLocaleDateString('en-US') + " is the current date.");
    console.log(`${endDate.toLocaleDateString('en-US')} is the endDate `);
    startDate = startDate.addDays(1);
    // store the dateRunner with daley and furlough attributes.
  } while (startDate.toLocaleDateString('en-US') !== endDate.toLocaleDateString('en-US'));


  console.log(`after adding one to the date it's now ${startDate}`);

  // build array of each day

}

buildCalendar();

app.get('/', (req, res) => {
  // lets create a 'day' object.  
  // let day = new Date();
  buildCalendar();
  res.render('index');
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});