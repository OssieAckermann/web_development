

var express = require("express");
var app = express();

var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/',function(req, res){
  console.log('on the page');
  res.sendFile(__dirname+'/signup.html');
});


app.post('/', function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  console.log(firstName, lastName, email);
});

app.listen(3000, function(){
  console.log("Serve is running!");
});
