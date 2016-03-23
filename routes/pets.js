var pets = require('../middlewares/pets');
var users = require('../middlewares/users');
var others = require('../middlewares/others');

function addRoutes(app, context) {
    app.use('/pets',
        pets.GetPets(context),
        others.Render(context)
    );

    app.use('/modify',
        others.Redirect(context),
        users.GetUsers(context),
        pets.GetPetId(context),
        pets.SavePet(context),
        others.Render(context)
    );

    app.use('/deletepet',
        others.Redirect(context),
        pets.DeletePet(context)
    );
}

module.exports = addRoutes;