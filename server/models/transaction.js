var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var transactionModelSchema = new Schema({
  bookIssued: { required: true, type: Schema.Types.ObjectId, ref: "book" },
  IssuedTo: { required: true, type: Schema.Types.ObjectId, ref: "user" },
  IssuedBy: { required: true, type: Schema.Types.ObjectId, ref: "user" },
  dateofIssuing: { type: Date, required: true },
  IssuedTill: { type: Date, required: true },
  PlaceOfExchange: { type: String, required: true },
  extension: {
    extensionRequested: { type: Boolean, default: false },
    daysExtensionRequested: {
      type: Number,
      default: 0,
      max: [15, "extension must be less than or equal to 15 days"],
      min: 0,
    }, //ask this as input
    orginalDateOfReturn: { type: Date }, // lies in the document already
    newDateOfReturn: { type: Date }, // should be calculated by the backend itself, don't ask from the user
  },
  returnedOn: { type: Date },
  penalty: {
    amount: { type: Number, default: 0 },
    paidOn: { type: Date },
  },
});

module.exports = mongoose.model("transaction", transactionModelSchema);
