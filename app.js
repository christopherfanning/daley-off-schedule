const express = require('express');
const ejs = require('ejs');
const {
  urlencoded
} = require('express');
const port = 3000;


const app = express();

app.use(express.urlencoded({
  urlencoded: true
}));

app.set('view engine', 'ejs')

// buildCalendar() => {
//   console.log();
// };

// Get daley of first day of month.  
// Calculate all daleys for entire month.
// furloughs start january 2nd and last day is the 16th.
// furloughs are 14 days long. 
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function buildCalendar(year) {
  console.log("I'm building a calendar.");

  // let startDate = new Date('2021-00-02');

  let startDate = new Date('January 2, 2021');
  const endDate = new Date('January 12, 2022');
  let dateRunner = new Date(startDate.getDate().toLocaleString('en-US', {}));

  console.log(`the first date is ${startDate}`);

  while (dateRunner != endDate) {
    console.log(startDate);
    console.log(dateRunner + " is the current date.");
    console.log(endDate);
    dateRunner = dateRunner.addDays(1);
    // store the dateRunner with daley and furlough attributes.
  }

  startDate.add(5, 'd');

  console.log(`after adding one to the date it's now ${startDate}`);

  // build array of each day

}

app.get('/', (req, res) => {
  // lets create a 'day' object.  
  // let day = new Date();
  buildCalendar();
  res.render('index');
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});