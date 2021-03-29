
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));


app.get('/',function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.post('/',function(req, res){
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2 ;
  res.send("The sum of these 2 numbers is "+ result);
});


app.get('/BMI',function(req, res){
  res.sendFile(__dirname+'/BMI.html');
});

app.post('/BMI',function(req, res){
  var weight = Number(req.body.weight);
  var hight = Number(req.body.hight);
  var result = weight / Math.pow(hight,2);
  res.send("Your BMI is "+ result);
});

app.listen(3000, function(){
  console.log("Serve is running!");
})
