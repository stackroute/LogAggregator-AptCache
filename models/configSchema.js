var mongoose = require('mongoose');
//mongoose.connect('mongodb://172.23.238.253:27018/LogAggregate');

var Schema = mongoose.Schema;
var configSchema = new Schema({
  years:Object,
  months:Object,
  modes:Object
},{collection: "ConfigData"});
//var Config = mongoose.model('Config', configSchema,'ConfigData');
module.exports = configSchema;
