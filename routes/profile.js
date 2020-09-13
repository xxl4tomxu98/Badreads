const express = require('express');

const router = express.Router()


// user/profile


router.get('/', async(req, res) => {

  res.render('profile');
});



module.exports = router;
