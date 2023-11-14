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

// userSchema.methods.comparePassword = function(plainPassword, callback) {
//     //bcrypt compare 비교
//     //plainPassword => 클라이언트에서 온 비번
//     //this.password => db에 있는 비번

//     console.log('plainPassword::'+plainPassword);
//     console.log('this.password'+ this.password);
//     if(plainPassword  === this.password) {
//         callback(null, true);
//     } else{
//         callback(null, false);
//     }

//     if (err) return cb(err);
//         cb(null, isMatch);

//     return callback({error: 'compare error'});
// }

userSchema.methods.comparePassword = function (plainPassword, cb) {
    console.log('plainPassword::'+plainPassword);
    console.log('this.password'+ this.password);
    // bcrypt compare 비교 
    // plain password  => client , this.password => 데이터베이스에 있는 비밀번호
    // bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    // })

    if(plainPassword  === this.password) {
        console.log('ddddddddddddddddddddddddddd');
        cb(null, true);
    }
}
const User = mongoose.model('User', userSchema);



module.exports = User;