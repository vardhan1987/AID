
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/registration'), //created model loading here
  Task1 = require('./api/models/blacklist'),
  Task2 = require('./api/models/channel'),
  Task3 = require('./api/models/ciservice'),
  Task4 = require('./api/models/audit'),
  Task5 = require('./api/models/answers'),
  bodyParser = require('body-parser');

  var cors = require('cors');
  app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:evolvus*123@ds161336.mlab.com:61336/alexadb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// app.get("/webhook", function (req, res) {
//     if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
//         console.log("Verified webhook");
//         res.status(200).send(req.query["hub.challenge"]);
//     } else {
//         console.error("Verification failed. The tokens do not match.");
//         res.sendStatus(403);
//     }
// });

// All callbacks for Messenger will be POST-ed here
// app.post("/webhook", function (req, res) {
//     // Make sure this is a page subscription
//     if (req.body.object == "page") {
//         // Iterate over each entry
//         // There may be multiple entries if batched
//         req.body.entry.forEach(function(entry) {
//             // Iterate over each messaging event
//             entry.messaging.forEach(function(event) {
//                 if (event.postback) {
//                     processPostback(event);
//                 } else if (event.message) {
//                     processMessage(event);
//                 }
//             });
//         });
//
//         res.sendStatus(200);
//     }
// });



var routes = require('./api/routes/registration'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
