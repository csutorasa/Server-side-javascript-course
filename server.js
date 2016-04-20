var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var otherMiddlewares = require('./middlewares/others');

const port = 80;
const connectionstring = 'mongodb://localhost:27017/GS3778';

var context = {
    userModel: require('./models/userModel'),
    petModel: require('./models/petModel'),
    templatesDir: __dirname + '/templates'
};

var app = express();
app.set('view engine', 'ejs');
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'petmanager',
    resave: false,
    saveUninitialized: true
}));
app.use(function (req, res, next) { res.template = {}; next(); });
require('./routes/pets')(app, context);
require('./routes/users')(app, context);
app.use('/', otherMiddlewares.Redirect(context));

// Server started

app.listen(port, function (err) {
    if (err) {
        console.log('Failed to start the webserver on: ' + connectionstring);
        process.exit(1);
    }
    else {
        console.log('Webserver started on http://localhost:' + port + '/');
    }
});
mongoose.connect(connectionstring, function (err) {
    if (err) {
        console.log('Failed to connect to database on: ' + connectionstring);
        process.exit(1);
    }
    else {
        console.log('Connected to database on: ' + connectionstring);
    }
});

