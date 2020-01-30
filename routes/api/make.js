var mongoose = require('mongoose');
var router = require('express').Router();
var Make = mongoose.model('Make');
var auth = require('../auth');

router.post('/', auth.required, function(req, res, next){
  if(!req.body.make){
    return res.status(422).json({errors: {make: "This field is required"}});
  }
  if(!req.body.country_id){
    return res.status(422).json({errors: {country_id: "This field is required"}});
  }

  Make.findOne({make: req.body.make}).then(function(make){
    if(make) {
      return res.status(409).json({errors: {make: "Make already exists"}});
    }
    var item = new Make();
    item.make = req.body.make;
    item.country_id = req.body.country_id;
    
    item.save().then(function() {
      return res.status(200).json({make: item.toJSON()});
    }).catch(next);
  }).catch(next);
});

router.get('/', auth.required, function(req, res, next){
  Make.find().then(function(items) {
    return res.status(200).json({makes: items.map(function(item){
      return item.toJSON();
    })});
  }).catch((err) => {
    console.log(err);
    return res.status(401).json({errors: err});
  });
});

router.get('/:make_id', auth.required, function(req, res, next){
  Make.findById(req.params.make_id).then(function(item) {
    if(item) {
      return res.status(200).json({make: item.toJSON()});
    } else {
      return res.status(404).json({errors: {make: "Make does not exist"}});
    }
  }).catch(next);
});

router.put('/:make_id', auth.required, function(req, res, next){
  if(!req.body.make){
    return res.status(422).json({errors: {make: "This field is required"}});
  }
  if(!req.body.country_id){
    return res.status(422).json({errors: {country_id: "This field is required"}});
  }

  Make.findOne({make: req.body.make}).then(function(make){
    if(make) {
      return res.status(409).json({errors: {make: "Make already exists"}});
    }
    Make.findById(req.params.make_id).then(function(item) {
      if(item) {
        item.make = req.body.make;
        item.country_id = req.body.country_id;
        item.save().then(function() {
          return res.status(200).json({make: item.toJSON()});
        }).catch(next);
      } else {
        return res.status(404).json({errors: {make: "Make does not exist"}});
      }
    }).catch(next);
  }).catch(next);
});

router.delete('/:make_id', auth.required, function(req, res, next){
  Make.findById(req.params.make_id).then(function(item) {
    if(item) {
      Make.findByIdAndRemove(req.params.make_id).then(function(){
        return res.status(200).json({success: 'success'});
      }).catch(next);
    } else {
      return res.status(404).json({errors: {make: "Make does not exist"}});
    }
  }).catch(next);
});

module.exports = router;
