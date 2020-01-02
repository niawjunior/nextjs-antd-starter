const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const { secret } = require('../config');


// setting local strategy:
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        return user.comparePasswords(password, (e, isMatch) => {
            if (e) {
                return done(e);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});



// setting the jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub)
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch((err) => done(err, false));
});


// tell passport to use defined strategies:
passport.use(jwtLogin);
passport.use(localLogin);
