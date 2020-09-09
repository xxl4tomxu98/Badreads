const express = require('express');
const { asyncHandler } = require('../utils');
const { Book } = require('../db/models');
const router = express.Router()



//   /books
router.get('/:id(\\d+)', (req, res) => {
    // const bookId = parseInt(req.params.id, 10)
    // const book = await Book.findByPk(bookId, 
    //     {
    //         include: Genre
    //     })
    // const {
    //      id,
    //      author,
    //      title,
    //      description,
    //      genres
    //     } = book
    //     console.log()
    res.render('book')
})

module.exports = router