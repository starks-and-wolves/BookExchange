const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("../models/connection");
app.listen("8080");
app.use(cookieParser());
app.use(express.json());

const studentRouter = express.Router();
app.use("/student", studentRouter);

const Authenticate = require("../middlewares/Authenticate");

const {
  getAllBooks,
  addBook,
  updateBookByID,
  deleteBookByName,
  deleteBookByID,
  getBookByName,
  getBookByID,
  getBookByGenres,
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
  deleteAccount,
  approveBookRequest,
  getUser,
} = require("../controllers/studentControllers");

const {
  forgotPassword,
  loginUser,
  SignUp,
  resetPassword,
  protectRoute,
  logout,
} = require("../controllers/authControllers");

const { append } = require("express/lib/response");

//Tested -> Signup, loginUser, logout, addBook, getAllBooks, getBookByID, getBookByGenres,

// user options
studentRouter.route("/signup").post(SignUp);
studentRouter.route("/loginUser").post(loginUser);
studentRouter.route("/forgotPassword").get(forgotPassword);
studentRouter.route("/logout").get(logout);
studentRouter.route("/resetPassword").post(resetPassword);

// studentRouter.use(protectRoute);

//Protected Routes
studentRouter.route("/user/:id").get(Authenticate, getUser);
studentRouter
  .route("/message/:id")
  .patch(patchMessageRequest)
  .delete(deleteMessageRequest);
studentRouter
  .route("/message")
  .get(viewMessageRequests)
  .post(sendMessageRequest);

studentRouter
  .route("/book/name/:name")
  .get(getBookByName)
  .delete(deleteBookByName);
studentRouter
  .route("/book/:id/review")
  .get(getBookReviewsById)
  .post(makeBookReviewById)
  .delete(deleteBookReviewById)
  .patch(patchBookReviewById);
studentRouter
  .route("/book/:id")
  .get(getBookByID)
  .delete(deleteBookByID)
  .patch(updateBookByID);
studentRouter.route("/book/genre/:genre").get(getBookByGenres);
studentRouter.route("/user").get(Authenticate, getUser);
studentRouter.route("/book").get(getAllBooks).post(Authenticate, addBook);

studentRouter
  .route("/bookRequest/:id")
  .delete(deleteBookIssueRequest)
  .patch(patchBookRequest);
studentRouter.route("/bookRequest").post(makeBookRequest);

studentRouter.route("/approveBookRequest").post(approveBookRequest);
// studentRouter.route("/wallet/:id").get(viewWallet);
// studentRouter.route("/wallet/addMoney").patch(addMoney);
// studentRouter.route("/wallet/payPenalty").post(payPenalty);

studentRouter
  .route("/approvedBook/extension")
  .get(getExtensionStatus)
  .post(makeextensionRequest)
  .delete(deleteExtensionRequest)
  .patch(updateExtensionRequest);
studentRouter.route("/approvedBook/:id").get(getTranasactionDetails);
studentRouter.route("/returnBook").post(returnIssuedBook);

module.exports = studentRouter;

/*
make users*
add books*
make message req*
approve msg req*
return book*
ask for ext*
app ext req
view appr deadlines for return
view appr deadlines for receiving books
pay penalty
add moni to wallet


*/
