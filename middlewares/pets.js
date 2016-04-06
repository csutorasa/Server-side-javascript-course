exports.GetPets = GetPets;
exports.DeletePet = DeletePet;
exports.GetPetId = GetPetId;
exports.SavePet = SavePet;

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
        res.templateUrl = '/pets.ejs';
        res.template.title = 'Pets';
        res.template.data = pets;
        return next();
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
            if (req.params.id) {
                for (var i = 0; i < context.pets.length; i++) {
                    if (context.pets[i].id == req.params.id) {
                        context.pets.splice(i, 1);
                    }
                }
            }
        }
        return res.redirect('/pets');
    }
}

/**
 * Creates a pet. The user must be logged in.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function GetPetId(context) {
    return function(req, res, next) {
        if (req.params.id) {
            for (var i = 0; i < context.pets.length; i++) {
                if (context.pets[i].id == req.params.id) {
                    res.locals.pet = context.pets[i];
                    break;
                }
            }
            res.template.pet = res.locals.pet;
        }
        return next();
    }
}

/**
 * Save a pet into database.
 * If id is missing, does nothing.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function SavePet(context) {
    return function(req, res, next) {
        if (req.body.name || req.body.age || req.body.owner) {
            if(req.body.name && req.body.age) {
                if(res.locals.pet) {
                    res.locals.pet.name = req.body.name;
                    res.locals.pet.age = req.body.age;
                    res.locals.pet.owner =  req.body.owner ? { name: req.body.owner } : undefined;
                }
                else {
                    context.pets.push({
                        id: Math.floor((Math.random() * 10000000) + 1),
                        name: req.body.name,
                        age: req.body.age,
                        owner: req.body.owner ? { name: req.body.owner } : undefined
                    });
                }
                return res.redirect('/pets');
            }
            else {
                res.templateUrl = '/modify.ejs';
                res.template.title = 'Modify';
                res.template.error = 'Fill the entire form!';
                return next();
            }
        }
        res.templateUrl = '/modify.ejs';
        res.template.title = 'Modify';
        return next();
    }
}