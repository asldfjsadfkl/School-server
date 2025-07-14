const USER = require('../Models/User');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
exports.connectGoogleAuth = async () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENT_SECURE,
        callbackURL: process.env.CALLBACK_URL
    }, async function (accessToken, refreshToken, profile, done) {
        try {
            let user = await USER.findOne({ email: profile.emails[0].value });

            if (!user) {
                const newUser = await USER.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    phone: 404,
                    password: "password cant show google auth",
                    googleId: profile.id
                });
                const token = newUser.createToken();
                done(null, { newUser, token });

            }

            else if (user && !user.googleId) {

                await USER.findByIdAndUpdate(user._id, {
                    googleId: profile.id
                });
                const token = user.createToken();
                done(null, { user, token });

            }
            else if (user && user.googleId) {

                const token = user.createToken();
                done(null, { user, token });
            }

        } catch (error) {

            if (error.code === 11000) {
                done(`User already registerd.`);
            }
        }
    }))


}