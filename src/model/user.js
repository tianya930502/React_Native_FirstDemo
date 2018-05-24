var mongoose = require('mongose');
mongoose.connect('mongodb://localhost/Table');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username   : String,
    password   : String,
    id    : String,
    phone : String,
    email  : String
})

var User = mongoose.model('User', userSchema);
console.log(User);
module.exports = User;
