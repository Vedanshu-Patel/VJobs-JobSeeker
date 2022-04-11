
var express = require('express');
var router = express.Router();
var Job = require('../models/job');
var Comment = require('../models/comment');
var User = require('../models/user');
var passport = require("passport");

//form to register on the website
router.get("/register", function(req, res) {
    res.render("register.ejs");
});

router.post("/register", function(req, res) {
    let newUser = new User({username: req.body.username,recruiter:req.body.recruiter});
    User.register(newUser, req.body.password,function(err,ii){
        if(err){
            res.render("register.ejs");
        }
        else{
            passport.authenticate("local")(req, res,function(){
                res.redirect("/jobs");
            });
        }
    });
});

//form for the login page
router.get("/login",function(req, res){
    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local",{
    successRedirect : "/jobs",
    failureRedirect : "/login"
}),function(req, res){
    
});

//logout route
router.get("/logout",function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;