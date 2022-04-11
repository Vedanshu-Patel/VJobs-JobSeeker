let express = require('express');
var router = express.Router();
var Job = require('../models/job');
var Comment = require('../models/comment');
var User = require('../models/user');
var Application = require('../models/application');
let methodOverride = require("method-override");
router.use(methodOverride("_method"));
var middleware = require('../middleware/index.js');


// getting a form to create a new comment
router.get("/jobs/:id/comments/new",middleware.isloggedIn,function(req, res){
    Job.findById(req.params.id,function(err,v){
        if(err){
            console.log(err);
        }
        else{
            res.render("comment/new.ejs",{v:v});
        }
    });
});


router.post("/jobs/:id/comments",middleware.isloggedIn,function(req, res){
    let xdata = {
        text:req.body.rr
    }
    //finding the job opportunity
    Job.findById(req.params.id,function(err,h){
        if(err){
            console.log(err);
        }
        else{
            //creating a new comment 
            Comment.create(xdata,function(err,oo){
                if(err){
                    console.log(err);
                }
                else{
                    //adding id and username to comment
                    oo.author.id = req.user._id;
                    oo.author.username = req.user.username;
                    //saving the comment
                    oo.save();
                    //pushing the new comment in the job opportunity found above
                    h.comments.push(oo);
                    //saving the job opportunity with comments
                    h.save();
                    //redirecting to the show page of the job opportunity found above
                    res.redirect("/jobs/" + h._id);
                }
            });
        }
    });
});


//Edit comment form route
router.get("/jobs/:id/comments/:comment_id/edit",middleware.checkOwnership,function(req, res){
    Comment.findById(req.params.comment_id,function(err,k){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comment/edit.ejs",{xdxd:req.params.id,k:k});
        }
    });
});

//Update route for comment
router.put("/jobs/:id/comments/:comment_id",middleware.checkOwnership,function(req, res){
    let wdata = {
        text:req.body.qq
    }
    Comment.findByIdAndUpdate(req.params.comment_id,wdata,function(err,updatedcomment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/jobs/" + req.params.id);
        }
    });
});


// Comment delete Route
router.delete("/jobs/:id/comments/:comment_id",middleware.checkOwnership,function(req, res){
    //find the comment by id and delete it
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/jobs/" + req.params.id);
        }
    });
});



module.exports = router;