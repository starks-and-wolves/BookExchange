var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var messageModelSchema = new Schema({
  bookRequested: { required: true, type: Schema.Types.ObjectId, ref: "book" },
  SenderID: { required: true, type: Schema.Types.ObjectId, ref: "user" },
  receiverID: { required: true, type: Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },

  // dateofIssuing: {type: Date, required: true},
  // IssuedTill: {type: Date, required:true},
  // PlaceOfExchange: {type: String, required: true},
  noOfDays: { type: Number, required: true },
  extension: {
    extensionRequested: { type: Boolean, default: false },
    daysExtensionRequested: {
      type: Number,
      default: 0,
      min: 0,
      max: [15, "extension must be less than or equal to 15"],
    }, //ask this as input
  },
  messageFromBorrower: String,
  messageFromOwner: String,
});

module.exports = mongoose.model("message", messageModelSchema);
