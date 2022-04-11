var Job = require('../models/job.js');
var Comment = require('../models/comment.js');
var Application = require('../models/application');

var middleWareObj = {};
//checking if the recruiter is logged in for creating a job opportunity
middleWareObj.isloggedInR = function (req,res, next){
    if(req.isAuthenticated()){
        if(req.user.recruiter==true){
            return next();
        }
    }
    res.redirect("/login");
}

//checking the ownership of the job opportunity
middleWareObj.checkOwnershipJob = function (req,res, next){
    //if the user is logged in
    if(req.isAuthenticated()){
        Job.findById(req.params.id,function(err,fff){
            if(err){
                res.redirect("/jobs");
            }
            else{
                if(fff.author.id.equals(req.user._id)){
                    
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("/login");
    }
}

//checking if the user is logged in
middleWareObj.isloggedIn = function (req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//checking the ownership of the comment
middleWareObj.checkOwnership = function (req,res, next){
    //if the user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,ppp){
            if(err){
                res.redirect("/jobs");
            }
            else{
                if(ppp.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("/login");
    }
}


//checking ownership of the application
middleWareObj.checkOwnershipApp = function (req,res, next){
    //if the user is logged in
    if(req.isAuthenticated()){
        Application.findById(req.params.application_id,function(err,qqqq){
            if(err){
                res.redirect("/jobs");
            }
            else{
                if(qqqq.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("/login");
    }
}


module.exports = middleWareObj;


