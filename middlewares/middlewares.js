exports.ExistUser = ExistUser;
exports.GetUsers = GetUsers;
exports.Register = Register;
exports.Login = Login;
exports.Logout = Logout;
exports.GetPets = GetPets;
exports.DeletePet = DeletePet;
exports.CreatePet = CreatePet;
exports.UpdatePet = UpdatePet;

/**
 * Checks if user already exists.
 * If username cannot be found in the request, does nothing.
 */
function ExistUser(context) {
    return function(req, res, next) {
        if (typeof req.body.username !== 'undefined') {
            for (var i = 0; i < context.users.length; i++) {
                if (context.users[i].user === req.body.username) {
                    res.locals.user = context.users[i];
                }
            }
        }
        next();
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
        res.json(names);
    }
}

/**
 * Registers a user.
 * If the username is already used or not all data is provided, replies with HTTP 400 error code.
 */
function Register(context) {
    return function(req, res, next) {
        if (res.locals.user) {
            res.status(400).end('Username is already taken!');
        }
        else {
            if (!req.body.username || !req.body.password || !req.body.name) {
                res.status(400).end('All fields are required!');
            }
            else {
                var newuser = {
                    user: req.body.username,
                    pass: req.body.password,
                    name: req.body.name
                }
                context.users.push(newuser);
                res.end('');
            }
        }
    }
}

/**
 * Authenticates user and creates a session.
 * If username or password is incorrect, replies with HTTP 401 error code.
 */
function Login(context) {
    return function(req, res, next) {
        if (!res.locals.user) {
            res.status(401).end('Invalid username!');
        }
        else if (typeof req.body.password === 'undefined' || res.locals.user.pass !== req.body.password) {
            res.status(401).end('Invalid password!');
        }
        else {
            req.session.user = res.locals.user;
            res.end('');
        }
    }
}

/**
 * Destroys user session.
 */
function Logout(context) {
    return function(req, res, next) {
        req.session.user = undefined;
        res.end('');
    }
}

/**
 * Gets all pets.
 */
function GetPets(context) {
    return function(req, res, next) {
        var pets = [];
        for (var i = 0; i < context.pets.length; i++) {
            pets.push({
                id: context.pets[i].id,
                name: context.pets[i].name,
                age: context.pets[i].age,
                owner: typeof context.pets[i].owner === 'undefined' ? '' : context.pets[i].owner.name
            });
        }
        res.json(pets);
    }
}

/**
 * Deletes a pet. The user must be logged in.
 * If pet ID is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function DeletePet(context) {
    return function(req, res, next) {
        var auth = req.session.user ? true : false;
        if (auth) {
            if (!req.body.id) {
                res.status(400).end('You must provide an id');
            } else {
                for (var i = 0; i < context.pets.length; i++) {
                    if (context.pets[i].id == req.body.id)
                        context.pets.splice(i, 1);
                }
                res.end('');
            }
        }
        else {
            res.status(401).end('You must be logged in to delete a pet!');
        }
    }
}

/**
 * Creates a pet. The user must be logged in.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function CreatePet(context) {
    return function(req, res, next) {
        var auth = req.session.user ? true : false;
        if (auth) {
            if(req.body.name || req.body.name) {
                context.pets.push({
                    name: req.body.name,
                    age: req.body.age
                });
                // TODO add owner
                res.end('');
            }
            else {
                res.status(400).end('All fields are required!');
            }
        }
        else {
            res.status(401).end('You must be logged in to delete a pet!');
        }
    }
}

/**
 * Updates a pet. The user must be logged in.
 * If id is missing, does nothing.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function UpdatePet(context) {
    return function(req, res, next) {
        var auth = req.session.user ? true : false;
        if (auth) {
            if(req.body.id) {
                // TODO update
                res.end('');
            }
            else {
                next();
            }
        }
        else {
            res.status(401).end('You must be logged in to delete a pet!');
        }
    }
}

