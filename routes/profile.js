let express = require('express');
var router = express.Router();
var Job = require('../models/job');
var Comment = require('../models/comment');
var User = require('../models/user');
var Application = require('../models/application');
let methodOverride = require("method-override");
router.use(methodOverride("_method"));
var middleware = require('../middleware/index.js');


router.get("/profile",middleware.isloggedIn,function(req,res){
    var tu = {id:req.user._id,username:req.user.username}
    Application.find({author:tu},function(err,AlluserApplications){
        if (err) {
            console.log(err)
        }
        else{
            res.render("profile.ejs",{AlluserApplications:AlluserApplications});
        }
    });
});

module.exports = router;
