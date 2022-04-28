const userModel = require("../models/user");
const bookModel = require("../models/book");
const messageModel = require("../models/message");
const transactionModel = require("../models/transaction");
const adminModel = require("../models/admin");
const { reset } = require("nodemon");
const { findByIdAndUpdate } = require("../models/book");

module.exports.getUser = async function getUser(req, res) {
  try {
    let userID = req.params.id;
    // console.log(userID);
    let user = await userModel.findById(userID);

    return res.json({
      ok: true,
      data: user,
    });
  } catch (err) {
    console.log("from catch");
    res.json({
      ok: false,
      message: err.message,
    });
  }
};
module.exports.addBook = async function addBook(req, res) {
  try {
    let dataObj = req.body;
    console.log(dataObj);
    let book = await bookModel.create(dataObj);
    userModel.findOneAndUpdate(
      { _id: dataObj.bookOwner },
      { $push: { booksowned: book._id } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
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
    let bookDoc = await bookModel.find({ bookName: req.params.name });
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
    let book = await bookModel.findOne({ bookName: name });
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
    let book = await bookModel.find({ genre: genre });
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
      let bookReqID = bookReq["_id"];
      userModel.findOneAndUpdate(
        { _id: dataObj.SenderID },
        { $push: { booksrequested: bookReqID } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );

      userModel.findOneAndUpdate(
        { _id: dataObj.receiverID },
        { $push: { messageRequestsPending: bookReqID } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );

      let bookID = dataObj.bookRequested;
      bookModel.findOneAndUpdate(
        { _id: bookID },
        { $push: { bookRequests: bookReqID } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );

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
module.exports.approveBookRequest = async function approveBookRequest(
  req,
  res
) {
  try {
    // Create transaction object

    let userID = req.body.id; // current signed in user
    let user = await userModel.findById(userID);
    let msgRequestID = user.messageRequestsPending[0];
    console.log(msgRequestID);
    let msg = await messageModel.findById(msgRequestID);
    let numberOfDaysToAdd = msg.noOfDays;
    var currentDate = new Date(req.body.date);
    // var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
    let newTransaction = {
      bookIssued: msg.bookRequested,
      IssuedTo: msg.SenderID,
      IssuedBy: msg.receiverID,
      dateofIssuing: req.body.date,
      IssuedTill: currentDate,
      PlaceOfExchange: req.body.PlaceOfExchange,
      extension: {
        orginalDateOfReturn: currentDate,
      },
    };

    /* 
      Dive.update({ _id: diveId }, { "$pull": { "divers": { "user": userIdToRemove } }}, { safe: true, multi:true }, function(err, obj) {
      //do something smart
      });
      */

    let createdTransaction = await transactionModel.create(newTransaction);

    // Make updates to book document
    // Delete book request in book document
    bookModel.findOneAndUpdate(
      { _id: msg.bookRequested },
      { $pull: { bookRequests: msgRequestID } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // Add to issuers in book document
    bookModel.findOneAndUpdate(
      { _id: msg.bookRequested },
      { $push: { issuers: createdTransaction["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // update currently with in book model
    bookModel.findOneAndUpdate(
      { _id: msg.bookRequested },
      { currentlyWith: msg.SenderID },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Make updates to lender's document
    // Delete msg request in lender
    userModel.findOneAndUpdate(
      { _id: msg.receiverID },
      { $pull: { messageRequestsPending: msgRequestID } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // Add to books lent in lender
    userModel.findOneAndUpdate(
      { _id: msg.receiverID },
      { $push: { booksLent: createdTransaction["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // add to books currently lent in the lender's section
    userModel.findOneAndUpdate(
      { _id: msg.receiverID },
      { $push: { booksCurrentlyLent: createdTransaction["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Make updates in borrower's document
    // Delete book request from borrower
    userModel.findOneAndUpdate(
      { _id: msg.SenderID },
      { $pull: { booksrequested: msgRequestID } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Add to currently issued books in borrower
    userModel.findOneAndUpdate(
      { _id: msg.SenderID },
      { $push: { booksCurrentlyIssued: createdTransaction["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Add to books issued in borrower
    userModel.findOneAndUpdate(
      { _id: msg.SenderID },
      { $push: { booksIssued: createdTransaction["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
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
      message: "Some error",
    });
  }
};

// return book function
// Check for penalty*
// update transaction -> returnedOn: {type: Date}, add penalty*
// book doc -> currentlyWith (user) *
// borrower -> booksCurrentlyIssued (delete), booksReturned (add->trnx id)
// lender -> booksCurrentlyLent (delete), booksReceived (add->trnx id)*
// Add penalty in user models*

module.exports.returnIssuedBook = async function returnIssuedBook(req, res) {
  try {
    // Create transaction object

    let userID = req.body.id; // current signed in user -> the borrower in this case
    let user = await userModel.findById(userID);
    let trnx = await transactionModel.findById(req.body.transactionId);
    var penalty = 0;
    var currentDate = new Date();
    if (trnx.IssuedTill.getDate() - currentDate.getDate() < 0) {
      penalty = (currentDate.getDate() - trnx.IssuedTill.getDate()) * 5;
    }
    // Check if penalty is there, if yes, then add penaltyToTake in lender and penaltyToPay in borrower's document
    if (penalty > 0) {
      // lender's document
      userModel.findOneAndUpdate(
        { _id: trnx.IssuedBy },
        { $push: { penaltyToTake: trnx["_id"] } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
      // Borrower's document
      userModel.findOneAndUpdate(
        { _id: trnx.IssuedTo },
        { $push: { penaltyToPay: trnx["_id"] } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
    }

    // Make updates to transaction document
    // Updating return date in transaction document
    transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      { returnedOn: currentDate },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // Add penalty in transaction document
    transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      { penalty: { amount: penalty } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Make updates in Book document
    // update currently with in book model
    bookModel.findOneAndUpdate(
      { _id: trnx.bookIssued },
      { currentlyWith: trnx.IssuedBy },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Make updates to lender's document
    // Delete book from CurrentlyLent in lender
    userModel.findOneAndUpdate(
      { _id: trnx.IssuedBy },
      { $pull: { booksCurrentlyLent: trnx["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // Add to books received in lender
    userModel.findOneAndUpdate(
      { _id: trnx.IssuedBy },
      { $push: { booksReceived: trnx["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Make updates to borrower's document
    // add to books returned in the borrower's section
    userModel.findOneAndUpdate(
      { _id: trnx.IssuedTo },
      { $push: { booksReturned: trnx["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    // Delete book from booksCurrentlyIssued in borrower
    userModel.findOneAndUpdate(
      { _id: trnx.IssuedTo },
      { $pull: { booksCurrentlyIssued: trnx["_id"] } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    return res.json({
      ok: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    res.json({
      ok: false,
      message: "Some error",
    });
  }
};

// Extension Request function
// body -> no. of  days extension daysExtensionRequested, trnxID, userID,
// if already exceeded, then not allowed
// if not, then send req
// trnxModel -> extension, IssuedTill
module.exports.makeextensionRequest = async function makeextensionRequest(
  req,
  res
) {
  try {
    if (req.body.daysExtensionRequested > 15) {
      return res.json({
        ok: false,
        message: "Extension can bnot be greater than 15 days",
      });
    }
    let trnx = await transactionModel.findById(req.body.transactionId);
    var currentDate = new Date();
    if (trnx.extension.extensionRequested) {
      return res.json({
        ok: false,
        message: "Extension can be given only once",
      });
    }
    if (currentDate.getDate() > trnx.IssuedTill.getDate()) {
      return res.json({
        ok: false,
        message: "Extension cannot be granted as deadline already exceeded",
      });
    }

    var newDateOfReturn = trnx.IssuedTill;
    newDateOfReturn.setDate(
      newDateOfReturn.getDate() + req.body.daysExtensionRequested
    );

    // update IssuedTill in transaction document
    // transactionModel.findOneAndUpdate(
    //   { _id: req.body.transactionId }, { IssuedTill: newDateOfReturn  } ,
    //   function (error, success) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log(success);
    //         }
    // });

    // update extension field in transaction document
    transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      {
        extension: {
          extensionRequested: true,
          daysExtensionRequested: req.body.daysExtensionRequested,
          newDateOfReturn: newDateOfReturn,
        },
        IssuedTill: newDateOfReturn,
        PlaceOfExchange: req.body.newPlaceOfExchange,
      },
      function (error, success) {
        if (error) {
          console.log("whee");
        } else {
          console.log(success);
        }
      }
    );
    return res.json({
      ok: true,
      message: "Extension request successfully made",
      // data: updatedtrnx
    });
  } catch (error) {
    res.json({
      message: "error from catch block",
    });
  }
};

// module.exports.payPenalty = async function payPenalty(req, res) {
//   try {
//     let userID = req.body.id;
//     let transactionId = req.body.transactionId;
//     let receiverID = transactionId.IssuedBy;
//     // console.log(userID);
//     let user = await userModel.findById(userID);
//     let penaltyToPay = user.penaltyToPay;
//     if (user.wallet < user.penaltyToPay) {
//       return res.json({
//         ok: false,
//         message: "Insufficient funds",
//       });
//     } else {
//       let walletValue = user.wallet - penaltyToPay;
//       let walletValue1 = user.wallet - penaltyToPay;
//       findByIdAndUpdate({ id: user._id }, { wallet: walletValue });
//       findByIdAndUpdate({id: receiverID},{
//         wallet:
//       })
//       return res.json({
//         ok: false,
//         message: "Money Deducted",
//       });
//     }
//     return res.json({
//       ok: true,
//       data: user,
//     });
//   } catch (err) {
//     console.log("from catch");
//     res.json({
//       ok: false,
//       message: err.message,
//     });
//   }
// };
// Functions written till here

module.exports.deleteBookIssueRequest = async function deleteBookIssueRequest(
  req,
  res
) {
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

module.exports.getReceiveBookDates = async function getReceiveBookDates(
  req,
  res
) {
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

module.exports.getReturnBookDates = async function getReturnBookDates(
  req,
  res
) {
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

module.exports.getTranasactionDetails = async function getTranasactionDetails(
  req,
  res
) {
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

module.exports.viewMessageRequests = async function viewMessageRequests(
  req,
  res
) {
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

module.exports.sendMessageRequest = async function sendMessageRequest(
  req,
  res
) {
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

module.exports.patchMessageRequest = async function patchMessageRequest(
  req,
  res
) {
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

module.exports.deleteMessageRequest = async function deleteMessageRequest(
  req,
  res
) {
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
module.exports.getExtensionStatus = async function getExtensionStatus(
  req,
  res
) {
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

module.exports.deleteExtensionRequest = async function deleteExtensionRequest(
  req,
  res
) {
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

module.exports.updateExtensionRequest = async function updateExtensionRequest(
  req,
  res
) {
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

module.exports.getBookReviewsById = async function getBookReviewsById(
  req,
  res
) {
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

module.exports.makeBookReviewById = async function makeBookReviewById(
  req,
  res
) {
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

module.exports.deleteBookReviewById = async function deleteBookReviewById(
  req,
  res
) {
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

module.exports.patchBookReviewById = async function patchBookReviewById(
  req,
  res
) {
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
