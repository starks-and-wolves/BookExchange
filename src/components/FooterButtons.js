import React from 'react'
import './../pages/common.module.css'
import Button from '@mui/material/Button';


const FooterButtonsStyle = {
  textAlign: "center",
  margin: "10% 0%",

}

const save = {
  /* background-color: #10F800; */
  padding: "auto 2%",
  margin: "0% 5%",
  fontSize:"x-large",
  background: "transparent linear-gradient(180deg, #10F800 0%, #0DC700 100%) 0% 0% no-repeat padding-box",
  font: "normal normal normal 200%/150% Ubuntu",
  width: "15%",
  height: "120%",
  borderRadius: "50px",
  opacity: "1",
}

const back = {
  /* background-color: #10F800; */
  /* padding: auto 2%;
  margin: 0% 5%;
  font-size:x-large; */
  background: "transparent linear-gradient(180deg, #55BAFE 0%, #0A83D3 100%) 0% 0% no-repeat padding-box",
  font: "normal normal normal 35px/47px Ubuntu",
  width: "15%",
  height: "60px",
  borderRadius: "50px",
}

const next = {
  /* background-color: #10F800; */
  /* padding: auto 2%;
  margin: 0% 5%;
  font-size:x-large; */
  background: "transparent linear-gradient(180deg, #55BAFE 0%, #0A83D3 100%) 0% 0% no-repeat padding-box",
  font: "normal normal normal 35px/47px Ubuntu",
  width: "15%",
  height: "60px",
  borderRadius: "50px",
}



const FooterButtons = (props) => {
  return (
    <div style={FooterButtonsStyle} onClick={props.onSave}>
        <Button style={back} variant="contained" color='primary'>Back</Button>
        <Button style={save} variant="contained" color='success' size='LARGE'>Save</Button>
        <Button style={next} variant="contained">Next</Button>
    </div>
  )
}

export default FooterButtons;