'use strict';
var express = require('express');
var twit = require('twit');
var request = require('request');

var http  = require('http'),
    https = require('https'),
    aws4  = require('aws4');
var rp   = require('request-promise');

var crypto = require('crypto'),
key = 'jenson';

var mongoose = require('mongoose'),
blacklistcheck = mongoose.model('blacklist'),
audit = mongoose.model('audit'),
ciservice = mongoose.model('ciservice'),
channel = mongoose.model('channel'),
answers = mongoose.model('answers');


var randomItem = require('random-item');

// var mongoose = require('mongoose'),
// audit = mongoose.model('audit');

var request = require('request');

var clientAccessToken=process.env.clientAccessToken;

var bot = new twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var params = {};
var count =0;
params = {
  screen_name: 'jensonjms',
  text: `Hello World!!! ${count++}`

};

var stream = bot.stream('user');
stream.on('direct_message', function (eventMsg) {
    console.log("EVENT MESSAGE >>",eventMsg);
    console.log("eventMsg.direct_message.sender.screen_name",eventMsg.direct_message.sender.screen_name);
    params.screen_name = eventMsg.direct_message.sender.screen_name;
    console.log("Req_params>>",params);
    if (eventMsg.direct_message.sender.screen_name==="aditya_368"){
      console.log("should not call post method as msg coming from ",eventMsg.direct_message.sender.screen_name);
    } else {
      console.log("eventMsg.direct_message.text>>>",eventMsg.direct_message.text);
      var inputext =eventMsg.direct_message.text
      console.log("inputext",inputext);
// Set the headers
var headers = {
    'Authorization':       'Bearer '+ clientAccessToken,
    'Content-Type':     'application/json'
}

// Configure the request//https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=hi&sessionId=12345
var options = {
    url: `https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=${inputext}&sessionId=12345`,
    headers: headers
    //qs: {'key1': 'xxx', 'key2': 'yyy'}
}

// Start the request
request.get(options, function (error, response, body) {
  console.log("options>>>",options);
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log("body>>",body);
        var body1 = JSON.parse(body);
        console.log("JSON_parse_body",JSON.parse(body));
        //console.log("response>>",response);
        console.log("response_body",body1);
         console.log("response_result>>>",body1.result);
         console.log("response_fulfilment>>>",body1.result.fulfillment);
         console.log("response_displayText>>>",body1.result.fulfillment.displayText);
         params.text =body1.result.fulfillment.displayText;
        console.log("should call post method");
        console.log("Sent Response params >>",params);
        // registerrequest(body,response);
      //  postMessage(params);
    } else {
      console.log("error>>",error);
    }
})

callregisterrequest(eventMsg);
    }
  }

);

  var postMessage = function(pm){
    console.log("postMessage start >>>>",pm);
    bot.post('direct_messages/new', pm, function(error, message, response) {
    if (error){
      console.log(error);
      return (error);
    }
    else  {
      console.log(message);

      return (response);
    }
   });
  };

function callregisterrequest(req) {
  registerrequest(req);
};


exports.handlerequest = function(req, res) {
  console.log("inside handlerequest");
registerrequest(req,res);
};
exports.handlegetrequest = function(req, res) {
  console.log("inside handlegetrequest");
  var token = req.body.token;
  console.log(token);

  channel.find({verificationToken : token}, function(err, ctask) {
    if (err){
      res.send(err);
    }else{
      if (ctask.length ===0){
          res.json({message :'The channel is not registered with Diana Server or the Token is Incorrect'});
      }else{
        console.log(ctask[0].enabled);
        if( ctask[0].enabled === 1){
          res.status(200)
        }else{
          res.json({message :'The '+ctask[0].name+' channel is not enabled. Please enable at Diana Server.'});
        }
      }
    };
});
};

function registerrequest(req) {
console.log("Inside registerrequest");
console.log("Req",req);
  console.log("Req_body_stringyfy",JSON.stringify(req));
  //var token = req.body.verify_token;
  var token = "5ac60b6a0499fd0b76a2ecb6"
  console.log(token);
      req.body={channel :'twitter'};
      console.log(req.body.channel);

  channel.find({verificationToken : token}, function(err, ctask) {
    if (err){
      res.send(err);
    }else{
      console.log('checking token');
      if (ctask.length ===0){
          res.json({message :'The channel is not registered with Diana Server or the Token is Incorrect'});
      }else{
      console.log('is verified');

        if( ctask[0].enabled === 1){
            console.log('is enabled ' +ctask[0].enabled);
          req.body.channel = ctask[0];
          var count = req.body.channel.reqCount + 1;
        channel.update({name:req.body.channel.name}, {$set: { reqCount: count }},  {upsert: true}, function(err,task){
          if (err){
            console.log('Could not update channel req count'+ err);
          }
          else{
            console.log('req count incremented  ' + task);
            var auditdata = {channelName : req.body.channel.name, requestDate : new Date()} ;
            var auditinfo = new audit(auditdata);
            auditinfo.save(function(err, task) {
              if (err){
                console.log('Audit information could not be saved' + err);
                res.json({message :'Audit information could not be saved. Not forwarding to CI Service'});
              }else{
              console.log(task);
              req.body.auditid = task._id;
              console.log(req.body.auditid);
              handlelexrequest(req);
            }
            });
          }
        });
        }else{
          res.json({message :'The '+ctask[0].name+' channel is not enabled. Please enable at Diana Server.'});
        }
      }
    };
});
};

function handlelexrequest(req) {
  req.body.ciservicename = "GoogleDialogFlow";
  //console.log(req.body);
  var val = req.direct_message.text;
  //var inputext =eventMsg.direct_message.text
  var channelid = req.body.channel.name;
console.log("val>>",val);
console.log("channelid>>",channelid);

  var inputarray = val.split(' ');
  console.log(inputarray);
         blacklistcheck.find({}, function(err, task) {
           if (err){
             res.send(err);
           }else{
             for (let word in inputarray){
             for (var i=0 ; i < task.length ; i++){
                 var checkval = new RegExp(task[i].pattern.toString());
                 if (checkval.test(inputarray[word])) {
                  inputarray[word] = crypto.createHmac('md5', key).update(inputarray[word]).digest('hex');
                console.log(inputarray[word]);
                }
              };
            };
            val = inputarray.join(" ");
              console.log('in');
            var    bodytext = '{"inputText" : "'+val+'" , "requestAttributes":{"auditid" : "'+ req.body.auditid +'", "channelid" : "'+ channelid +'"}}';
            console.log(bodytext);
           var nameofuser = randomItem(['jensonj', 'adityas', 'shrimank', 'anitha']);
           req.body.nameofuser = nameofuser;

          // var opts = {
          //        host: 'runtime.lex.us-east-1.amazonaws.com',
          //        service: 'lex',
          //        region: 'us-east-1',
          //        uri: `https://runtime.lex.us-east-1.amazonaws.com/bot/dianaBot/alias/dianaServer/user/${nameofuser}/text`,
          //        path: `bot/dianaBot/alias/dianaServer/user/${nameofuser}/text`,
          //        body : bodytext,
          //        diana : req.body
          //        };
             ciservice.find({name : "Lex"}, function(err, task) {
               if (err){
                 res.send(err);
               }else{
                 var accessKeyId  = task[0].accessKey;
                 var secretAccessKey = task[0].secretKey;
             //
             // aws4.sign(opts, {
             //   accessKeyId: accessKeyId,
             //   secretAccessKey: secretAccessKey
             //
             // });

             console.log("Opts after sign");
             console.log("params>>>",params);
              postMessage(params);
             rp(opts)
             .then( (html)=>{
                console.log(typeof(html))
                //console.log(req.body);
                channel.update({name:req.body.channel.name}, {$inc: { successCount:  1 }},{upsert: true},  function(err){
                  if(err){
                    console.log('Could not update channel success count' + err);
                  }
                });
                console.log(JSON.parse(html).message);
                var answersdata = {
                  channelName:req.body.channel.name,
                  ciservice:req.body.ciservicename,
                  query:  req.body.input ,
                  answerByCi: JSON.parse(html).message,
                  userName:req.body.nameofuser ,
                  requestDate: new Date(),
                  status: JSON.parse(html).intentName === null ? 0 : 1
                };
                //console.log(answersdata);

                 var answerinfo = new answers(answersdata);
                 answerinfo.save(function(err, task) {
                   if (err){
                     console.log('Could not save answers' + err);
                   }
                   else{
                     console.log('Answers1 saved');
                   };
                 });
                //JSON.parse(html).timestamp = new Date();
                res.json(JSON.parse(html));
                var out = html;
              }
               )
             .catch( (e)=> {
               console.log('failed:'+e)
               channel.update({name:req.body.channel.name}, {$inc: { failCount: 1 }},{upsert: true}, function(err){
                 if(err){
                   console.log('Could not update channel fail count' + err);
                 }
               })
               var answersdata = {
                 channelName:req.body.channel.name,
                 ciservice:req.body.ciservicename,
                 query:  req.body.input,
                 answerByCi:'',
                 userName:req.body.nameofuser ,
                 requestDate: new Date(),
                 status: 2
               };
               var answerinfo = new answers(answersdata);
               answerinfo.save(function(err, task) {
                 if (err){
                   console.log('Could not save answers' + err);
                 }
                 else{
                   console.log('Answers2 saved');
                 };
               });
               res.json({message : e.message})
           });
           };
         });
           }
         });
}
