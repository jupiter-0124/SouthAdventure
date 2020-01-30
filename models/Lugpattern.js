var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

var LugpatternSchema = new mongoose.Schema({
  lugpattern: String,
}, {timestamps: true});

LugpatternSchema.methods.toJSON = function(){
  return {
    lugpattern_id: this._id,
    lugpattern: this.lugpattern,
  };
};

mongoose.model('Lugpattern', LugpatternSchema);
