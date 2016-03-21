var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var middlewares = require('./middlewares/middlewares');

const port = 80;

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'petmanager',
  resave: false,
  saveUninitialized: true
}));

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
    pets: pets
};

// Routes

app.post('/loginuser',
    middlewares.ExistUser(context),
    middlewares.Login(context)
);

app.post('/logoutuser',
    middlewares.Logout(context)
);

app.post('/registeruser',
    middlewares.ExistUser(context),
    middlewares.Register(context)
);

app.get('/getpets',
    middlewares.GetPets(context)
);

app.get('/getusers',
    middlewares.GetUsers(context)
);

app.post('/deletepet',
    middlewares.DeletePet(context)
);

app.post('/savepet',
    middlewares.UpdatePet(context),
    middlewares.CreatePet(context)
);

app.use('/', (req, res, next) => {
    res.redirect('login.html');
});

// Server start

app.listen(port);
console.log('Server started on http://localhost:' + port + '/');
