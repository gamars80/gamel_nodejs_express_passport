const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;


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

passport.use('local', new LocalStrategy({usernameField:'email', passwordField: 'password'},
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
            console.log('222222222222');

            user.comparePassword(password, (err, isMatch) => {
                console.log('errr'+ err);
                if (err) return done(err);

                if (isMatch) {
                    return done(null, user);
                }

                return done(null, false, { msg: 'Invalid email or password.' })
            })

        })
    }
));