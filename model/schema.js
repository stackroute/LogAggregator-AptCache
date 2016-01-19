var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LogAggregate');

var Schema = mongoose.Schema;
var logSchema = new Schema({
  date:Number,
  month:String,
  year:Number,
  time:String,
  mode:String,
  size:Number,
  source_ip:String,
  download:String
});
var Logs = mongoose.model('Logs', logSchema,'AllLogsData');
module.exports = Logs;
