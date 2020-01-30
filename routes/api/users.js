var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.post('/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "This field is required"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "This field is required"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toJSON()});
    } else {
      return res.status(422).json({errors: { invalidCredentials: 'Invalid Email or Password' }});
    }
  })(req, res, next);
});

router.post('/register', function(req, res, next){
  User.findOne({email: req.body.email}).then(function(user1){
    if(user1) {
      return res.status(409).json({errors: { email: 'Email already exists' }});
    }

    var user = new User();
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.name = req.body.name;
  
    user.save().then(function(){
      return res.json({user: user.toJSON()});
    }).catch(next);
  }).catch(next);
});

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toJSON()});
  }).catch(next);
});

router.get('/user/:id', auth.required, function(req, res, next){
  User.findById(req.params.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toJSON()});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }
    if(typeof req.body.user.name !== 'undefined'){
      user.name = req.body.user.name;
    }

    return user.save().then(function(){
      return res.json({user: user.toJSON()});
    });
  }).catch(next);
});

module.exports = router;
