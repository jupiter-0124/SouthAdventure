var mongoose = require('mongoose');
var router = require('express').Router();
var Color = mongoose.model('Color');
var auth = require('../auth');

router.post('/', auth.required, function(req, res, next){
  if(!req.body.color){
    return res.status(422).json({errors: {color: "This field is required"}});
  }

  Color.findOne({color: req.body.color}).then(function(color){
    if(color) {
      return res.status(409).json({errors: {color: "Color already exists"}});
    }
    var item = new Color();
    item.color = req.body.color;
    
    item.save().then(function() {
      return res.status(200).json({color: item.toJSON()});
    }).catch(next);
  }).catch(next);
});

router.get('/', auth.required, function(req, res, next){
  Color.find().then(function(items) {
    return res.status(200).json({colors: items.map(function(item){
      return item.toJSON();
    })});
  }).catch((err) => {
    console.log(err);
    return res.status(401).json({errors: err});
  });
});

router.get('/:color_id', auth.required, function(req, res, next){
  Color.findById(req.params.color_id).then(function(item) {
    if(item) {
      return res.status(200).json({color: item.toJSON()});
    } else {
      return res.status(404).json({errors: {color: "Color does not exist"}});
    }
  }).catch(next);
});

router.put('/:color_id', auth.required, function(req, res, next){
  if(!req.body.color){
    return res.status(422).json({errors: {color: "This field is required"}});
  }

  Color.findOne({color: req.body.color}).then(function(color){
    if(color) {
      return res.status(409).json({errors: {color: "Color already exists"}});
    }
    Color.findById(req.params.color_id).then(function(item) {
      if(item) {
        item.color = req.body.color;
        item.save().then(function() {
          return res.status(200).json({color: item.toJSON()});
        }).catch(next);
      } else {
        return res.status(404).json({errors: {color: "Color does not exist"}});
      }
    }).catch(next);
  }).catch(next);
});

router.delete('/:color_id', auth.required, function(req, res, next){
  console.log(req.params.color_id);
  Color.findById(req.params.color_id).then(function(item) {
    if(item) {
      Color.findByIdAndRemove(req.params.color_id).then(function(){
        return res.status(200).json({success: 'success'});
      }).catch(next);
    } else {
      return res.status(404).json({errors: {color: "Color does not exist"}});
    }
  }).catch(next);
});

module.exports = router;
