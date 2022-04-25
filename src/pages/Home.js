import React from "react";

export default function home() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/*--======== CSS ======== */}
      <link rel="stylesheet" href="style.css" />
      {/*--===== Iconscout CSS ===== */}
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
      />
      <title>Responsive Regisration Form </title>
      <div className="container">
        <header>Registration</header>
        <form action="#">
          <div className="form first">
            <div className="details personal">
              <span className="title">Personal Details</span>
              <div className="fields">
                <div className="input-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="Enter birth date"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Mobile Number</label>
                  <input
                    type="number"
                    placeholder="Enter mobile number"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Gender</label>
                  <select required="">
                    <option disabled="" selected="">
                      Select gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="input-field">
                  <label>Occupation</label>
                  <input
                    type="text"
                    placeholder="Enter your ccupation"
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="details ID">
              <span className="title">Identity Details</span>
              <div className="fields">
                <div className="input-field">
                  <label>ID Type</label>
                  <input type="text" placeholder="Enter ID type" required="" />
                </div>
                <div className="input-field">
                  <label>ID Number</label>
                  <input
                    type="number"
                    placeholder="Enter ID number"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Issued Authority</label>
                  <input
                    type="text"
                    placeholder="Enter issued authority"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Issued State</label>
                  <input
                    type="text"
                    placeholder="Enter issued state"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Issued Date</label>
                  <input
                    type="date"
                    placeholder="Enter your issued date"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    placeholder="Enter expiry date"
                    required=""
                  />
                </div>
              </div>
              <button className="nextBtn">
                <span className="btnText">Next</span>
                <i className="uil uil-navigator" />
              </button>
            </div>
          </div>
          <div className="form second">
            <div className="details address">
              <span className="title">Address Details</span>
              <div className="fields">
                <div className="input-field">
                  <label>Address Type</label>
                  <input
                    type="text"
                    placeholder="Permanent or Temporary"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Nationality</label>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>District</label>
                  <input
                    type="text"
                    placeholder="Enter your district"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Block Number</label>
                  <input
                    type="number"
                    placeholder="Enter block number"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Ward Number</label>
                  <input
                    type="number"
                    placeholder="Enter ward number"
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="details family">
              <span className="title">Family Details</span>
              <div className="fields">
                <div className="input-field">
                  <label>Father Name</label>
                  <input
                    type="text"
                    placeholder="Enter father name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Mother Name</label>
                  <input
                    type="text"
                    placeholder="Enter mother name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Grandfather</label>
                  <input
                    type="text"
                    placeholder="Enter grandfther name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Spouse Name</label>
                  <input
                    type="text"
                    placeholder="Enter spouse name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Father in Law</label>
                  <input
                    type="text"
                    placeholder="Father in law name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Mother in Law</label>
                  <input
                    type="text"
                    placeholder="Mother in law name"
                    required=""
                  />
                </div>
              </div>
              <div className="buttons">
                <div className="backBtn">
                  <i className="uil uil-navigator" />
                  <span className="btnText">Back</span>
                </div>
                <button className="sumbit">
                  <span className="btnText">Submit</span>
                  <i className="uil uil-navigator" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/**/}
    </>
  );
}