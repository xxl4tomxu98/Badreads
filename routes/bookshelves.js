const express = require('express');
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router()

const db = require("../db/models");

const { User, Shelf, Review } = db;

router.get('/', async(req, res) => {
    res.render('my-books')
});

module.exports = router;
