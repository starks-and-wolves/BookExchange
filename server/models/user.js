var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
var { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const JWTKEY = "iamhritish";
const db_link =
  "mongodb+srv://hritishjain:Ns2A9tVsH7JeytJQ@cluster0.piemw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(db_link) // database link => promise based function
  .then((db) => {
    // console.log(db);
    console.log("DB connected User Model");
  })
  .catch((err) => {
    console.log(err);
  });

var userModelSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    // unique: true,
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
  BITS_ID: {
    type: String,
    // unique: true,
    required: true,
  },
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
  booksowned: [{ type: Schema.Types.ObjectId, ref: "book" }],
  password: { type: String, required: true },
  wishList: [{ type: String, lowercase: true }],
  booksIssued: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  booksLent: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  booksrequested: [{ type: Schema.Types.ObjectId, ref: "message" }],
  messageRequestsPending: [{ type: Schema.Types.ObjectId, ref: "message" }],
  booksCurrentlyIssued: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  booksReturned: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  booksReceived: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  booksCurrentlyLent: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  penaltyToPay: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  penaltyToTake: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userModelSchema.pre("save", async function (next) {
  console.log("pre-save");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    // this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userModelSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, JWTKEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return res.json({
      message: "From catch",
    });
  }
};

module.exports = mongoose.model("user", userModelSchema);
