exports.Redirect = Redirect;
exports.Render = Render;

/**
 * Redirect to login if you are not logged in and want to use a function that needs authentication.
 */
function Redirect(context) {
    return function(req, res, next) {
        if (!req.session.user && req.baseUrl !== '/login') {
            res.redirect('login');
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
        if(typeof res.template.error !== 'undefined') {
            console.log('Available error:', res.template.error);
        }
        if(typeof res.template.data !== 'undefined') {
            console.log('Available data:', res.template.data);
        }
        res.sendFile(context.publicRoot + res.template.url);
    }
}

