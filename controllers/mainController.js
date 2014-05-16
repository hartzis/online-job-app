var applicantsModel = require('../models/applicantsModel.js')

var getActiveNav = function(cPage, aPage) {
    return (cPage === aPage) ? 'active' : '';
}

var routes = {
    getIndex: function(req, res) {
        res.render('index', {
            cPath: req.path,
            getActiveNav: getActiveNav,
        });
    },
    getApplicants: function(req, res) {
        applicantsModel.findAndReturnAllApplicants(
            function(applicants) {
                res.render('applicants', {
                    cPath: req.path,
                    getActiveNav: getActiveNav,
                    applicants: applicants
                })
            })
    },
    getApplication: function(req, res) {
        res.render('application', {
            cPath: req.path,
            getActiveNav: getActiveNav,
        });
    },
    postApplicant: function(req, res) {
        // get application data for applicant
        var application = req.body;
        console.log(application);

        // create and save new applicant
        applicantsModel.createAndSaveNewApplicant(application,
            function(applicant) {
                res.cookies.set('name', applicant.name, {
                    overwrite: true
                });
                res.redirect('/success');
            })
    },
    getSuccess: function(req, res) {
        if (req.cookies.get('name')) {
            console.log(req.cookies.get('name'));
            var applicantName = req.cookies.get('name');
            res.render('success', {
                applicantName: applicantName,
                cPath: req.path,
                getActiveNav: getActiveNav
            })
            return;
        }
        console.log(req.cookies.get('name'))
        res.send('Please follow proper applicant submital process')
    },
    postApplicantsDeleteById: function(req, res) {
        var id = req.params.id;
        console.log('Attempting to delete this user-', id);
        applicantsModel.findAndDeleteApplicantById(id,
            function(success) {
                res.send({
                    success: success,
                    id: id
                });
            })
    }
}

module.exports = routes;