
const express = require("express");                               //Express.js, som er basert på node
const bodyParser = require("body-parser");                        //bodyParser, som er en express.js middleware for å håndtere HTTP-requests i express.js
const ejs = require("ejs");                                       //ejs, for templating
const _ = require('lodash');                                      //lodash, JavaScript bibliotek 

//Litt Lorem Ipsum for å fylle opp siden med tekst
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){                                  //homepage

  res.render("home", {homeParagraph: homeStartingContent, 
                      homePosts: posts});                         //res.render("home") = render pagen med navn 'home'. Finn objectet homeParagraph på 'home' siden og insert verdien homeStartingContent, definert på toppen av siden her| {key: value}
});


app.get("/about", function(req, res){                             //about page

  res.render("about", {aboutParagraph: aboutContent});            //render about-page, {key: value}
});


app.get("/contact", function(req, res){                           //contact page

  res.render("contact", {contactParagraph: contactContent});      //render contact page, {key: value}
});


app.get("/compose", function(req, res){                           //compose page

  res.render("compose");
});


app.get("/posts/:postName", function(req, res){                   //Dynamisk generert page

  const checkPost = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(checkPost === storedTitle){
      
      res.render("post", {title: post.title,                      //Render post pagen med inserted post title og content med bruk av EJS
                          content: post.content});

    }
});

});


app.post("/compose", function(req, res){

  const post = {                                                  //JavaScript object {key: value}
    title: req.body.postTitle,                                    //req.body.something = er å bruke body-parser
    content: req.body.postBody
   };

   posts.push(post);
   res.redirect("/")
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
