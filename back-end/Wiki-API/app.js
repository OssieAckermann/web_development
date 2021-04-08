const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true});

//schema
const articleSchema = {
  title:String,
  content:String,
};
// model
const Article = mongoose.model('Article', articleSchema);


app.route("/articles").get(function(req, res){
  Article.find(function(err, foundArticles){
    console.log(foundArticles);
    res.send(foundArticles);
  });
})
.post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });

  newArticle.save(function(err){
    if (!err){
      res.send('Succefully stored');
    }else{
      res.send(err);
    }
  });
})
.delete(function(req, res){
  Article.deleteMany(function(err){
    if (!err){
      console.log('delete Succefully');
    }else{
      res.send(err);
    }
  });
});


// Request a specific article
app.route("/articles/:articleTitle")
.get(function(req, res){
  Article.findOne(
    {title: req.params.articleTitle},
    function(err, foundAriticle){
      if (foundAriticle){
        res.send(foundAriticle);
      }else{
        res.send("No article matched was found");
      }
  });
})
.put(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if (!err){
        res.send('Sucessfully update !');
      }else{
        res.send(err);
      }
    } );
})
.patch(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if (!err){
        res.send('Sucessfully patched !');
      }else{
        res.send(err);
      }
    });
})
.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err){
        res.send('Succefully delete');
      }else{
        res.send(err);
      }
    });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
