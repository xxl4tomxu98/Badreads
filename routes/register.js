const express = require('express');

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router()

const db = require("../db/models");

const { User, Shelf, Review } = db;

//register page with genres
router.get('/register',  (req, res) => {
    const user = db.User.build();
    res.render('register', {
      title: 'Register',
      user,
    });
  });
  
  module.exports = router