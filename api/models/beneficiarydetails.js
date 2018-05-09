var mongoose = require('mongoose');

//var User = mongoose.model('beneficiarydetails',{

  var beneficiaryDetails = mongoose.model('beneficiarydetails',{

    BeneficiaryName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
  },
  SecondNameBeneficiary:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
  MobileNumber:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
  EmailId:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
  NickName:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
  BeneficiaryAccount:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
  BeneficiaryAddress:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
  BenifiaryBankName:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
  BankAddress:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
  SWIFTCode:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
  BenificiaryCountry:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
BenificiaryCif :{
type: Number,
required: true,
trim: true,
minlength: 1
},
SourceCif :{
type: Number,
required: true,
trim: true,
minlength: 1
}

});


module.exports= {beneficiaryDetails};
