const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
    //bcrypt compare 비교
    //plainPassword => 클라이언트에서 온 비번
    //this.password => db에 있는 비번
    if(plainPassword  === this.password) {
        callback(null, true);
    } else{
        callback(null, false);
    }

    return callback({error: 'compare error'});
}

const User = mongoose.model('User', userSchema);



module.exports = User;