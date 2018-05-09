const mongoose = require('mongoose');

var CustomerAccDetails = mongoose.model('CustomerAccDetails',{
cifid:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
salutation:{
type : String,
required: true,
trim: true,
minlength: 1
},
civil_ID:{
type : String,
required: true,
trim: true,
minlength: 1
},
customer_Name:{
type : String,
required: true,
trim: true,
minlength: 1
},
accounts: {
  type : Number,
  required: true,
  trim: true,
  minlength: 1
},
accountname:{
type : String,
required: true,
trim: true,
minlength: 1
},
accountcurrency:{
type : String,
required: true,
trim: true,
minlength: 1
},
accounttype:{
  type : String,
  required: true,
  trim: true,
  minlength: 1
  },
productcode:{
      type : String,
      required: true,
      trim: true,
      minlength: 1
  },
    AccoutBal:{
     type : Number,
     required: true,
     trim: true,
     minlength: 1
 },
userid :{
  type : Number,
  required: true,
  trim: true,
  minlength: 1
},
usertwitterid:
{
  type : String,
  required: true,
  trim: true,
  minlength: 1
}


      });
module.exports= {CustomerAccDetails};
