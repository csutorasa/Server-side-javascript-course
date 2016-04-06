exports.Redirect = Redirect;
exports.Render = Render;

/**
 * Redirect to login if you are not logged in and want to use a function that needs authentication.
 */
function Redirect(context) {
    return function(req, res, next) {
        if (!req.session.user && req.baseUrl !== '/login') {
            return res.redirect('/login');
        }
        else {
            return next();
        }
    }
}


/**
 * Renders a HTML template
 */
function Render(context) {
    return function(req, res, next) {
        res.template.session = req.session;
        res.render(context.templatesDir + res.templateUrl, res.template);
    }
}

