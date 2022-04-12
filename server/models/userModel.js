var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var { isEmail } =  require('validator');

const db_link = "mongodb+srv://hritishjain:Ns2A9tVsH7JeytJQ@cluster0.piemw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;
mongoose.connect(db_link) // database link => promise based function
.then((db)=>{
    // console.log(db);
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
});

var userModelSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v)
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required: [true, 'User phone number required'],
    },
    address: {type: String},
    bitsID: {
        type: String,
        unique: true,
        required: true
    },  
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: v => v.toLowerCase(),
        validate: [ isEmail, 'invalid email' ]
    },
    password: { type: String, required: true },
    wishList: [{ type: String, lowercase: true }],
    booksIssued: [{type: Schema.Types.ObjectId, ref: 'transaction'}],
    // booksrequested:  [{
    //     book: {type: Schema.Types.ObjectId, ref: 'book'},
    //     date: {type: Date, default: Date.now},
    //     message: {type: Schema.Types.ObjectId, ref: 'message'}
    // }],  
    booksLent: [{type: Schema.Types.ObjectId, ref: 'transaction'}], 
    booksrequested: [{type: Schema.Types.ObjectId, ref: 'message'}],
    messageRequestsPending: [{type: Schema.Types.ObjectId, ref: 'message'}],
    booksCurrentlyIssued: [{type: Schema.Types.ObjectId, ref: 'transaction'}],
    booksReturned: [{type: Schema.Types.ObjectId, ref: 'transaction'}],                          
    booksCurrentlyLent: [{type: Schema.Types.ObjectId, ref: 'transaction'}]
});

module.exports = mongoose.model('user', userModelSchema);