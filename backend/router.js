const passport = require('passport');
const Authentication = require('./controllers/authentication');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', {
    session: false,
});
const requireSignIn = passport.authenticate('local', {
    session: false,
});

module.exports = app => {

    // Test endpoint
    app.get('/api/', (req, res) => {
        res.send('200OK');
    });

    // Validate user
    app.get('/api/validate', requireAuth, (req, res) => {
        res.send({
            user: req.user.email,
        });
    });

    // Login user
    app.post('/api/login', requireSignIn, Authentication.signin);

    // Register user
    app.post('/api/register', Authentication.signup);
};
