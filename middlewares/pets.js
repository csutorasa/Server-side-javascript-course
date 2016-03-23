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
        res.template = { url: '/pets.html', data: pets };
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
            if (req.body.id) {
                for (var i = 0; i < context.pets.length; i++)
                    if (context.pets[i].id == req.body.id) {
                        context.pets.splice(i, 1);
                    }
            }
        }
        res.redirect('pets');
    }
}

/**
 * Creates a pet. The user must be logged in.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function GetPetId(context) {
    return function(req, res, next) {
        if (req.body.id) {
            for (var i = 0; i < context.pets.length; i++) {
                if (context.pets[i].id == req.body.id) {
                    res.locals.pet = context.pets[i];
                    break;
                }
            }
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
            // TODO create or update
            res.redirect('pets');
        }
        res.template.url = '/modify.html';
        return next();
    }
}