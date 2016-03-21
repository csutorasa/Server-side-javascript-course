exports.ExistUser = ExistUser;
exports.GetUsers = GetUsers;
exports.Register = Register;
exports.Login = Login;
exports.Logout = Logout;
exports.GetPets = GetPets;
exports.DeletePet = DeletePet;
exports.SavePet = SavePet;

/**
 * Checks if user already exists.
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
 * Creates session for user.
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
            // TODO create session
            res.end('');
        }
    }
}

/**
 * Destroys user session.
 */
function Logout(context) {
    return function(req, res, next) {
        // TODO destory session
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
 */
function DeletePet(context) {
    return function(req, res, next) {
        var auth = true; // TODO add check for session
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
 * Saves a pet. The user must be logged in.
 * If the pet already exists, it will be modified, if not then a new pet will be created.
 */
function SavePet(context) {
    return function(req, res, next) {
        var auth = true; // TODO add check for session
        if (auth) {
            // TODO add or update
            res.end('');
        }
        else {
            res.status(401).end('You must be logged in to delete a pet!');
        }
        res.end('');
    }
}

