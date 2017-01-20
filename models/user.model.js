var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
  isLoggedIn: {type: Boolean},
  name: {type: String},
  password: {type: String},
  number: {type: String}
});
module.exports = mongoose.model('User', UserSchema);
