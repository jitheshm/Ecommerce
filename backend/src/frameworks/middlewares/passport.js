const passport = require('passport');
const { google_client_id, google_client_secret, google_callback_url, facebook_client_id, facebook_client_secret, facebook_callback_url } = require('../config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy; 

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

passport.use(new FacebookStrategy({
    clientID: facebook_client_id,
    clientSecret: facebook_client_secret,
    callbackURL: facebook_callback_url,
    profileFields: ['id', 'displayName']
},
    function (accessToken, refreshToken, profile, done) {
        const user = {
            authenticationId: profile.id,
            authenticationProvider: 'facebook'
        };
        return done(null, user);
    }
));

module.exports = passport;