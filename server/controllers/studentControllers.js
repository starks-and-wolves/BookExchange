const userModel = require('../models/userModel');
const bookModel = require('../models/book');
const messageModel = require('../models/message');
const transactionModel = require('../models/transaction');
const adminModel = require('../models/adminModel');

  module.exports.addBook = async function addBook(req, res) {
      try {
        let dataObj = req.body;
        console.log(dataObj);
        let book = await bookModel.create(dataObj);
        if (book) {
          return res.json({
            ok: true,
            message: "book created successfully",
            data: book,
          });
        } else {
          res.json({
            ok: false,
            message: "Error while creating book",
          });
        }
      } catch (err) {
        res.json({
          ok: false,
          message: err.message,
        });
      }
    };

  module.exports.getAllBooks = async function getAllBooks(req, res) {
    try {
      let allBooks = await bookModel.find();
      res.json(allBooks);
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.updateBookByID = async function updateBookByID(req, res) {
    try {
      let id = req.params.id;
      let book = await bookModel.findById(id);
      let dataToBeUpdated = req.body;
      if (book) {
        const keys = [];
        for (let key in dataToBeUpdated) {
          keys.push(key);
        }
        for (let i = 0; i < keys.length; i++) {
          book[keys[i]] = dataToBeUpdated[keys[i]];
        }
        const updatedData = await book.save();
        res.json({
          ok: true,
          message: "data updated succesfully",
          data: book,
        });
      } else {
        res.json({
          ok: false,
          message: "book not found",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };


  module.exports.deleteBookByName = async function deleteBookByName(req, res) { 
    try {
      let bookDoc = await bookModel.find({bookName: req.params.name});
      let id = bookDoc.id;
      let book = await bookModel.findByIdAndDelete(id);
      if (!book) {
        res.json({
          message: "book not found",
        });
      }
      res.json({
        message: "book deleted sucessfully",
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  };

  module.exports.deleteBookByID = async function deleteBookByID(req, res) {
    try {
      let id = req.params.id;
      let book = await bookModel.findByIdAndDelete(id);
      if (!book) {
        res.json({
          message: "book not found",
        });
      }
      res.json({
        message: "book deleted sucessfully",
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  };

  module.exports.getBookByName = async function getBookByName(req, res) {
    try {
      let name = req.params.name;
      let book = await bookModel.findOne({bookName:name});
      res.json(book);
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };
  
  module.exports.getBookByID = async function getBookByID(req, res) {
    try {
      let id = req.params.id;
      let book = await bookModel.findById(id);
      res.json(book);
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.getBookByGenres = async function getBookByGenres(req, res) {
    try {
      let genre = req.params.genre;
      let book = await bookModel.find({genre:genre});
      res.json(book);
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };
  
  module.exports.makeBookRequest = async function makeBookRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let bookReq = await messageModel.create(dataObj);
      if (bookReq) {
        let bookReqID = bookReq['_id'];
        userModel.findOneAndUpdate(
          { _id: dataObj.SenderID }, 
          { $push: { booksrequested: bookReqID  } },
         function (error, success) {
               if (error) {
                   console.log(error);
               } else {
                   console.log(success);
               }
           });
        
        userModel.findOneAndUpdate(
        { _id: dataObj.receiverID }, 
        { $push: { messageRequestsPending: bookReqID  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
          });

        let bookID = dataObj.bookRequested;
        bookModel.findOneAndUpdate(
          { _id: bookID }, 
          { $push: { bookRequests: dataObj.SenderID  } },
         function (error, success) {
               if (error) {
                   console.log(error);
               } else {
                   console.log(success);
               }
           });

        
        return res.json({
          ok: true,
          message: "book request successfully made",
          data: bookReq,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while requesting book",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
    
  };


  // Make transaction object
  // Lender-> delete messageRequestsPending -> add to books lent, add to books  currently lent as well
  // Borrower -> delete books requested  -> add to books issued
  // Book -> update currently with, delete book request, add to issuers list
  module.exports.approveBookRequest = async function approveBookRequest (req,res) {
    try {

      // Create transaction object

      let userID = req.body.id; // current signed in user
      let user = await userModel.findById(userID);
      let msgRequestID = user.messageRequestsPending[0];
      console.log(msgRequestID);  
      let msg = await messageModel.findById(msgRequestID);
      let numberOfDaysToAdd=  msg.noOfDays;
      var currentDate = new Date(req.body.date);
      // var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd );
      let newTransaction = {
        bookIssued: msg.bookRequested,
        IssuedTo: msg.SenderID,
        IssuedBy: msg.receiverID,
        dateofIssuing: req.body.date,
        IssuedTill: currentDate,
        PlaceOfExchange: req.body.PlaceOfExchange,
      };

      /* 
      Dive.update({ _id: diveId }, { "$pull": { "divers": { "user": userIdToRemove } }}, { safe: true, multi:true }, function(err, obj) {
      //do something smart
      });
      */

      let createdTransaction = await transactionModel.create(newTransaction);

      // Make updates to lender's document
      // Delete msg request in lender
      userModel.findOneAndUpdate(
        { _id: msg.receiverID }, 
        { $pull: { messageRequestsPending: msgRequestID  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
      });
      // Add to books lent in lender
      userModel.findOneAndUpdate(
        { _id: msg.receiverID }, 
        { $push: { booksLent: createdTransaction['_id']  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
      });
      // add to books currently lent in the lender's section
      userModel.findOneAndUpdate(
        { _id: msg.receiverID }, 
        { $push: { booksCurrentlyLent: createdTransaction['_id']  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
      });

      // Make updates in borrower's document 
      // Delete book request from borrower
      userModel.findOneAndUpdate(
        { _id: msg.SenderID }, 
        { $pull: { booksrequested: msgRequestID  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
      });
      
      // Add to currently issued books in borrower
      userModel.findOneAndUpdate(
        { _id: msg.SenderID }, 
        { $push: { booksCurrentlyIssued: createdTransaction['_id']  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
      });  

      // Add to books issued in borrower
      userModel.findOneAndUpdate(
        { _id: msg.SenderID }, 
        { $push: { booksIssued: createdTransaction['_id']  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
      });
      // end changes in borrower        
      

      if (createdTransaction) {
        return res.json({
          ok: true,
          message: "Book request Approved",
          data: createdTransaction,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while approving book",
        });
      }

    } catch (error) {
      res.json({
        ok: false,
        message: "Some error" ,
      });
    }
  }
  // Functions written till here

  module.exports.deleteBookIssueRequest = async function deleteBookIssueRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.patchBookRequest = async function patchBookRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.getWaitingListOfAllBooksRequested = async function getWaitingListOfAllBooksRequested(req, res) {
      try {
        let dataObj = req.body;
        console.log(dataObj);
        let validator = await validatorModel.create(dataObj);
        if (validator) {
          return res.json({
            ok: true,
            message: "Validator created successfully",
            data: validator,
          });
        } else {
          res.json({
            ok: false,
            message: "Error while creating validator",
          });
        }
      } catch (err) {
        res.json({
          ok: false,
          message: err.message,
        });
      }
    };

  module.exports.getWaitingListOfBookRequested = async function getWaitingListOfBookRequested(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.getReceiveBookDates = async function getReceiveBookDates(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.getReturnBookDates = async function getReturnBookDates(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.getTranasactionDetails = async function getTranasactionDetails(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.viewMessageRequests = async function viewMessageRequests(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.sendMessageRequest = async function sendMessageRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.patchMessageRequest = async function patchMessageRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.deleteMessageRequest = async function deleteMessageRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.makeextensionRequest = async function makeextensionRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  //dummy function
  module.exports.getExtensionStatus = async function getExtensionStatus(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.deleteExtensionRequest = async function deleteExtensionRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.updateExtensionRequest = async function updateExtensionRequest(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };


  module.exports.returnIssuedBook = async function returnIssuedBook(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.getBookReviewsById = async function getBookReviewsById(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.makeBookReviewById = async function makeBookReviewById(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.deleteBookReviewById = async function deleteBookReviewById(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.patchBookReviewById = async function patchBookReviewById(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };

  module.exports.deleteAccount = async function deleteAccount(req, res) {
    try {
      let dataObj = req.body;
      console.log(dataObj);
      let validator = await validatorModel.create(dataObj);
      if (validator) {
        return res.json({
          ok: true,
          message: "Validator created successfully",
          data: validator,
        });
      } else {
        res.json({
          ok: false,
          message: "Error while creating validator",
        });
      }
    } catch (err) {
      res.json({
        ok: false,
        message: err.message,
      });
    }
  };
  
