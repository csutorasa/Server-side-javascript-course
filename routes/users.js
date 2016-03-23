var users = require('../middlewares/users');
var others = require('../middlewares/others');

function addRoutes(app, context) {
    app.use('/login',
        users.Logout(context),
        users.ExistUser(context),
        users.Login(context),
        others.Render(context)
    );

    app.use('/register',
        users.Logout(context),
        users.ExistUser(context),
        users.Register(context),
        others.Render(context)
    );
}

module.exports = addRoutes;