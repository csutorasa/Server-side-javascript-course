var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var otherMiddlewares = require('./middlewares/others');

const port = 80;

// Demo data 

var users = [
    { id: 1, user: 'mad', pass: 'lady', name: 'Mad Lady' },
    { id: 2, user: 'john', pass: 'pass', name: 'John' }
];
var pets = [
    { id: 1, name: 'Kitty', age: 3, },
    { id: 2, name: 'Cat', age: 2, owner: users[0] }
];
var context = {
    users: users,
    pets: pets,
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

// Server start

app.listen(port);
console.log('Server started on http://localhost:' + port + '/');
