let express = require('express');
var router = express.Router();
var Job = require('../models/job');
var Comment = require('../models/comment');
var User = require('../models/user');
var Application = require('../models/application');
let methodOverride = require("method-override");
router.use(methodOverride("_method"));
var middleware = require('../middleware/index.js');


//getting a form to fill out the application
router.get('/jobs/:id/application/new',middleware.isloggedIn, function(req, res){
    Job.findById(req.params.id, function(err,bbb){
        if(err){
            console.log(err);
        }
        else{
            res.render("application/new.ejs", {bbb:bbb});
        }
    });
});


router.post('/jobs/:id/application',middleware.isloggedIn,function(req, res){
    var name = req.body.yyyyy;
    var location = req.body.yyyyyyy;
    var skills = req.body.yyyyyy;
    let aadata = {
        name: name,location: location,skills: skills
    };
    //finding the job opportunity
    Job.findById(req.params.id, function(err,ggggg){
        if(err){
            console.log(err)
        }
        else{
            //creating a new application
            Application.create(aadata,function(err,lllll){
                if(err){
                    console.log(err);
                }
                else{
                    //adding id and username to application
                    lllll.author.id = req.user._id;
                    lllll.author.username = req.user.username;
                    //saving the application
                    lllll.save();
                    //pushing the new application in the job opportunity found above
                    ggggg.application.push(lllll);
                    //saving the job opportunity with application
                    ggggg.save();
                    //redirecting to the show page of the job opportunity found above
                    res.redirect("/jobs/" + ggggg._id);
                    
                }
            });
        }
    });
});

//show page for the applications
router.get("/jobs/:id/allapplications",middleware.checkOwnershipJob, function(req, res){
    Application.find({},function(err,gogo){
        if(err){
            console.log(err);
        }
        else{
            var  countapplications= Application.find();
            countapplications.count(function (err, applicationcount) { 
                if (err) {
                    console.log(err)
                }
                else{
                    res.render("application/show.ejs",{gogo:gogo,applicationcount:applicationcount});
                }
            });
            
        }
    });
});

//show page for a particular application
router.get("/jobs/:id/allapplications/:application_id",middleware.checkOwnershipJob,function(req, res){
    Application.findById(req.params.application_id,function(err,applicationR){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("application/show2.ejs",{applicationR:applicationR});
        }
    });
});


//edit application route
router.get('/jobs/:id/application/:application_id/edit',middleware.checkOwnershipApp,function(req, res) {
    Application.findById(req.params.application_id,function(err, appoo){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("application/edit.ejs",{xcxc:req.params.id,appoo:appoo});
        }
    });
});

//Update Route for application
router.put('/jobs/:id/application/:application_id',middleware.checkOwnershipApp,function(req, res) {
    Application.findByIdAndUpdate(req.params.application_id,req.body.fg,function(err, auoo){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/jobs/" + req.params.id);
        }
    });
});

//Delete application route
router.delete('/jobs/:id/application/:application_id',middleware.checkOwnershipApp,function(req, res) {
    Application.findByIdAndRemove(req.params.application_id,function(err, zoooo){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/jobs/" + req.params.id);
        }
    });
});


module.exports = router;