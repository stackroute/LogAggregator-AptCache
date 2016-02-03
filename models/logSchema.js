var mongoose = require('mongoose');
//mongoose.createConnection('mongodb://172.23.238.253:27018/LogAggregate');
// mongoose.connect('mongodb://localhost/LogAggregate');

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
},{collection: "AllLogsData"});
//var logAptCache = mongoose.model('logAptCache', logSchema,'AllLogsData');
module.exports = logSchema;
