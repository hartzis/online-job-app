var express = require('express');
var bodyParser = require('body-parser');

var Cookies = require('cookies');

var mainController = require('./controllers/mainController.js')

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/omega3studios');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.use(Cookies.express());

app.get('/', mainController.getIndex);

// displays a list of applicants
app.get('/applicants', mainController.getApplicants);

// delete applicants/:id
app.post('/applicants/:id/delete', mainController.postApplicantsDeleteById)

// creates and applicant
app.get('/application', mainController.getApplication)


app.post('/applicant', mainController.postApplicant);

app.get('/success', mainController.getSuccess)

var server = app.listen(8441, function() {
    console.log('Express server listening on port ' + server.address().port);
});