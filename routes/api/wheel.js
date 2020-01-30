var mongoose = require('mongoose');
var router = require('express').Router();
var Wheel = mongoose.model('Wheel');
var auth = require('../auth');
var multer = require('multer');

router.post('/', auth.required, function(req, res, next){
  
  var storage = multer.diskStorage({
    destination: 'image',
    filename: function (req1, file, cb) {
      const ext = '.' + file.mimetype.substring(6)
      const timeStampInMs = Date.now().toString();
      cb(null, timeStampInMs + ext)
    }
  });

  var upload = multer({storage: storage}).any();
  upload(req, res, function (err) {
    if(err) {
      console.log(err);
      return res.json({errors: {image: 'Error'}})
    }
    
    // console.log(req.body);
    var item = new Wheel();
    item.make_id = req.body.make_id;
    item.model = req.body.model;
    console.log(JSON.stringify(req.files));
    if(req.files[0]) {
      item.image = req.files[0].path;
    }
    item.year = req.body.year;
    item.lugpattern_id = req.body.lugpattern_id;
    item.diameter = req.body.diameter;
    item.widthfront = req.body.widthfront;
    item.widthrear = req.body.widthrear;
    item.offsetfront = req.body.offsetfront;
    item.offsetrear = req.body.offsetrear;
    item.color_id = req.body.color_id;

    item.save().then(function() {
      return res.status(200).json({wheel: item.toJSON()});
    }).catch(next);
  });
});

router.get('/', auth.required, function(req, res, next){
  Wheel.find().then(function(items) {
    return res.status(200).json({wheels: items.map(function(item){
      return item.toJSON();
    })});
  }).catch(next);
});

router.get('/:wheel_id', auth.required, function(req, res, next){
  Wheel.findById(req.params.wheel_id).then(function(item) {
    if(item) {
      return res.status(200).json({wheel: item.toJSON()});
    } else {
      return res.status(404).json({errors: {wheel: "does not exist"}});
    }
  }).catch(next);
});

router.put('/:wheel_id', auth.required, function(req, res, next){
  Wheel.findById(req.params.wheel_id).then(function(item) {
    if(item) {
      var storage = multer.diskStorage({
        destination: 'image',
        filename: function (req1, file, cb) {
          const ext = '.' + file.mimetype.substring(6)
          const timeStampInMs = Date.now().toString();
          cb(null, timeStampInMs + ext)
        }
      });
    
      var upload = multer({storage: storage}).any();
      upload(req, res, function (err) {  
        item.make_id = req.body.make_id;
        item.model = req.body.model;
        if(req.files[0]) {
          item.image = req.files[0].path;
        }
        item.year = req.body.year;
        item.lugpattern_id = req.body.lugpattern_id;
        item.diameter = req.body.diameter;
        item.widthfront = req.body.widthfront;
        item.widthrear = req.body.widthrear;
        item.offsetfront = req.body.offsetfront;
        item.offsetrear = req.body.offsetrear;
        item.color_id = req.body.color_id;
    
        item.save().then(function() {
          return res.status(200).json({wheel: item.toJSON()});
        }).catch(next);
      });    
    } else {
      return res.status(404).json({errors: {make: "does not exist"}});
    }
  }).catch(next);
});

router.delete('/:wheel_id', auth.required, function(req, res, next){
  Wheel.findById(req.params.wheel_id).then(function(item) {
    if(item) {
      Wheel.findByIdAndRemove(req.params.wheel_id).then(function(){
        return res.status(200).json({success: 'success'});
      }).catch(next);
    } else {
      return res.status(404).json({errors: {wheel: "does not exist"}});
    }
  }).catch(next);
});

module.exports = router;
