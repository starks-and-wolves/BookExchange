import React from 'react'

function addBook() {
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
          <h3>Hey there</h3>
          <p>Make your contibution to our little book world</p>
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
              <h3 className="register-heading">Add Book</h3>
              <div className="row register-form">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Book Name *"
                      // defaultValue
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Author Name *"
                      // defaultValue
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ISBN"
                      // defaultValue
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Book Edition"
                      // defaultValue
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Year of Publishing*"
                      // defaultValue
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Publisher"
                      // defaultValue
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Genre*"
                      // defaultValue
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter a review"
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
  )
}

export default addBook