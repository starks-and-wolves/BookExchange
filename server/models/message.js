var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db_link = "mongodb+srv://hritishjain:Ns2A9tVsH7JeytJQ@cluster0.piemw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;
mongoose.connect(db_link) // database link => promise based function
.then((db)=>{
    // console.log(db);
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
});

var messageModelSchema = new Schema({
    bookRequested : {required: true, type: Schema.Types.ObjectId, ref: 'book' },
    SenderID: {required: true, type: Schema.Types.ObjectId, ref: 'user'},
    receiverID: {required: true, type: Schema.Types.ObjectId, ref: 'user'},
    date: {type: Date, default: Date.now},
    
    dateofIssuing: {type: Date, required: true},
    IssuedTill: {type: Date, required:true},
    PlaceOfExchange: {type: String, required: true},
    extension: {
        extensionRequested: {type: Boolean, required: true},
        daysExtensionRequested: {type: Date, required: true}, //ask this as input
        orginalDateOfReturn: {type: Date, required: true}, // lies in the document already
        newDateOfReturn: {type: Date, required: true}, // should be calculated by the backend itself, don't ask from the user
        newPlaceOfExchange: {type: String}
    },
    returnedOn: {type: Date}

});

module.exports = mongoose.model('message', messageModelSchema);