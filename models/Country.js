var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

var CountrySchema = new mongoose.Schema({
  country: String,
}, {timestamps: true});

CountrySchema.methods.toJSON = function(){
  return {
    country_id: this._id,
    country: this.country,
  };
};

mongoose.model('Country', CountrySchema);
