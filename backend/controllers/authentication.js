const jwt = require('jwt-simple');
const User = require('../models/User');
const { secret } = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = (req, res) => {
    res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
    const { email } = req.body;
    const { password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: 'Email and password must be provided' });
    }

    return User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({ error: 'Email is already in use...' });
        }

        const user = new User({
            email,
            password,
        });

        return user.save(e => {
            if (e) {
                return next(e);
            }
            return res.json({ token: tokenForUser(user) });
        });
    });
};
