import React from 'react'
import { useState } from 'react';
import styles from './../pages/common.module.css'
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const input_div = {
  width:"50%",
  display: "inline-block",
  fontFamily: "Calibri",
  // margin: "1.2% 0% 1.2% 0%",
  margin: "1.2% 0% 1.2% 0%",
}

const h3_color = {
  color:"#93039D",
}

const text_field = {
  width: "80%",
  backgroundColor:  "#eeeeee",
  opacity: "100%",
  borderRadius: "3%",
  border: "1px solid var(--unnamed-color-707070)",
  background: "#f0efef 0% 0% no-repeat padding-box",
  boxShadow: "0px 4px 8px #00000038",
  /* border: 1px solid #707070; */
  borderRadius: "5px",
  opacity: "1",
}

const Text_input = (props) => {

    // const [value, setValue] = useState('');

    const handleChange = (event) => {
        if(props.item.disabled)
            return;
        props.item.enteredValue=event.target.value;
        let temp = [...props.values];
        temp[props.item.id]=event.target.value;
        
        // setValue(event.target.value);
        props.setValues(temp);
    };
    


    if(!props.item.select){
        return(
            <div className={styles.input_div}>
                <h3 style={h3_color}> {props.item.field}  :</h3>
                <TextField
                    required
                    // style={{ width: '90%', height: '50%', backgroundColor:'#DBDBDB', border:'1px solid black' }}
                    className={styles.text_field}
                    onChange={handleChange}
                    id="outlined"
                    size='small'
                    value={props.values[props.item.id]}
                    placeholder={props.item.placeholder}
                    color='secondary'
                    type={props.item.type}
                    variant="outlined"
                ></TextField>
            </div>
        )
    }

    else{
        return (
            <div className={styles.input_div}>
                <h3 style={h3_color}> {props.item.field}  :</h3>
                <TextField
                    //   required
                    id="outlined-select-currency"
                    select
                    label={props.item.placeholder}
                    onChange={handleChange}
                    className={styles.text_field}
                    // id="outlined-select"
                    size='small'
                    value={props.values[props.item.id]}
                    // helperText={props.item.placeholder}
                    color='secondary'
                    type={props.item.type}
                    // variant="outlined"
                >
                    {props.item.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        )
    }
}

export default Text_input;














/* 
<Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          style ={{width: '45%', height:'50%'}}
          id="outlined-required"
          label="First Name"
          defaultValue="Hello World"
        />
        
        <TextField 
          id="outlined"
          style ={{width: '45%'}} 
          label="Search field" 
          type="search" 
        />
        
        <TextField
          id="outlined-password-input"
          style ={{width: '35%'}}
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
      <div>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        />
      </div>
    </Box>
      
*/