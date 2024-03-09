const passport = require('passport');
const { google_client_id, google_client_secret, google_callback_url } = require('../config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: google_client_id,
    clientSecret: google_client_secret,
    callbackURL: google_callback_url
}, (accessToken, refreshToken, profile, done) => {
    // You can create or update user information here

    const user = {
        authenticationId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        authenticationProvider: 'google'
    };
    return done(null, user);
}));

module.exports = passport;