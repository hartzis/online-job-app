var mongoose = require('mongoose');

var Applicant = mongoose.model('applicant', {
    name: String,
    bio: String,
    skills: [String],
    exp: Number,
    why: String
})

module.exports = {
    Applicant: Applicant,
    createAndSaveNewApplicant: function(application, cb) {
        // create new applicant
        var newApplicant = new Applicant({
            name: application.name,
            bio: application.bio,
            skills: application.skills.split(',').map(function(item) {
                return item.trim()
            }),
            exp: application.years,
            why: application.why
        })

        // save new applicant and run callback
        newApplicant.save(function(err, applicant) {
            console.log('saved-', applicant);
            cb(applicant);
        })
    },
    findAndReturnAllApplicants: function(cb) {
        Applicant.find({}, function(err, applicants) {
            console.log(applicants);
            cb(applicants);
        })
    },
    findAndDeleteApplicantById: function(id, cb) {
        Applicant.findById(id).remove().exec(function(err, data) {
            if (err) {
                console.log(err)
                cb(err);
                return;
            }
            cb('success');
        })
    }
};