'use strict';

const date = new Date().getHours();
var random = require('random-number-generator')


var mongoose = require('mongoose'),
blacklistcheck = mongoose.model('blacklist'),
audit = mongoose.model('audit'),
ciservice = mongoose.model('ciservice'),
channel = mongoose.model('channel');

var {CustomerAccDetails} = require('../models/customer_Acc');
var {CustomerAuthDetails} = require('../models/Customer_auth');

exports.handleintents = function(req, resp) {
  console.log("Process Intent Start");
  console.log(req.body);
      var request = req;

      console.log("request>>>>>",request);
console.log("Reques.context>>>>>",request.body.input.context);
console.log("Reques.request>>>>>",request.body.input.request);

      request.body.input.sessionAttributes = request.body.input.sessionAttributes === null ? {} : request.body.input.sessionAttributes;

      request.body.input.sessionAttributes= {cifidd :123450};
      request.body.input.sessionAttributes.userFirstName="Aditya";
     console.log(typeof(request.body.input.sessionAttributes));
     console.log(typeof(request.body.input.requestAttributes));
     request.body.input.sessionAttributes.custuserid=2157056904312201;
     request.body.input.sessionAttributes.otp=111111;
     // request.body.input.sessionAttributes= {cifidd :123452};
     // request.body.input.sessionAttributes.userFirstName="Anitha";

request.body.input.requestAttributes= {channelName :"twitter"};
request.body.input.requestAttributes.auditid="5acaf13f9628f025a81de981";

//event.session.attributes = {auditid : '123', channelid : 'Alexa'};

   console.log(request.body.input.sessionAttributes.userFirstName);

     // request.sessionAttributes.custuserid=request.body.input.userId;
     //

//    var custuserid1=request.body.input.sessionAttributes.custuserid;

      console.log(typeof(JSON.stringify(req.body.input)));
/////
var input = request.body.input;

function intentNamefuntion(a) {
  if (typeof(a.body) === "string") {
console.log("Inside IF");
    console.log("JSON.parse(a.body) >>>>>>",JSON.parse(a.body));
    var bodydata = JSON.parse(a.body);
    console.log(bodydata.result.metadata.intentName);
    var bodyintent=bodydata.result.metadata.intentName;
    var intentName = bodyintent;
    return intentName;
  } else if (request.body.input.request!== undefined)  {
    console.log("Inside else IF");
        console.log("Reques.request>>>>>",request.body.input.request.intent.name);
        var intentName=request.body.input.request.intent.name;
        return (intentName);
  } else  {
      var intentName = request.body.input.currentIntent.name;
      return (intentName);
  }
}

console.log(intentNamefuntion(input));

var intentName =intentNamefuntion(input);
//var requestAttributes =intentNamefuntion(input);
///

      //var intentName = request.body.input.currentIntent.name;
      console.log(`You Intent is :${intentName}`);
      var input = request.body.input;
      console.log("input :>>>>>>>",input);
      var requestAttributes = request.body.input.requestAttributes;
      console.log("requestAttributes :>>>>>>>",requestAttributes);

      var auditid = request.body.input.requestAttributes.auditid;
      var auditModel;
      audit.find({_id : auditid},function(err,data){
          auditModel = data[0];
        switch (intentName) {
          //// required

            case 'GreetIntent':
                console.log('Entered GreetIntent Execution Block');
                handleGreetIntent(request, resp,auditModel);
                break;

          case 'LambdaNew':
                    console.log('Entered GreetIntent Execution Block');
                    handleLambdaNewIntent(request, resp,auditModel);
                    break;


            case 'CustACCIntent':
                console.log('Entered CustACCIntent Execution Block');
                handleCustACCIntent(request, callback);
                break;

            case 'CustAuthIntent':
                console.log('Entered CustAuthIntent Execution Block');
                handleCustAuthIntent(request, callback);
                break;

            case 'getotp':
                console.log('Entered GetCustAuthIntent Execution Block');
                handleGetCustAuthIntent(request, resp,auditModel);
                break;

            case 'genotp':
                console.log('Entered GetCustAuthIntent Execution Block');
                handlegenotpIntent(request, resp,auditModel);
                break;

            case 'GetBalIntentnew':
                console.log('Entered GetBalIntent Execution Block');
                handleGetBalIntent(request, resp,auditModel);
                break;

            case 'getCustAccIntentnew':
                console.log('Entered getCustAccIntent Execution Block');
                handlegetCustAccIntent(request, resp,auditModel);
                break;

            case 'disconnectIntentnew':
                console.log('Entered disconnectIntent Execution Block');
                handledisconnectIntent(request, callback);
                break;


        /////////Not required



            case 'GetCustAuthIntentnew':
                console.log('Entered GetCustAuthIntent Execution Block');
                handleGetCustAuthIntent(request, callback);
                break;

        ///////////////


            default:
                handleDefault(request, callback);
                break;
        }


      })
      console.log("auditid :>>>>>>>",auditid);



      // callback(null, 'Hello from Lambda');
  };


  ////////////////

//////////////

function handleGreetIntent(request, resp,auditModel) {
      console.log('Start handleGreetIntent');
console.log("request>>>>>",request);
      var msg1 = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
      console.log('connect to Mongo Db server');
// console.log(typeof(request.body.input.sessionAttributes));
// console.log(typeof(request.body.input.requestAttributes));
    //  console.log('Token:', PAGE_ACCESS_TOKEN);
    //  https.get('https://graph.facebook.com/v2.6/' + request.userId + '?fields=first_name,last_name&access_token=' + PAGE_ACCESS_TOKEN,


        //  (res) => {
              // console.log('res:', res);
              // console.log('headers:', res.headers);
              // res.on('data', (d) => {
              //     console.log(d);
                //   request.body.input.sessionAttributes.userFirstName = JSON.parse(d).first_name;
                 //   request.body.input.sessionAttributes= {userFirstName :"Aditya"};
                 //
                 //  console.log(typeof(request.body.input.sessionAttributes));
                 //  console.log(typeof(request.body.input.requestAttributes));
                 // console.log(request.body.input.sessionAttributes.userFirstName);
                 //  request.body.input.sessionAttributes.custuserid=2157056904312202;
                 //
                 //   // request.sessionAttributes.custuserid=request.body.input.userId;
                 //   //
                 //
                   var custuserid1=request.body.input.sessionAttributes.custuserid;
                  //console.log(`sessionAttributes:${request.body.input.sessionAttributes.userFirstName}`);

                //  console.log(`sessionAttributes:${request.sessionAttributes.custuserid}`);
                  console.log(custuserid1);

      CustomerAccDetails.find({
          userid:custuserid1
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
              console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
              var userFirstName = request.body.input.sessionAttributes.userFirstName;
              //var userFirstName = "Aditya";

              console.log(`userFirstName:${userFirstName}`);

              if (docs.length === 0) {
                ////////////////
                console.log("Inside if block");
                var val = `Hi ${userFirstName},${msg1}, I see that you are not registered as a Diana customer. to validate Facebook Banking registeration details please type Register or Reg.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

                /////////////////

              } else {
                var cifofuser = `${docs[0].cifid}`;
                console.log(docs);
                // request.sessionAttributes.cifidd = `${cifofuser}`;
                 var nameofuser = `${docs[0].customer_Name}`;
                 request.body.input.sessionAttributes.cifidd=`${cifofuser}`;
                // request.sessionAttributes.coreusername = `${nameofuser}`;
                request.body.input.sessionAttributes.coreusername=`${nameofuser}`;

                // console.log(request.sessionAttributes.coreusername);

                ///////////
                console.log("Inside else block");
                var val = `Hi ${request.body.input.sessionAttributes.coreusername} ,${msg1} You are already registered for facebook banking.I am here to help you on your Accounts services and other Banking information from ABC Bank.Please type in the following for me to understand the nature of your query. Type Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);
////////////////
                                      }},
                                      (e) => {
                                        ///////////
                                        console.log("Inside error block");
                                        var val = `Something went wrong `
                                        var responeData = {"callbackMessage": val};
                                        auditModel.responseData =responeData;
                                        console.log("auditModel>>",auditModel);
                                        saveAudit(request,auditModel);
                                        resp.json(responeData);

                                      });
                               //});
      //
      //     }).on('error', (e) => {
      //     console.error(e);
      // });


}

////////
///////////
function handleLambdaNewIntent(request, resp,auditModel) {
      console.log('Start handleLambdaNewIntent');
      console.log("request.body>>>>>>>>>",request.body);
      var auditid = request.body.input.requestAttributes.auditid;
console.log(`request ${auditid}`);
var val = `HI This is response from handleLambdaNewIntent server`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);

}



function saveAudit(request,auditModel){
  console.log(" start saving data");
  var auditid = request.body.input.requestAttributes.auditid;
  auditModel.requestData=request.body;
  auditModel.ciserviceName="Lex";
  auditModel.userName = request.body.input.userId;
  auditModel.lastUpdatedDate = new Date();

  audit.update({_id : auditid}, {$set:auditModel},  {upsert: true}, function(err,task){
    if (err){
      console.log('Could not update channel req count'+ err);
    }
})
}


//////////

  //////////handleCust_ACC_Intent
  function handleCustACCIntent(request, callback) {
      console.log('Start CustACCIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var msg = `Your Registration has been added successfully`;
      console.log('connect to Mongo Db server');
      var Customeraccdetails = new CustomerAccDetails({
          cifid: `${request.currentIntent.slots.cifid}`,
          salutation: `${request.currentIntent.slots.salutation}`,
          civil_ID: `${request.currentIntent.slots.civil_ID}`,
          customer_Name: `${request.currentIntent.slots.customer_Name}`,
          accounts: `${request.currentIntent.slots.accounts}`,
          accountname: `${request.currentIntent.slots.accountname}`,
          accountcurrency: `${request.currentIntent.slots.accountcurrency}`,
          accounttype: `${request.currentIntent.slots.accounttype}`,
          productcode: `${request.currentIntent.slots.productcode}`,
          AccoutBal: `${request.currentIntent.slots.AccoutBal}`,
          userid: `${request.currentIntent.slots.userid}`

      });
      Customeraccdetails.save().then((doc) => {
          console.log('Data got saved into the database');
          console.log(JSON.stringify(Customeraccdetails, undefined, 2));
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          console.log(`Response :${JSON.stringify(response)}`);
          console.log(`callback start`);
          callback(null, close(sessionAttributes, 'Fulfilled', response));
          console.log(`callback end`);

      }, (e) => {
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          callback(null, close(sessionAttributes, 'Fulfilled', response));
      });

  }


  ///////////
  //////////handleCust_Auth_Intent
  function handleCustAuthIntent(request, callback) {
      console.log('Start CustAuthIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);

      var msg = `Your Cust_Auth has been added successfully`;
      console.log('connect to Mongo Db server');
      var Customerauthdetails = new CustomerAuthDetails({
          cifid: `${request.currentIntent.slots.cifid}`,
          facebookid: `${request.currentIntent.slots.facebookid}`,
          twitterid: `${request.currentIntent.slots.twitterid}`,
          amazonid: `${request.currentIntent.slots.amazonid}`,
          googleid: `${request.currentIntent.slots.googleid}`,
          ques1: `${request.currentIntent.slots.ques1}`,
          ques2: `${request.currentIntent.slots.ques2}`,
          ques3: `${request.currentIntent.slots.ques3}`,
          ans1: `${request.currentIntent.slots.ans1}`,
          ans2: `${request.currentIntent.slots.ans2}`,
          ans3: `${request.currentIntent.slots.ans3}`,
          OTPbyemail: `${request.currentIntent.slots.OTPbyemail}`,
          EmailIdForAuth: `${request.currentIntent.slots.EmailIdForAuth}`,
          OTPbySMS: `${request.currentIntent.slots.OTPbySMS}`,
          RegisterMobile: `${request.currentIntent.slots.RegisterMobile}`,
          otp: `${request.currentIntent.slots.otp}`
      });

      Customerauthdetails.save().then((doc) => {
          console.log('Data got saved into the database');
          console.log(JSON.stringify(Customerauthdetails, undefined, 2));
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          console.log(`Response :${JSON.stringify(response)}`);

          console.log(`callback start`);
          callback(null, close(sessionAttributes, 'Fulfilled', response));
          console.log(`callback end`);
      }, (e) => {
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          callback(null, close(sessionAttributes, 'Fulfilled', response));
      });
  }
  // // ////////////

  //check cust registration details
  function handlegetCustAccIntent(request, resp,auditModel)  {
      console.log('Start handlegetCustAccIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var msg1 = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
      var msg = `Your Registration has been added successfully`;
      console.log('connect to Mongo Db server');
    //var faceid = `${request.currentIntent.slots.facebookid}`;
  var faceid = `${request.body.input.currentIntent.slots.facebookid}`;
  //var faceid = `abcd@gmail.com`;
      //request.sessionAttributes.fid = faceid;
      //request.sessionAttributes.fbid1 = `${request.currentIntent.slots.facebookid}`;
      request.body.input.sessionAttributes.fbid1 = `${request.body.input.currentIntent.slots.facebookid}`;
      console.log('facebook id is ' + faceid);
//      console.log('Token:', PAGE_ACCESS_TOKEN);
      // https.get('https://graph.facebook.com/v2.6/' + request.userId + '?fields=first_name,last_name&access_token=' + PAGE_ACCESS_TOKEN,
      //
      //
      //     (res) => {
      //         console.log('res:', res);
      //         console.log('headers:', res.headers);
      //         res.on('data', (d) => {
      //             console.log(d);
      //             request.sessionAttributes.userFirstName = JSON.parse(d).first_name;
      //             console.log(`sessionAttributes:${request.sessionAttributes.userFirstName}`);
      //             // use below code to resend the reply
      //             //callSendAPI(messageData);
      //         });
      //
      //     }).on('error', (e) => {
      //     console.error(e);
      // });

      CustomerAuthDetails.find({
          facebookid: faceid
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
              console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
//              var userFirstName = request.sessionAttributes.userFirstName;
              var userFirstName =request.body.input.sessionAttributes.userFirstName;
              console.log(`userFirstName:${userFirstName}`);
              if (docs.length === 0) {
                console.log("Inside if block");
                var val =  `Hi ${userFirstName},${msg1}, I see that you are not registered as a Facebook Chat customer with ABC Bank.For account specific details you need to register for Facebook Banking service – By either visiting you internet Banking page https://s3.amazonaws.com/dianaci/index.html or visiting the nearest Branch.Thank You.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);
              } else {
                var cifofuser = `${docs[0].cifid}`;

                console.log(cifofuser);
                CustomerAccDetails.find({
                    cifid: cifofuser
                }).then((doc) => {
                    console.log('in for balance');
                    var nameofuser = `${doc[0].customer_Name}`;
//                    request.sessionAttribute.coreusername = `${nameofuser}`;
                      request.body.input.sessionAttributes.coreusername = `${nameofuser}`;
                    console.log(request.body.input.sessionAttributes.coreusername);
    },
    (e) => {
      console.log("Inside e block");
      var val =  `Something went wrong `
      var responeData = {"callbackMessage": val};
      auditModel.responseData =responeData;
      console.log("auditModel>>",auditModel);
      saveAudit(request,auditModel);
      resp.json(responeData);
    });
                  console.log(docs);
                  console.log(docs[0].cifid);
                          //console.log(data);
                          var custuserid1=request.body.input.sessionAttributes.custuserid;
                          console.log(custuserid1);
                        // successful response
                        CustomerAccDetails.update({cifid: cifofuser},{userid:custuserid1},{multi:true},(err)=> {
                            if(err) {
                              console.log(err);
                            } else {
                                console.log("updated successfully");
                                console.log("Inside else block");
                                var val =  `Hi ${request.body.input.sessionAttributes.coreusername},${msg1} You are already registered for facebook banking . We have updated your details with diana, I am here to help you on your Accounts services and other Banking information from ABC Bank.Please type in the following for me to understand the nature of your query. Type Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions.`
                                var responeData = {"callbackMessage": val};
                                auditModel.responseData =responeData;
                                console.log("auditModel>>",auditModel);
                                saveAudit(request,auditModel);
                                resp.json(responeData);
                              }
                        })
                    }
          },
          (e) => {

            console.log("Inside if block");
            var val =  `Something went wrong `
            var responeData = {"callbackMessage": val};
            auditModel.responseData =responeData;
            console.log("auditModel>>",auditModel);
            saveAudit(request,auditModel);
            resp.json(responeData);
          });
  }

  //////////

  function handleGetCustAuthIntent(request, resp,auditModel) {
      console.log('Start handleGetCustAuthIntent');
      var cnt = 0;
      var otpGen = request.body.input.sessionAttributes.otp;

      //var faceid = `${request.sessionAttributes.fbid1}`;
      //var faceid = `abcd@gmail.com`;
      //console.log('facebook id is ' + faceid);
      //console.log('facebook id is ' + request.sessionAttributes.fbid1);
      console.log('connect to Mongo Db server for getotp');
     // console.log("slot otp ", request.body.input.currentIntent.slots.otp);
     // var otp11 = `${request.body.input.currentIntent.slots.otp}`;
	 
	//	console.log(request.body.input.intent.slots);
	 
	   //var otp11 = request.body.input.currentIntent?request.body.input.currentIntent.slots.otp:request.body.input.intent.slots.otp.value;
		
		var otp11 = 111111;
		
      console.log(`Slot OTP: ${otp11}`);
      console.log(`Gen OTP:${otpGen}`);
  ////////////

  //var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;

    var cifofuser= 123450 ;
    console.log(cifofuser);
console.log(typeof(parseInt(otp11)));
console.log(typeof(otpGen));
      if (otpGen === parseInt(otp11)) {

          CustomerAuthDetails.find({
              cifid: cifofuser}).then((docs) => {
              console.log('Data got fetched from the database ' + docs.length);
              console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
              if (docs.length !== 0) {
                  cnt = cnt + 1;
                  var cifofuser = `${docs[0].cifid}`;
                  console.log(cifofuser);
                  CustomerAccDetails.find({
                      cifid: cifofuser
                  }).then((doc) => {
                      console.log('in for balance');
                      var nameofuser = `${doc[0].customer_Name}`;
                      var balofuser = `${doc[0].AccoutBal}`;
                      var salofuser = `${doc[0].salutation}`;
                      var accounttype = `${doc[0].accounttype}`;
                      var accountcurrency = `${doc[0].accountcurrency}`
                      var accountNumber = `${doc[0].accounts}`;
                      accountNumber = accountNumber.replace(accountNumber.substring(4, 7), "*****");
                      console.log(balofuser);
                      console.log(`${doc[0].AccountBal}`);
                      if (doc.length === 1) {
                          console.log('got rec' + doc);
                          console.log(balofuser);
                          console.log(`${doc[0].AccountBal}`);
                          //console.log(AccountBal}`;);
/////////

                              console.log("Inside if block");
                              var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.`
                              var responeData = {"callbackMessage": val};
                              auditModel.responseData =responeData;
                              console.log("auditModel>>",auditModel);
                              saveAudit(request,auditModel);
                              resp.json(responeData);
                      } else if (doc.length === 2) {
                          console.log('got rec' + doc);
                          console.log(balofuser);

//////////

                                  console.log("Inside if block");
                                  var val = `Dear ${nameofuser} currently have multiple accounts in ABC Bank, is your enquiry on a specific Account ? or do I read you Balances of all accounts`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);

                      } else {


                        console.log("Inside if block");
                        var val = `Accout balance details are not present`
                        var responeData = {"callbackMessage": val};
                        auditModel.responseData =responeData;
                        console.log("auditModel>>",auditModel);
                        saveAudit(request,auditModel);
                        resp.json(responeData);

                      }
                  }, (e) => {


                    console.log("Inside if block");
                    var val = `Something went wrong in fetching account bal`
                    var responeData = {"callbackMessage": val};
                    auditModel.responseData =responeData;
                    console.log("auditModel>>",auditModel);
                    saveAudit(request,auditModel);
                    resp.json(responeData);
                  })


              } else {
                console.log("Inside if block");
                var val =  `We regret to inform you that Facebook banking details is not available. Thank You.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

              }
          }, (e) => {

            console.log("Inside if block");
            var val = `Something went wrong `
            var responeData = {"callbackMessage": val};
            auditModel.responseData =responeData;
            console.log("auditModel>>",auditModel);
            saveAudit(request,auditModel);
            resp.json(responeData);

          })
      } else {


        console.log("Inside if block");
        var val = `We regret to inform you that the OTP is not correct Thank You. Is there anything else I can help you with? Type Balance for knowing your balance, type Transfers for initiating a transfer or statement for knowing last 5 transactions. `
        var responeData = {"callbackMessage": val};
        auditModel.responseData =responeData;
        console.log("auditModel>>",auditModel);
        saveAudit(request,auditModel);
        resp.json(responeData);

      }
  }


  /////////////

  function handleGetBalIntent(request, resp,auditModel) {
      console.log('Start handleGetBalIntent');
     // console.log(request);
     // var sessionAttributes = request.sessionAttributes;
     // console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      //const slots = request.body.input.currentIntent.slots;
      var cnt = 0;
      console.log('connect to Mongo Db server');
      //var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;
	  var cifofuser= 123450 ;
      //console.log(`inputTranscript:${request.body.input.inputTranscript}`);

      CustomerAuthDetails.find({
          cifid: cifofuser
      }).then((docs) => {
          console.log('Data got fetched from the database ' + docs.length);
          console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));

          if (docs.length !== 0) {

              cnt = cnt + 1;
              var cifofuser = `${docs[0].cifid}`;

              console.log(cifofuser);
              CustomerAccDetails.find({
                  cifid: cifofuser
              }).then((doc) => {
                  console.log('in for balance');
           //       var inputTranscript =request.body.input.inputTranscript;
                 // console.log(inputTranscript);
             //     console.log(`inputTranscript:${request.body.input.inputTranscript}`);

                  var nameofuser = `${doc[0].customer_Name}`;
                  var salofuser = `${doc[0].salutation}`;
                  var accounttype = `${doc[0].accounttype}`;
                  var accounttype2 = `${doc[1].accounttype}`;
                  var accountcurrency = `${doc[0].accountcurrency}`
                  var accountcurrency2 =`${doc[1].accountcurrency}`
                  var balofuser = `${doc[0].AccoutBal}`;
                  var balofuser2 = `${doc[1].AccoutBal}`;
                  var accountNumber = `${doc[0].accounts}`;
                  accountNumber = accountNumber.replace(accountNumber.substring(3, 4), "*****");
                  var accountNumber2 = `${doc[1].accounts}`;
                  accountNumber2 = accountNumber2.replace(accountNumber2.substring(3, 4), "*****");
          //        console.log(balofuser);
          //        console.log(`${doc[0].AccountBal}`);
          //        console.log(inputTranscript);
          //        console.log(accounttype);
          //        console.log(inputTranscript);
              //    if (`${accounttype}` === inputTranscript) {
              //        console.log('got rec' + doc);
              //        console.log(balofuser);
              //        console.log(`${doc[0].AccountBal}`);
              //    /////
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //
              //    } else if (`${accounttype}` === inputTranscript) {
              //        console.log('got rec' + doc);
              //        console.log(balofuser);
              //        console.log(`${doc[0].AccountBal}`);
              //
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else if (`${accounttype2}` == inputTranscript) {
              //        console.log('got rec' + doc);
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else if (`${accounttype2}` == inputTranscript) {
              //        console.log('got rec' + doc);
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else {
                                  console.log("Inside if block");
                                  var val =  `${salofuser} ${nameofuser},Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);

                //  }
              }, (e) => {
                                    console.log("Inside if block");
                                    var val =  `Something went wrong in fetching account bal`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

                                    })
                } else {

                                    console.log("Inside if block");
                                    var val = `Something went wrong Thank You.`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);
          }
      }, (e) => {

                                    console.log("Inside if block");
                                    var val = `Something went wrong `
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

      })
  }


  ///////////

  function handledisconnectIntent(request, callback) {

      console.log('Start handledisconnectIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var cifofuser= `${request.sessionAttributes.cifidd}` ;

      //var faceid = `${request.sessionAttributes.fbid1}`;
      console.log('cifofuser id is ' + cifofuser);

      CustomerAuthDetails.find({
            cifid: cifofuser
      }).then((docs) => {
          console.log('Data got fetched from the database ' + docs.length);
          console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
          if (docs.length !== 0) {
              var cifofuser = `${docs[0].cifid}`;
              console.log(cifofuser);
              CustomerAccDetails.find({
                  cifid: cifofuser
              }).then((doc) => {
                  console.log('in for details');
                  if (doc.length !== 0) {
                      console.log('got rec' + doc);
                      var nameofuser = `${doc[0].customer_Name}`;
                      var salofuser = `${doc[0].salutation}`;
                      var response = {
                          'contentType': 'PlainText',
                          'content': `Thank You ! ${salofuser} ${nameofuser}, Let’s talk soon when you need any help with account service inquiries of ABC Bank.`
                      };
                      console.log(`Response :${JSON.stringify(response)}`);
                      callback(null, close(sessionAttributes, 'Fulfilled', response));
                      return (response.content);
                  } else {
                      var response = {
                          'contentType': 'PlainText',
                          'content': `Thank You !`
                      };
                      console.log(`Response :${JSON.stringify(response)}`);
                      callback(null, close(sessionAttributes, 'Fulfilled', response));
                  }
              }, (e) => {
                  var response = {
                      'contentType': 'PlainText',
                      'content': `Something went wrong in fetching account bal`
                  };
                  console.log('Unable to fetch Data from database', e);
                  console.log(`Response :${JSON.stringify(response)}`);
                  callback(null, close(sessionAttributes, 'Fulfilled', response));
              })
          } else {
              var response = {
                  'contentType': 'PlainText',
                  'content': `Thank You.`
              };
              console.log(`Response :${JSON.stringify(response)}`);
              callback(null, close(sessionAttributes, 'Fulfilled', response));
          }
      }, (e) => {
          var response = {
              'contentType': 'PlainText',
              'content': `Something went wrong `
          };
          console.log('Unable to fetch Data from database', e);
          console.log(`Response :${JSON.stringify(response)}`);
          callback(null, close(sessionAttributes, 'Fulfilled', response));
      })
  }

  //Default or Error Handling for invalid intent
  function handleDefault(request, callback) {
      var sessionAttributes = request.sessionAttributes;
      var response = {
          'contentType': 'PlainText',
          'content': `Invalid Request. Please try again !`
      }
      callback(null, close(sessionAttributes, 'Fulfilled', response));
  }

  function handlegenotpIntent(request,  resp,auditModel) {
      console.log('Start handlegenotpIntent');
      var sessionAttributes = request.body.input.sessionAttributes;
//      var requestAttributes = request.body.input.requestAttributes;

      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var msg1 = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
      var msg = `Your Registration has been added successfully`;
      console.log('connect to Mongo Db server');
     //  request.body.input.sessionAttributes= {cifidd :123452};
     //  request.body.input.sessionAttributes.userFirstName="Anitha";
     // console.log(typeof(request.body.input.sessionAttributes));
     // console.log(typeof(request.body.input.requestAttributes));
    //  var cifofuser= 123452 ;
  var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;

  console.log("cifofuser>>>>",cifofuser);

    //  console.log('Token:', PAGE_ACCESS_TOKEN);
      // https.get('https://graph.facebook.com/v2.6/' + request.userId + '?fields=first_name,last_name&access_token=' + PAGE_ACCESS_TOKEN,
      //
      //
      //     (res) => {
      //         console.log('res:', res);
      //         console.log('headers:', res.headers);
      //         res.on('data', (d) => {
      //             console.log(d);
      //             request.sessionAttributes.userFirstName = JSON.parse(d).first_name;
      //             console.log(`sessionAttributes:${request.sessionAttributes.userFirstName}`);
      //             // use below code to resend the reply
      //             //callSendAPI(messageData);
      //         });
      //
      //     }).on('error', (e) => {
      //     console.error(e);
      // });

      CustomerAuthDetails.find({
          cifid: cifofuser
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
              console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
              var userFirstName = request.body.input.sessionAttributes.userFirstName;
              //var userFirstName = "Anitha";
              console.log(`userFirstName:${userFirstName}`);

              if (docs.length === 0) {
///////////
console.log("Inside if block");
var val = `Hi ${userFirstName},${msg1}, I see that you are not registered as a Facebook Chat customer with ABC Bank.For account specific details you need to register for Facebook Banking service – By either visiting you internet Banking page https://s3.amazonaws.com/dianaci/index.html or visiting the nearest Branch.Thank You.`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);
//////////
              } else {
                var cifofuser = `${docs[0].cifid}`;

                console.log(cifofuser);
                CustomerAccDetails.find({
                    cifid: cifofuser
                }).then((doc) => {
                    console.log('in for balance');
                    var nameofuser = `${doc[0].customer_Name}`;
                    request.body.input.sessionAttributes.coreusername = `${nameofuser}`;
                    console.log(request.body.input.sessionAttributes.coreusername);

                  console.log(docs);
                  console.log(docs[0].cifid);
                  console.log('in for otp');
                  var otpGen = random(999999, 111111);
                  console.log(otpGen);

                  request.body.input.sessionAttributes.otp = `${otpGen}`;
                  console.log(docs);

                  var mobileofuser = `${docs[0].RegisterMobile}`;
                  var otpofuser = `${docs[0].otp}`;
                  console.log(mobileofuser);
                  console.log(`${docs[0].RegisterMobile}`);
                  console.log(`otp is :${otpGen}`);
                  console.log(`${docs[0].otp}`);
                  //
                  // var sns = new AWS.SNS();
                  // var params = {
                  //     Message: `Dear ${userFirstName}, you are trying to access confidential information via DIANA and otp is : ${otpGen}`,
                  //     MessageStructure: 'string',
                  //     PhoneNumber: `${mobileofuser}`,
                  //     Subject: 'Reference'
                  // };

                  // sns.publish(params, function(err, data) {
                  //     if (err) {
                  //         console.log(err, err.stack);
                  //     } // an error occurred
                  //     else {
                  //         console.log(data);
                  //         var custuserid1=request.sessionAttributes.custuserid;
                  //         console.log(custuserid1);
                  //       // successful response
                  //       CustomerAccDetails.update({cifid: cifofuser},{userid:custuserid1},{multi:true},(err)=> {
                  //           if(err) {
                  //             console.log(err);
                  //           } else {
                  //               console.log("updated successfully");
///////////////
console.log("Inside e block");
var val = `Hi ${request.body.input.sessionAttributes.coreusername},${msg1} otp has shared please type the same..`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);

                        },
                      (e) => {
                  //////////
                  console.log("Inside e block");
                  var val = `Something went wrong `
                  var responeData = {"callbackMessage": val};
                  auditModel.responseData =responeData;
                  console.log("auditModel>>",auditModel);
                  saveAudit(request,auditModel);
                  resp.json(responeData);
                      });

                    }
                  })
                }


  //Prepare Response
  function close(sessionAttributes, fulfillmentState, message) {
      console.log(sessionAttributes, fulfillmentState, message);
      return {
          sessionAttributes,
          dialogAction: {
              type: 'Close',
              fulfillmentState,
              message
          }
      };

  }

  //////////////
