var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LogAggregate');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  date:Number,
  month:String,
  year:Number,
  time:String,
  mode:String,
  size:Number,
  source_ip:String,
  download:String
});
var User = mongoose.model('User', userSchema,'AllLogsData');
module.exports = User;
