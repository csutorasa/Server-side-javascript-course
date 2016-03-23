exports.ExistUser = ExistUser;
exports.GetUsers = GetUsers;
exports.Register = Register;
exports.Login = Login;
exports.Logout = Logout;

/**
 * Checks if user already exists.
 * If username cannot be found in the request, does nothing.
 */
function ExistUser(context) {
    return function(req, res, next) {
        res.template = {};
        if (req.body.username) {
            for (var i = 0; i < context.users.length; i++) {
                if (context.users[i].user === req.body.username) {
                    res.locals.user = context.users[i];
                }
            }
            if (typeof res.locals.user === 'undefined') {
                res.template.url = '/login.html';
                res.template.error = 'Invalid username!';
            }
        }
        return next();
    }
}

/**
 * Gets name of all users.
 */
function GetUsers(context) {
    return function(req, res, next) {
        var names = [];
        for (var i = 0; i < context.users.length; i++) {
            names.push(context.users[i].name);
        }
        res.template = { data: names };
        return next();
    }
}

/**
 * Registers a user.
 * If the username is already used or not all data is provided, replies with HTTP 400 error code.
 */
function Register(context) {
    return function(req, res, next) {
        res.template = {};
        if (typeof res.locals.user !== 'undefined') {
            res.template.url = '/register.html';
            res.template.error = 'Username is already taken!';
            return next();
        }
        if (req.body.username && req.body.password && req.body.name) {
            var newuser = {
                user: req.body.username,
                pass: req.body.password,
                name: req.body.name
            }
            context.users.push(newuser);
            res.redirect('login');
        }

        res.template.url = '/register.html';
        return next();
    }
}

/**
 * Authenticates user and creates a session.
 * If username or password is incorrect, replies with HTTP 401 error code.
 */
function Login(context) {
    return function(req, res, next) {
        if (typeof res.locals.user !== 'undefined') {
            if (typeof req.body.password === 'undefined' || res.locals.user.pass !== req.body.password) {
                res.template = {
                    url: '/login.html',
                    error: 'Invalid password!'
                };
                return next();
            }
            else {
                req.session.user = res.locals.user;
                res.redirect('pets');
            }
        }
        res.template.url = '/login.html';
        return next();
    }
}

/**
 * Destroys user session.
 */
function Logout(context) {
    return function(req, res, next) {
        req.session.user = undefined;
        return next();
    }
}

