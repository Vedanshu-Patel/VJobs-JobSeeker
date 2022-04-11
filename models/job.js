var mongoose =require('mongoose');

//Schema for a job 
let jobSchema = new mongoose.Schema({
    name: String,
    company: String,
    description: String,
    salary: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref :"Comment"
        }
    ],
    application: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref :"Application"
        }
    ]
});

var Job = mongoose.model('Job',jobSchema);
module.exports = Job;