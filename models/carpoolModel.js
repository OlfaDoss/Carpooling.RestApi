var mongoose = require('../db').mongoose;var Schema   = mongoose.Schema;var carpoolSchema = new Schema({    'id' : {type : Number,index:true, unique: true,required: true },	'title' : String,	'start' : String,	'end' : String,	'frequence' : String,	'time' : String,	'car' : String,	'available_seats' : Number,	'price' : Number,	'smoke_authorise' : Boolean,	"driver": {		"firstname": String,		"lastname": String,		"birthday": String,		"phone": Number,		"sexe": String,	}});carpoolSchema.index({'$**': 'text'});module.exports = mongoose.model('carpool', carpoolSchema);