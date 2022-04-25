import React from 'react'

export default function extensionRequest() {
  return (
    <div>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      {/*---- Include the above in your HEAD tag --------*/}
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt /> */}
            <h3>Hey there!!</h3>
            <br />
            <h4> Still reading that book? Unable to finish? Don't worry, ask for an extension :)) </h4>
            <input type="submit" name defaultValue="Login" />
            <br />
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Make an extension Request</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select className="form-control">
                        <option className="hidden" selected disabled>
                          Choose Book you wish to ask extension for
                        </option>
                        <option>What is your Birthdate?</option>
                        <option>What is Your old Phone Number</option>
                        <option>What is your Pet Name?</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave a message for the book owner"
                        // defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="No of Days"
                        min="1" max="15"
                        // defaultValue
                      />
                    </div>
                    <input
                      type="submit"
                      className="btnRegister"
                      defaultValue="Register"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
