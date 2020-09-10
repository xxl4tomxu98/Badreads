const express = require('express');
const { asyncHandler } = require('../utils');
const { Book, Genre, Review } = require('../db/models');
const router = express.Router()



//   /books
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10)

    //weird querying for ordering join tables, only works with double square brackets for some reason
    const book = await Book.findByPk(bookId, {
        include: [{model: Genre}, {model: Review}],
        order: [[Review, 'createdAt','DESC']]
    })
    console.log(book)
    res.render('book', {
        book
    
        }
    )
}))

module.exports = router