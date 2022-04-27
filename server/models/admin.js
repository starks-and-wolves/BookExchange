var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var { isEmail } = require("validator");

const db_link =
  "mongodb+srv://hritishjain:Ns2A9tVsH7JeytJQ@cluster0.piemw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(db_link) // database link => promise based function
  .then((db) => {
    // console.log(db);
    console.log("DB connected Admin Model");
  })
  .catch((err) => {
    console.log(err);
  });

var adminModelSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: "{VALUE} is not a valid 10 digit number!",
    },
    required: [true, "User phone number required"],
  },
  address: { type: String },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    set: (v) => v.toLowerCase(),
    validate: [isEmail, "invalid email"],
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminModelSchema);
