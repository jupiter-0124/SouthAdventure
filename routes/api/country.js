var mongoose = require('mongoose');
var router = require('express').Router();
var Country = mongoose.model('Country');
var auth = require('../auth');

router.post('/', auth.required, function(req, res, next){
  if(!req.body.country){
    return res.status(422).json({errors: {country: "This field is required"}});
  }

  Country.findOne({country: req.body.country}).then(function(country){
    if(country) {
      return res.status(409).json({errors: {country: "Country already exists"}});
    }
    var item = new Country();
    item.country = req.body.country;
    
    item.save().then(function() {
      return res.status(200).json({country: item.toJSON()});
    }).catch(next);
  }).catch(next);
});

router.get('/', auth.required, function(req, res, next){
  Country.find().then(function(items) {
    return res.status(200).json({countries: items.map(function(item){
      return item.toJSON();
    })});
  }).catch((err) => {
    console.log(err);
    return res.status(401).json({errors: err});
  });
});

router.get('/:country_id', auth.required, function(req, res, next){
  Country.findById(req.params.country_id).then(function(item) {
    if(item) {
      return res.status(200).json({country: item.toJSON()});
    } else {
      return res.status(404).json({errors: {country: "Country does not exist"}});
    }
  }).catch(next);
});

router.put('/:country_id', auth.required, function(req, res, next){
  if(!req.body.country){
    return res.status(422).json({errors: {country: "This field is required"}});
  }

  Country.findOne({country: req.body.country}).then(function(country){
    if(country) {
      return res.status(409).json({errors: {country: "Country already exists"}});
    }
    Country.findById(req.params.country_id).then(function(item) {
      if(item) {
        item.country = req.body.country;
        item.save().then(function() {
          return res.status(200).json({country: item.toJSON()});
        }).catch(next);
      } else {
        return res.status(404).json({errors: {country: "Country does not exist"}});
      }
    }).catch(next);
  }).catch(next);
});

router.delete('/:country_id', auth.required, function(req, res, next){
  Country.findById(req.params.country_id).then(function(item) {
    if(item) {
      Country.findByIdAndRemove(req.params.country_id).then(function(){
        return res.status(200).json({success: 'success'});
      }).catch(next);
    } else {
      return res.status(404).json({errors: {country: "Country does not exist"}});
    }
  }).catch(next);
});

module.exports = router;
