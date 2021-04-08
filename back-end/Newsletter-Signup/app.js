var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var https = require('https');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/', function(req, res) {
  console.log('on the page');
  res.sendFile(__dirname + '/signup.html');
});


app.post('/', function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    member: [{
      email_address: email,
      status: "subscribed",
      merge_field: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = 'https://us1.api.mailchimp.com/3.0/lists/f445349d27';
  const options = {
    method: 'POST',
    auth: 'Ossie:5633952c7de8d4bce2b55811480a0684-us1'
  }
  const request = https.request(url, options, function(response) {
    response.on('data', function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(3000, function() {
  console.log("Serve is running!");
});


//api key
// 5633952c7de8d4bce2b55811480a0684-us1
//list id
// f445349d27
