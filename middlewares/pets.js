exports.GetPets = GetPets;
exports.DeletePet = DeletePet;
exports.GetPetId = GetPetId;
exports.SavePet = SavePet;

/**
 * Gets all pets.
 */
function GetPets(context) {
    var petModel = context.petModel;
    return function (req, res, next) {
        petModel.find({}).populate('owner').exec(function (err, result) {
            if (err) console.log('Error');
            res.templateUrl = '/pets.ejs';
            res.template.title = 'Pets';
            res.template.data = result;
            return next();
        });
    }
}

/**
 * Deletes a pet. The user must be logged in.
 * If pet ID is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function DeletePet(context) {
    var petModel = context.petModel;
    return function (req, res, next) {
        var auth = req.session.user ? true : false;
        if (auth) {
            if (req.params.id) {
                petModel.remove({ _id: req.params.id }, function (err, result) {
                    if (err) console.log('Error');
                    return res.redirect('/pets');
                });
            }
        }
        else {
            return res.redirect('/pets');
        }
    }
}

/**
 * Creates a pet. The user must be logged in.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function GetPetId(context) {
    var petModel = context.petModel;
    return function (req, res, next) {
        if (req.params.id) {
            petModel.findOne({ _id: req.params.id }).populate('owner').exec(function (err, pet) {
                if (err) console.log('Error');
                res.locals.pet = pet != null ? pet : undefined;
                res.template.pet = res.locals.pet;
                return next();
            })
        }
        else {
            return next();
        }
    }
}

/**
 * Save a pet into database.
 * If id is missing, does nothing.
 * If any pet data is missing, replies with HTTP 400 error code.
 * If user is not logged in, replies with HTTP 401 error code.
 */
function SavePet(context) {
    var petModel = context.petModel;
    return function (req, res, next) {
        if (req.body.name || req.body.age || req.body.owner) {
            if (req.body.name && req.body.age) {
                if (res.locals.pet) {
                    var pet = res.locals.pet;
                    pet.name = req.body.name;
                    pet.age = req.body.age;
                    pet.owner = req.body.owner ? req.body.owner : undefined;
                    res.locals.pet.save(function(err, pet) {
                        if(err) console.log('Error');
                        return res.redirect('/pets');
                    });
                }
                else {
                    var newpet = new petModel({
                        name: req.body.name,
                        age: req.body.age,
                        owner: req.body.owner ? req.body.owner : undefined
                    });
                    newpet.save(function (err, pet) {
                        if (err) console.log('Error');
                        return res.redirect('/pets');
                    });
                }
            }
            else {
                res.templateUrl = '/modify.ejs';
                res.template.title = 'Modify';
                res.template.error = 'Fill the entire form!';
                return next();
            }
        }
        else {
            res.templateUrl = '/modify.ejs';
            res.template.title = 'Modify';
            return next();
        }
    }
}