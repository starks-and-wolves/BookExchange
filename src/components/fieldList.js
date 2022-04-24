import { useState } from "react";

// let BasicDetailsValues = Array.from(''.repeat(6));

let BasicDetailsList = [
    {
        id:'',
        field: 'First Name',
        placeholder: 'Enter your first name here',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Last Name',
        placeholder: 'Enter your last name here',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Date of Birth',
        placeholder: 'Enter your date of birth here',
        options:'',
        type:'date',
        select: false,
        enteredValue: '',
    },
    {
        id:'',
        field: 'Gender',
        placeholder: 'Enter your gender here',
        // options:['Male', 'Female', 'Others'],
        options:[{value:'M', label:'Male'},{value:'F', label:'Female'},{value:'O', label:'Others'}],
        select: true,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Race',
        placeholder: 'Enter your race here',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Occupation',
        placeholder: 'Enter your occupation here',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    }
];

let ContactDetailsList = [
    {
        id:'',
        field: 'Contact Number',
        placeholder: 'Enter your phone/mobile number here',
        options:'',
        select: false,
        type:'number',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Email Address',
        placeholder: 'Enter your email ID here',
        options:'',
        select: false,
        type:'email',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Address',
        placeholder: 'Enter your address here',
        options:'',
        type:'',
        select: false,
        enteredValue: '',
    },
    {
        id:'',
        field: 'City',
        placeholder: 'Enter your city name here',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
]

let HealthDetailsList = [
    { 
        id:'',
        field: 'Height unit',
        placeholder: 'Please Select any one unit',
        options:[{value:'m', label:'metres(m)'}, {value:'in', label:'Inches(in)'},{value:'ft', label:'Feet(ft)'}],
        // options: ['Kilogram(Kg)', 'Pounds(lbs)'],
        select: true,
        type:'',
        enteredValue: '',
    },
    { 
        id:'',
        field: 'Height',
        placeholder: 'Enter your height here',
        options:'',
        select: false,
        type:'number',
        enteredValue: '',
    },
    { 
        id:'',
        field: 'Weight unit',
        placeholder: 'Please Select any one unit',
        options:[{value:'kg', label:'Kilogram(kg)'}, {value:'Lbs', label:'Pounds(lbs)'}],
        // options: ['Kilogram(Kg)', 'Pounds(lbs)'],
        select: true,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Weight',
        placeholder: 'Enter your weight here',
        options:'',
        select: false,
        type:'number',
        enteredValue: '',
    },
    {
        id:'',
        field: 'BMI',
        placeholder: '',
        options:'',
        type:'',
        select: false,
        enteredValue: '',
        disabled: true,
    },
    {
        id:'',
        field: 'BSA',
        placeholder: '',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Emergency Contact Name',
        placeholder: 'Name the person to contact in case of emergency',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Emergency Contact Number',
        placeholder: 'Phone/Mobile No. in case of emergency',
        options:'',
        select: false,
        type:'number',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Oncologists Name',
        placeholder: 'Name of oncologist who is treating you',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Primary Hospital',
        placeholder: 'Name of primary hospital/clinic/care cantre',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
    {
        id:'',
        field: 'Referred by',
        placeholder: 'Enter the name/place where you got the referal',
        options:'',
        select: false,
        type:'',
        enteredValue: '',
    },
   
]




let i = 0;
BasicDetailsList.forEach(element => {
    element.id = i++; 
});
let j = 0;
ContactDetailsList.forEach(element => {
    element.id = j++; 
});
let k = 0;
HealthDetailsList.forEach(element => {
    element.id = k++; 
});
export {BasicDetailsList, ContactDetailsList, HealthDetailsList};