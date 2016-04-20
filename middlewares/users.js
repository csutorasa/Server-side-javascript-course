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
    var userModel = context.userModel;
    return function (req, res, next) {
        if (req.body.username) {
            userModel.findOne({ user: req.body.username }, function (err, user) {
                if (err) console.log('Error');
                res.locals.user = user != null ? user : undefined;
                if (typeof res.locals.user === 'undefined') {
                    res.templateUrl = '/login.ejs';
                    res.template.title = 'Login';
                    res.template.error = 'Invalid username!';
                }
                return next();
            });
        }
        else {
            return next();
        }
    }
}

/**
 * Gets name of all users.
 */
function GetUsers(context) {
    var userModel = context.userModel;
    return function (req, res, next) {
        userModel.find({}).select('name').exec(function (err, users) {
            if (err) console.log('Error');
            res.template.data = users;
            return next();
        });
    }
}

/**
 * Registers a user.
 * If the username is already used or not all data is provided, replies with HTTP 400 error code.
 */
function Register(context) {
    var userModel = context.userModel;
    return function (req, res, next) {
        if (typeof res.locals.user !== 'undefined') {
            res.templateUrl = '/register.ejs';
            res.template.title = 'Register';
            res.template.error = 'Username is already taken!';
            return next();
        }
        if (req.body.username || req.body.password || req.body.name) {
            if (req.body.username && req.body.password && req.body.name) {
                var newuser = new userModel({
                    user: req.body.username,
                    pass: req.body.password,
                    name: req.body.name
                });
                newuser.save(function (err, user) {
                    if (err) console.log('Error');
                    return res.redirect('/login');
                });
            }
            else {
                res.templateUrl = '/register.ejs';
                res.template.title = 'Register';
                res.template.error = 'Fill the entire form!';
                return next();
            }
        }
        else {
            res.templateUrl = '/register.ejs';
            res.template.title = 'Register';
            res.template.error = undefined;
            return next();
        }
    }
}

/**
 * Authenticates user and creates a session.
 * If username or password is incorrect, replies with HTTP 401 error code.
 */
function Login(context) {
    return function (req, res, next) {
        if (typeof res.locals.user !== 'undefined') {
            if (typeof req.body.password === 'undefined' || res.locals.user.pass !== req.body.password) {
                res.templateUrl = '/login.ejs';
                res.template.title = 'Login';
                res.template.error = 'Invalid password!';
                return next();
            }
            else {
                req.session.user = res.locals.user;
                return res.redirect('/pets');
            }
        }
        else {
            res.templateUrl = '/login.ejs';
            res.template.title = 'Login';
            return next();
        }
    }
}

/**
 * Destroys user session.
 */
function Logout(context) {
    return function (req, res, next) {
        req.session.user = undefined;
        return next();
    }
}

