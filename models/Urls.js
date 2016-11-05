var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    original: String,
    shorten: { type: String, required: true }
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;