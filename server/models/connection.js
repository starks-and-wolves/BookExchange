var mongoose = require("mongoose");

let db_link = process.env.DB_LINK;
// console.log(db_link);
let db;

mongoose
  .connect(db_link) // database link => promise based function
  .then((db_) => {
    // console.log(db);
    db = db_;
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
