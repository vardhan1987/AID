const mongoose = require('mongoose');

var CustomerAuthDetails = mongoose.model('CustomerAuthDetails',{
cifid:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
facebookid:{
type : String,
required: true,
trim: true,
minlength: 1
},
twitterid:{
  type : String,
  required: true,
  trim: true,
  minlength: 1
},
amazonid:{
  type : String,
  required: true,
  trim: true,
  minlength: 1
},
googleid:{
  type : String,
  required: true,
  trim: true,
  minlength: 1
},
ques1:{
type : String,
required: true,
trim: true,
minlength: 1
},
ques2:{
type : String,
required: true,
trim: true,
minlength: 1
},
ques3:{
type : String,
required: true,
trim: true,
minlength: 1
},
ans1:{
type : String,
required: true,
trim: true,
minlength: 1
},
ans2:{
type : String,
required: true,
trim: true,
minlength: 1
},
ans3:{
type : String,
required: true,
trim: true,
minlength: 1
},
OTPbyemail:{
  type : String,
  required: true,
  trim: true,
  minlength: 1
},
EmailIdForAuth:{
type : String,
required: true,
trim: true,
minlength: 1
},
OTPbySMS:{
  type : String,
  required: true,
  trim: true,
  minlength: 1
},
RegisterMobile:{
  type : Number,
  required: true,
  trim: true,
  minlength: 1
},
otp:{
  type : Number,
  required: true,
  trim: true,
  minlength: 1
}
  });


module.exports= {CustomerAuthDetails};
