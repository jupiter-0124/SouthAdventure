var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

var MakeSchema = new mongoose.Schema({
  make: String,
  country_id: String,
}, {timestamps: true});

MakeSchema.methods.toJSON = function(){
  return {
    make_id: this._id,
    make: this.make,
    country_id: this.country_id,
  };
};

mongoose.model('Make', MakeSchema);
