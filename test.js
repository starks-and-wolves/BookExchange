const {structuredClone} = require('@ungap/structured-clone');

// var dummy = '2022-04-18T13:49:12.792+00:00';
// var currentDate = new Date(dummy);
// var datetoday = new Date()
// // var currentDate = "2022-04-18T13:49:12.792+00:00";
// var numberOfDayToAdd = 10;
//     currentDate.setDate(currentDate.getDate() + numberOfDayToAdd );
// console.log(datetoday);
// console.log(currentDate);
// console.log(currentDate.getDate() - datetoday.getDate());

var dummy = '2022-04-18T13:49:12.792+00:00';
var originalDate = new Date(dummy);
// var originalDate = trnx.IssuedTill;
// var newDateOfReturn =  originalDate;
const clone = structuredClone(originalDate);
newDateOfReturn.setDate(newDateOfReturn.getDate() + 5 );
console.log(newDateOfReturn);
console.log(originalDate);


// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// var date = new Date();

// console.log(date.addDays(5));