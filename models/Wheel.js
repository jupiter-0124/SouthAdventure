var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

var WheelSchema = new mongoose.Schema({
  make_id: String,
  model: String,
  image: String,
  year: SchemaTypes.Number,
  lugpattern_id: String,
  diameter: SchemaTypes.Number,
  widthfront: SchemaTypes.Number,
  widthrear: SchemaTypes.Number,
  offsetfront: SchemaTypes.Number,
  offsetrear: SchemaTypes.Number,
  color_id: String,
}, {timestamps: true});

WheelSchema.methods.toJSON = function(){
  return {
    wheel_id: this._id,
    make_id: this.make_id,
    model: this.model,
    image: 'http://54.67.113.64:3000/api/' + this.image,
    year: this.year,
    lugpattern_id: this.lugpattern_id,
    diameter: this.diameter,
    widthfront: this.widthfront,
    widthrear: this.widthrear,
    offsetfront: this.offsetfront,
    offsetrear: this.offsetrear,
    color_id: this.color_id,
  };
};

mongoose.model('Wheel', WheelSchema);
