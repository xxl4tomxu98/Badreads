const express = require('express');

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router()

const db = require("../db/models");

const { User, Shelf, Review } = db;

//register page with genres
router.get('/',  (req, res) => {
    res.render('register', {
      title: 'Register'
    });
  });
  
  module.exports = router