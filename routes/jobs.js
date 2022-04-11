let express = require('express');
var router = express.Router();
var Job = require('../models/job');
var Comment = require('../models/comment');
var User = require('../models/user');
var Application = require('../models/application');
let methodOverride = require("method-override");
router.use(methodOverride("_method"));
var passport = require('passport');
var middleware = require('../middleware/index.js');

// jobs page
router.get("/jobs", function(req, res){
    Job.find({},function(err,j){
        if(err){
            console.log(err);
        }
        else{
            res.render("job/index.ejs",{j:j});
        }
    });
});


//form to create a new job opportunity
router.get("/jobs/new",middleware.isloggedInR,function(req, res){
    res.render("job/new.ejs");
});


router.post("/jobs",middleware.isloggedInR,function(req, res){
        var name= req.body.name;
        var company= req.body.company;
        var description= req.body.description;
        var salary= req.body.salary;
        var author ={
            id:req.user._id,
        username:req.user.username
        }
    var pdata = {
        name:name,company:company,description:description,salary:salary,author:author
    };
    //Creates a new job opportunity
    Job.create(pdata,function(err,m){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/jobs");
        }
    });
});

//show page for the job
router.get("/jobs/:id", function(req, res){
    Job.findById(req.params.id).populate("comments").exec(function(err,g){
        if(err){
            console.log(err);
        }
        else{
            var countcomments = Comment.find();
            countcomments.count(function(err,countcomment){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("job/show.ejs",{g:g,countcomment:countcomment});
                }
            });
            
        }
    });
});




//edit page form
router.get("/jobs/:id/edit",middleware.checkOwnershipJob,function(req, res){
    Job.findById(req.params.id,function(err,p){
        if(err){
            res.redirect("/jobs");
        }
        else{
            res.render("job/edit.ejs",{p:p});
        }
    });
        
});


// Update job Route
router.put("/jobs/:id",middleware.checkOwnershipJob,function(req, res){
    var edata = {
        name: req.body.name,
        company: req.body.company,
        description: req.body.description,
        salary: req.body.salary
    };
    Job.findByIdAndUpdate(req.params.id,edata,function(err,updatedjob){
        if(err){
            res.redirect("/jobs");
        }
        else{
            res.redirect("/jobs/" + req.params.id);
        }
    });
});

//Delete job Route 
router.delete("/jobs/:id",middleware.checkOwnershipJob,function(req, res){
    Job.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/jobs");
        }
    });
});


module.exports = router;