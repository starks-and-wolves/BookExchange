var mongoose = require("mongoose");

let db_link = process.env.DB_LINK;

let db;

mongoose
  .connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // database link => promise based function
  .then((db_) => {
    // console.log(db_);
    db = db_;
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
