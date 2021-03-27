

var randomNumber1 = Math.floor(Math.random() * 6)+1;
var randomNumber2 = Math.floor(Math.random() * 6)+1;

var image1 = document.querySelectorAll("img")[0];
var image2 = document.querySelectorAll("img")[1];

image1.setAttribute("src","images/dice"+randomNumber1+".png")
image2.setAttribute("src","images/dice"+randomNumber2+".png")

heading = document.querySelectorAll('h1')[0];

function change_heading(randomNumber1, randomNumber2){
  var result;
  if (randomNumber1 > randomNumber2){
    result = '🚩 Player1 wins';
  }
  else if (randomNumber1 < randomNumber2){
    result = 'Player2 wins 🚩';
  }
  else{
    result = "Draw !";
  }
  return result;
}

heading.innerHTML = change_heading(randomNumber1, randomNumber2);
