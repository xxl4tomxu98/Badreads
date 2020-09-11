const express = require('express');

const router = express.Router()


//landing page pug will render a sign in and sign up form
router.get("/", (req, res) => {
  res.render('landing');
});


module.exports = router;
