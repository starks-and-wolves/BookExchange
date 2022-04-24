// import React from 'react'

// export default function addBook() {
//   return (
//     <div>addBook</div>
//   )
// }

import React, { Component } from 'react';
import Basic from './basic'
import store from './store'
import {Provider} from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container" style={{marginBottom: 100}}>
          <Basic />
        </div>
      </Provider>
    );
  }
}

export default App;



// import Navbar from "./Navbar"
// import Button from '@mui/material/Button'
// import FooterButtons from "../Components/FooterButtons"
// import { TextField } from '@mui/material';
// // import Text_input from "../Components/Text_input";


// const text_field = {
//   width: "60%",
//   // marginLeft: "2%",
//   backgroundColor: "#eeeeee",
//   opacity: "100%",
//   borderRadius: "3%",
//   border: "1px solid var(--unnamed-color-707070)",
//   background: "#f0efef 0% 0% no-repeat padding-box",
//   boxShadow: "0px 4px 8px #00000038",
//   /* border: 1px solid #707070; */
//   borderRadius: "5px",
//   opacity: "1",
// }

// const PatientsForm = () => {

//   const handle_save = () => {
//     console.log('save clicked');
//   }
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div style={{ width: "70%", margin: "0% 15%" }}>

//         <h2 style={{paddingTop: "50px"}}>Comorbodities</h2>
//         <p>If you have any of the following conditions please select them</p>
//         <form action="#">
//           <div className="patient-container">
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Hypertension</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Diabetes Mellitus</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Heart Failure/Arrhythmias/Coronary Artery Disease(Heart Attack)</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Stroke/Paralysis</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Chronic Kidney Disease</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Chronic Obstructive Pulmonary Disease</span>
//               </label>
//             </p><p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Chronic liver Disease</span>
//               </label>
//             </p><p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Thyroid Issues</span>
//               </label>
//             </p><p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Others(Please Specify)</span>
//               </label>
//             </p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={{ ...text_field, ...{ marginLeft: "2%" } }} size="small"  type={''} color='secondary'  placeholder="PLease specify about your comorbodities" />
//               <label htmlFor="comorbodities"></label>
//             </div>
//             <h2>Drug Allergies</h2>
//             <p style={{font: "normal normal normal 25px/35px Calibri"}}>Please indicate any known/possible drug allergies:</p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={text_field} size="small" id="drug allergies" type="text" className="validate" placeholder="Type your drug allergy here if any"/>
//               <label htmlFor="drug allergies"></label>
//             </div>
//             <h2>Reproductive History</h2>
//             Please provide accurate details of your reproductive history by filing the details that apply.

//             <p>Frequency of mentruation(if applicable):</p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={text_field} size="small" id="drug allergies" type="text" className="validate" placeholder="enter the frequency of menstruation"/>
//               <label htmlFor="drug allergies"></label>
//             </div>
//             <p>Age at menarche(start of period):</p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={text_field} size="small" id="menarche" type="text" className="validate" placeholder="Enter the age when your period starts"/>
//               <label htmlFor="menarche"></label>
//             </div>
//             <p>Age at Menopause(end of period):</p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={text_field} size="small" id="menopause" type="text" className="validate" placeholder="Enter the age your period ended"/>
//               <label htmlFor="menopause"></label>
//             </div>
//             <p>Age at first full term pregnancy:</p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={text_field} size="small" id="menopause" type="text" className="validate" placeholder="enter the age when you are full term pregnant for the first time"/>
//               <label htmlFor="menopause"></label>
//             </div>
//             <p>Number of Children:</p>
//             <div className="input-field col s6">
//               <i className="material-icons prefix"></i>
//               <TextField style={text_field} size="small" id="menopause" type="text" className="validate" placeholder="enter the number of children you have "/>
//               <label htmlFor="menopause"></label>
//             </div>
//             <h2>Lacation History</h2>
//             <p>I breastfed my children for:</p>

//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Not applicable</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>Did not breastfed</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>0 to 3 months</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>3 to 6 months</span>
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>6 to 12 months</span>
//               </label>
//             </p> <p>
//               <label>
//                 <input type="checkbox" />
//                 <span>12 months and beyond</span>
//               </label>
//             </p>
//             <h2>Hormonal Contraceptive Use</h2>
//             <p>Have you ever used hormonal contraceptive?</p>
//             <label>
//               <input type="radio" name="group15"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group15"></input>
//               <span>No</span>
//             </label>

//             <h2>Past medical History</h2>
//             <p>Do you have any previous history of cancer?</p>
//             <label>
//               <input type="radio" name="group1"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group1"></input>
//               <span>No</span>
//             </label>
//             <p>Do yu have any previous history of radiation?</p>
//             <label>
//               <input type="radio" name="group16"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group16"></input>
//               <span>No</span>
//             </label>
//             <p>Have you had any major surgeries in the past?</p>
//             <label>
//               <input type="radio" name="group17"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group17"></input>
//               <span>No</span>
//             </label>
//             <h2>Family cancer history</h2>

//             <h2>LifeStyle Habits</h2>
//             <p>Do you smoke?</p>
//             <label>
//               <input type="radio" name="group18"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group18"></input>
//               <span>No</span>
//             </label>
//             <p>Do youchew tobocco?</p>
//             <label>
//               <input type="radio" name="group19"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group19"></input>
//               <span>No</span>
//             </label>
//             <p>Do you consume alcohol?</p>
//             <label>
//               <input type="radio" name="group20"></input>
//               <span>Yes</span>
//             </label>
//             <label>
//               <input type="radio" name="group20"></input>
//               <span>No</span>
//             </label>

//             <p></p>

//             <FooterButtons onSave={handle_save} />
//           </div>

//         </form>
//       </div>
//     </>
//   )
// }
// export default PatientsForm



// import React from 'react'
// import { useState } from 'react';
// // import './common.module.css';
// import Text_input from '../Components/Text_input';
// import FooterButtons from '../Components/FooterButtons';
// import { BasicDetailsList, ContactDetailsList, HealthDetailsList } from '../Components/fieldList';
// import Navbar from './Navbar';

// const  addBook = () => {

//     const [basicDetailsFields, setBasicDetailsFields] = useState(new Array(BasicDetailsList.length).fill(''));
//     const [contactDetailsFields, setContactDetailsFields] = useState(new Array(ContactDetailsList.length).fill(''));
//     const [healthDetailsFields, setHealthDetailsFields] = useState(new Array(HealthDetailsList.length).fill(''));
    
//     // console.log(basicDetailsFields);
//     const handle_save = () => {
//         console.log('Basic Details');
//         console.log(basicDetailsFields);
//         console.log('Contact Details');
//         console.log(contactDetailsFields);
//         console.log('Health Details');
//         console.log(healthDetailsFields);
//     }

//     React.useEffect(() => {
//         let interval = null;
//         if (healthDetailsFields[1]!=='' && healthDetailsFields[3]!=='') {
//             interval = setInterval(() => {
//                 let temp = [...healthDetailsFields];
//                 temp[4] = temp[1]/(temp[3]*temp[3]);
//                 setHealthDetailsFields(temp);
//             }, 1000);
//         }
//         return () => {
//             clearInterval(interval);
//         };
//     }, [healthDetailsFields]);

//     return (
//         <>
//         <Navbar/>
//         <div style={{width: "70%", margin: "0% 15%",}}>
//             <h2 style={{paddingTop: "50px"}}>Basic Details</h2>
//             {BasicDetailsList.map((item) => (
//                 <Text_input key={item.id} item={item} values={basicDetailsFields} setValues={setBasicDetailsFields}/>
//             ))}

//             <h2 style={{paddingTop: "50px"}}>Contact Details</h2>
//             {ContactDetailsList.map((item) => (
//                 <Text_input key={item.id} item={item} values={contactDetailsFields} setValues={setContactDetailsFields}/>
//             ))}

//             <h2 style={{paddingTop: "50px"}}>Health Details</h2>
//             {HealthDetailsList.map((item) => (
//                 <Text_input key={item.id} item={item} values={healthDetailsFields} setValues={setHealthDetailsFields}/>
//             ))}

//             <FooterButtons onSave={handle_save} />

//         </div>
//         </>
//     )
// }

// export default addBook;