const express = require('express');
const { asyncHandler } = require('../utils');
const { Book } = require('../db/models');
const router = require('./landing');



//   /books
router.get('/:id(\\d+)', (req, res) => {
    res.render('book')
})

module.exports= router