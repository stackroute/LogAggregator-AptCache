var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var configSchema = new Schema({
  years:Object,
  months:Object,
  modes:Object
},{collection: "ConfigData"});

module.exports = configSchema;
