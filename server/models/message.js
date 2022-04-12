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
    
    // dateofIssuing: {type: Date, required: true},
    // IssuedTill: {type: Date, required:true},
    // PlaceOfExchange: {type: String, required: true},
    noOfDays : {type: Number, required: true},
    extension: {
        extensionRequested: {type: Boolean, default: false},
        daysExtensionRequested: {type: Number, default:0, min:0, max: [15, 'extension must be less than or equal to 15'] }, //ask this as input
    },
});

module.exports = mongoose.model('message', messageModelSchema);