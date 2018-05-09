var http  = require('http'),
    https = require('https'),
    aws4  = require('aws4');


var opts = {
         host: 'runtime.lex.us-east-1.amazonaws.com',
// 		    //host:'10.10.69.203'
         service: 'lex',
         region: 'us-east-1',
         path: 'bot/dianaBot/alias/dianaServer/user/shrimank/text',
         body: '{ "inputText": "hi" }',
         uri: 'https://runtime.lex.us-east-1.amazonaws.com/bot/dianaBot/alias/dianaServer/user/shrimank/text'
       };


module.exports = {opts};
