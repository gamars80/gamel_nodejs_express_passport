const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//req.login(user)
//세션 생성
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// client에서 세션데이터를 가지고 req를 보내면 
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})

const localStrategyConfig = new LocalStrategy({usernameField:'email', passwordField: 'password'},
    (email, password, done) => {
        console.log('email:::'+email);
        User.findOne({
            email: email.toLocaleLowerCase()
        }, (err, user) => {
            if(err) return done(err);
            console.log(user);
            if(!user) {
                return done(null, false, {msg:`Email ${email} not found`});
            }
          
            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err);

                if (isMatch) {
                    return done(null, user);
                }

                return done(null, false, { msg: 'Invalid email or password.' })
            })
        })
    }
);

passport.use('local',localStrategyConfig);

const googleClientId = '409562904408-5fs0vd764k2sn0dtcq0bnn09f477aqm8.apps.googleusercontent.com';
const googleClientSecret = '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';
const googleStrategyConfig = new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
    console.log('profle', profile );
    User.findOne({googleId: profile.id}, (err, existingUser) => {
        if(err) return done(err);

        if(existingUser) {
            return done(null, existingUser);
        }else {
            const user = new User();
            user.email = profile.emails[0].value;
            user.googleId = profile.id;
            user.save((err) => {
                console.log(err);
                if(err) { return done(err); }
                done(null, user);
            })
        }
    })
});

passport.use('google',googleStrategyConfig);