const express = require('express');

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router()

const db = require("../db/models");

const { Genre, User, Shelf, Review } = db;

//register page with genres
router.get('/', asyncHandler(async (req, res) => {
  const genres = await Genre.findAll({
    order: [['name', 'ASC']]
  })
  console.log(genres);
  res.render('register', {
    title: 'Register',
    genres
  });
}));


module.exports = router
