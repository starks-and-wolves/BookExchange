const express = require('express');

const app = express();

app.listen('3000');

app.use(express.json());

const studentRouter  = express.Router();
app.use('/student',studentRouter);

const {
    getAllBooks,
    addBook,
    updateBookByID,
    deleteBookByName,
    deleteBookByID,
    getBookByName,
    getBookByID,
    getBookByGenres,
    getWaitingListOfAllBooksRequested,
    getWaitingListOfBookRequested,
    getReceiveBookDates,
    getReturnBookDates,
    getTranasactionDetails,
    viewMessageRequests,
    sendMessageRequest,
    patchMessageRequest,
    deleteMessageRequest,
    makeextensionRequest,
    getExtensionStatus,
    deleteExtensionRequest,
    updateExtensionRequest,
    makeBookRequest,
    deleteBookIssueRequest,
    patchBookRequest,
    returnIssuedBook,
    getBookReviewsById,
    makeBookReviewById,
    deleteBookReviewById,
    patchBookReviewById,
    deleteAccount
} = require("../controllers/studentControllers");

const {
    forgotPassword,
    loginUser,
    signup,
    resetPassword,
    protectRoute,
    logout
} = require("../controllers/authControllers");

const { append } = require("express/lib/response");

//Tested -> Signup, loginUser, logout, addBook, getAllBooks, getBookByID, getBookByGenres, 

// user options
studentRouter.route("/signup").post(signup);
studentRouter.route("/loginUser").post(loginUser);
studentRouter.route("/forgotPassword").get(forgotPassword);
studentRouter.route("/logout").get(logout);
studentRouter.route("/resetPassword").post(resetPassword);

// studentRouter.use(protectRoute);

//Protected Routes
studentRouter.route('/message/:id').patch(patchMessageRequest).delete(deleteMessageRequest);
studentRouter.route('/message').get(viewMessageRequests).post(sendMessageRequest);

studentRouter.route('/book/name/:name').get(getBookByName).delete(deleteBookByName);
studentRouter.route('/book/:id/review').get(getBookReviewsById).post(makeBookReviewById).delete(deleteBookReviewById).patch(patchBookReviewById);
studentRouter.route('/book/:id').get(getBookByID).delete(deleteBookByID).patch(updateBookByID);
studentRouter.route('/book/genre/:genre').get(getBookByGenres);
studentRouter.route('/book').get(getAllBooks).post(addBook) ;

studentRouter.route('/bookRequest/:id').delete(deleteBookIssueRequest).patch(patchBookRequest).get(getWaitingListOfBookRequested);
studentRouter.route('/bookRequest').post(makeBookRequest).get(getWaitingListOfAllBooksRequested);

studentRouter.route('/approvedBook/:id/extension').get(getExtensionStatus).post(makeextensionRequest).delete(deleteExtensionRequest).patch(updateExtensionRequest);
studentRouter.route('/approvedBook/:id').get(getTranasactionDetails).post(returnIssuedBook);

module.exports = studentRouter;
