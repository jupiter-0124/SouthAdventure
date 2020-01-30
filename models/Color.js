var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

var ColorSchema = new mongoose.Schema({
  color: String,
}, {timestamps: true});

ColorSchema.methods.toJSON = function(){
  return {
    color_id: this._id,
    color: this.color,
  };
};

mongoose.model('Color', ColorSchema);
