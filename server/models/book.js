var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookModelSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    unique: true,
  },
  edition: {
    type: Number,
  },
  yearOfPublishing: {
    type: String,
    required: true,
  },
  bookOwner: { required: true, type: Schema.Types.ObjectId, ref: "user" },
  publishedBy: { type: String },
  currentlyWith: { required: true, type: Schema.Types.ObjectId, ref: "user" },
  issuers: [{ type: Schema.Types.ObjectId, ref: "transaction" }],
  // review:[{
  //     message: {type: String},
  //     givenBy: { type: Schema.Types.ObjectId, ref: 'user'},
  //     date: {type: Date, default: Date.now}
  // }],
  genre: {
    type: String,
    required: true,
  },
  bookRequests: [{ type: Schema.Types.ObjectId, ref: "message" }],
});

module.exports = mongoose.model("book", BookModelSchema);
