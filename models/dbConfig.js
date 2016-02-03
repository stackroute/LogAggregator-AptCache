var mongoose = require('mongoose');
//var db1 = mongoose.createConnection("mongodb://localhost/nginx");
//var db2 = mongoose.createConnection("mongodb://localhost/LogAggregate");
 var db1 = mongoose.createConnection("mongodb://172.23.238.253:27018/nginx");
var db2 = mongoose.createConnection("mongodb://172.23.238.253:27018/LogAggregate");

var userSchema = require('./log.user.model');
var serverSchema = require('./log.server.model');
var configSchema = require('./log.config.model');
var aptLogSchema = require('./logSchema');
var aptConfigSchema = require('./configSchema');

module.exports = {
  userModel : db1.model('User',userSchema),
  serverModel : db1.model('Logs',serverSchema),
  configModel : db1.model('Config',configSchema),
  aptLogModel : db2.model('aptLog',aptLogSchema),
  aptConfigModel : db2.model('aptConfig', aptConfigSchema)
};
