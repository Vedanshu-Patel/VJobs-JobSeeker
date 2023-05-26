//express
var express = require('express');
var app = express();
app.use(express.static("public"));
//body-parser
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
//mongoose
var mongoose = require("mongoose");
//passport
var passport = require("passport");
var LocalStratergy = require("passport-local");
var passportLocalMongoose = require('passport-local-mongoose');
//method-override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//connect-flash
var flash = require('connect-flash');
app.use(flash());

//Schema
var Job = require('./models/job');
var User = require('./models/user');
var Comment = require('./models/comment');
var Application = require('./models/application');

mongoose.connect("mongodb://127.0.0.1:27017/VJobs");


//Passport configuration
app.use(require("express-session")({
    secret : "Learning is a never ending process",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//requiring the routes
var jobroutes = require("./routes/jobs");
var commentroutes = require("./routes/comments");
var authenticationroutes = require("./routes/authentication");
var applicationroutes = require("./routes/applications");
var profileroutes = require("./routes/profile");
 //current user
app.use(function(req, res, next) {
    res.locals.currentuser=req.user;
    next();
});

app.use(jobroutes);
app.use(commentroutes);
app.use(authenticationroutes);
app.use(applicationroutes);
app.use(profileroutes);
//home page
app.get("/", function(req, res){
    res.render("job/home.ejs");
});


app.get("*", function(req,res){
    res.send("Wrong URL!!!");
});


app.listen(4444,function(){
    console.log("Server Started!");
});
