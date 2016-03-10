var express = require('express');

var app = express();

const port = 80;

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use('/', (req, res) => {
    res.redirect('login.html');
});

app.listen(port);
console.log('Server started on http://localhost:' + port + '/');
