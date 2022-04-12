
var dummy = '2022-04-14T13:49:12.792+00:00';
var currentDate = new Date(dummy);
// currentDate = "2022-04-14T13:49:12.792+00:00";
var numberOfDayToAdd = 10;
currentDate.setDate(currentDate.getDate() + numberOfDayToAdd );

console.log(currentDate);

// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// var date = new Date();

// console.log(date.addDays(5));