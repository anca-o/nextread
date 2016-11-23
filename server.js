var express = require('express');
var app = express();
var port = 8888;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/*Using body parser*/
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/js', express.static(__dirname + '/js'));

/*Database connection with MongoDB*/
var username = 'admin';
var password = '123456';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'admin';

var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;
console.log('mongodb connection = ' + url);

mongoose.connect(url, function(err) {
    if(err) {
        console.log('connection error: ', err);
    } else {
        console.log('connection successful');
    }
});

/* models declaration */

var UserSchema = new mongoose.Schema({
    /*  _id: mongoose.Schema.ObjectId,*/
     username: String,
     password: String
 });

var User = mongoose.model('user', UserSchema);

/* routes go below */

var bcrypt = require('bcrypt-nodejs');

app.get('/', function (req, res, next) {
 res.sendFile( __dirname + '/index.html');
});

app.get('/register', function (req, res, next) {
    res.sendFile( __dirname + '/register.html');
});

/*app.post('/register', function (req, res, next) {
    var password = bcrypt.hashSync(req.body.password);
    req.body.password = password;

    User.create(req.body, function(err, saved) {
      if(err) {
        console.log(err);
        res.json({ message : err });
      } else {
        res.json({ message : "User successfully registered!"})
      };
    });
});*/

app.post('/register', function (req, res, next) {
    var password = bcrypt.hashSync(req.body.password);
    req.body.password = password;
    User.create(req.body, function(err, saved) {
      if(err) {
        console.log(err);
        res.json({ message : err });
      } else {
        res.json({ message : 'User successfully registered!'})
      };
    });
});

app.listen(port, '0.0.0.0', function() {
 console.log('Server running at port ' + port);
});
