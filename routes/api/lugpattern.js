var mongoose = require('mongoose');
var router = require('express').Router();
var Lugpattern = mongoose.model('Lugpattern');
var auth = require('../auth');

router.post('/', auth.required, function(req, res, next){
  if(!req.body.lugpattern){
    return res.status(422).json({errors: {lugpattern: "This field is required"}});
  }

  Lugpattern.findOne({lugpattern: req.body.lugpattern}).then(function(lugpattern){
    if(lugpattern) {
      return res.status(409).json({errors: {lugpattern: "Lugpattern already exists"}});
    }
    var item = new Lugpattern();
    item.lugpattern = req.body.lugpattern;
    
    item.save().then(function() {
      return res.status(200).json({lugpattern: item.toJSON()});
    }).catch(next);
  }).catch(next);
});

router.get('/', auth.required, function(req, res, next){
  Lugpattern.find().then(function(items) {
    return res.status(200).json({lugpatterns: items.map(function(item){
      return item.toJSON();
    })});
  }).catch((err) => {
    console.log(err);
    return res.status(401).json({errors: err});
  });
});

router.get('/:lugpattern_id', auth.required, function(req, res, next){
  Lugpattern.findById(req.params.lugpattern_id).then(function(item) {
    if(item) {
      return res.status(200).json({lugpattern: item.toJSON()});
    } else {
      return res.status(404).json({errors: {lugpattern: "Lugpattern does not exist"}});
    }
  }).catch(next);
});

router.put('/:lugpattern_id', auth.required, function(req, res, next){
  if(!req.body.lugpattern){
    return res.status(422).json({errors: {lugpattern: "This field is required"}});
  }

  Lugpattern.findOne({lugpattern: req.body.lugpattern}).then(function(lugpattern){
    if(lugpattern) {
      return res.status(409).json({errors: {lugpattern: "Lugpattern already exists"}});
    }
    Lugpattern.findById(req.params.lugpattern_id).then(function(item) {
      if(item) {
        item.lugpattern = req.body.lugpattern;
        item.save().then(function() {
          return res.status(200).json({lugpattern: item.toJSON()});
        }).catch(next);
      } else {
        return res.status(404).json({errors: {lugpattern: "Lugpattern does not exist"}});
      }
    }).catch(next);
  }).catch(next);
});

router.delete('/:lugpattern_id', auth.required, function(req, res, next){
  Lugpattern.findById(req.params.lugpattern_id).then(function(item) {
    if(item) {
      Lugpattern.findByIdAndRemove(req.params.lugpattern_id).then(function(){
        return res.status(200).json({success: 'success'});
      }).catch(next);
    } else {
      return res.status(404).json({errors: {lugpattern: "Lugpattern does not exist"}});
    }
  }).catch(next);
});

module.exports = router;
