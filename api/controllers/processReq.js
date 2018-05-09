'use strict';

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

exports.handlerequest = function(req, res) {
registerrequest(req,res);

};



exports.handlegetrequest = function(req, res) {
  // if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
  //     console.log("Verified webhook");
  //     res.status(200).send(req.query["hub.challenge"]);
  // } else {
  //     console.error("Verification failed. The tokens do not match.");
  //     res.sendStatus(403);
  // }

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

function registerrequest(req,res) {

  console.log(JSON.stringify(req.body));
  var token = req.body.verify_token;
  console.log(token);

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


              //var answersinfo = new answers(answersdata);


              handlelexrequest(req, res);
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

function handlelexrequest(req,res) {

  req.body.ciservicename = "Lex";
  //console.log(req.body);
  var val = req.body.input;
  var channelid = req.body.channel.name;

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

 // var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
 // console.log( mykey);
// var mystr = mykey.update('abc', 'utf8', 'hex')
// mystr += mykey.update.final('hex');
//
// console.log(mystr); //34feb914c099df25794bf9ccb85bea72


// var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
// var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
// mystr += mykey.update.final('utf8');
//
// console.log(mystr); //abc
            //  res.json({message :'You have entered something blacklisted - ' +task[i].name });
                }
              };
            };
            val = inputarray.join(" ");

              // var hash = crypto.createHmac('md5', key).update(val).digest('hex');
              // var resp = hash;




              console.log('in');
            var    bodytext = '{"inputText" : "'+val+'" , "requestAttributes":{"auditid" : "'+ req.body.auditid +'", "channelid" : "'+ channelid +'"}}';
            console.log(bodytext);


           var nameofuser = randomItem(['jensonj', 'adityas', 'shrimank', 'anitha']);
           req.body.nameofuser = nameofuser;

          var opts = {
                 host: 'runtime.lex.us-east-1.amazonaws.com',
                 service: 'lex',
                 region: 'us-east-1',
                 uri: `https://runtime.lex.us-east-1.amazonaws.com/bot/dianaBot/alias/dianaServer/user/${nameofuser}/text`,
                 path: `bot/dianaBot/alias/dianaServer/user/${nameofuser}/text`,
                 body : bodytext,
                 "sessionAttributes": {"auditid":"123",
                 "userFirstName": "Aditya",
                 "custuserid": "2157056904312201"
               },
                 diana : req.body
                 };
                 //console.log(opts);


             ciservice.find({name : "Lex"}, function(err, task) {
               if (err){
                 res.send(err);
               }else{
                 var accessKeyId  = task[0].accessKey;
                 var secretAccessKey = task[0].secretKey;

             aws4.sign(opts, {
               accessKeyId: accessKeyId,
               secretAccessKey: secretAccessKey

             });

             console.log("Opts after sign");



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
