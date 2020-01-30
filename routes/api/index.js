var router = require('express').Router();

router.use('/', require('./users'));
router.use('/color', require('./colors'));
router.use('/lugpattern', require('./lugpattern'));
router.use('/country', require('./country'));
router.use('/make', require('./make'));
router.use('/wheel', require('./wheel'));

router.get('/image/:image_id', (req, res) => {
  res.sendFile(req.params.image_id, {root: 'image'});
})

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;