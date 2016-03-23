var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

const port = 80;


// Demo data 

var users = [
    { id: 0, user: 'mad', pass: 'lady', name: 'Mad Lady' },
    { id: 1, user: 'john', pass: 'pass', name: 'John' }
];
var pets = [
    { id: 0, name: 'Kitty', age: 3, },
    { id: 1, name: 'Cat', age: 2, owner: users[0] }
];
var context = {
    users: users,
    pets: pets,
    publicRoot: __dirname + '/public'
};

var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'petmanager',
    resave: false,
    saveUninitialized: true
}));
require('./routes/pets')(app, context);
require('./routes/users')(app, context);

//app.use('/', middlewares.Redirect(context) );

// Server start

app.listen(port);
console.log('Server started on http://localhost:' + port + '/');
