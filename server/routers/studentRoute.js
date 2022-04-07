const express = require('express');

const app = express();

app.listen('3000');

app.use(express.json());

const studentRouter  = express.Router();
app.use('/student',studentRouter);

const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    OTPauth,
    protectRoute,
    viewAllBooks,
    addBook,
    deleteBookByName,
    deleteBookByID,
    getBookByName,
    getBookByID,
    getBookByGenres,
    getWaitingListOfAllBooksRequested,
    getWaitingListOfBookRequested,
    getReceiveBookDates,
    getReturnBookDates,
    viewMessageRequests,
    sendMessageRequest,
    makeextensionRequest,
    makeBookRequest,
    deleteBookIssueRequest,
    returnIssuedBook,
    makeBookReview,
    deleteAccount
} = require("../controllers/studentControllers");

const {
    

} = require("../controllers/authControllers");

const { append } = require("express/lib/response");

studentRouter.route("/signup").post(signup);

studentRouter.route("/login").post(login);

studentRouter.route("/logout").get(logout);

studentRouter.use(protectRoute);

studentRouter.route('/:id').get(getDoctorByID).delete(deleteDoctor).patch(updateDoctor);
studentRouter.route('/doctor').get(getAllDoctors).post(createDoctor) ;

studentRouter.route('/validator/:id').get(getValidator).delete(deleteValidator).patch(updateValidator);
studentRouter.route('/validator').post(createValidator).get(getAllValidators);

module.exports = studentRouter;
