const express = require('express');
const { asyncHandler } = require('../utils');
const { Book } = require('../db/models')

const router = express.Router()
const noBookFoundErrorHandler = (id) => {
    const err = new Error(`No Book found with id ${id}`)

    err.title = 'Book Not Found'
    err.status = 404

    return err
}

router.get('/:id(\\d+)', asyncHandler( async(req, res, next) => {
    const bookId = parseInt(req.params.id, 10)
    const book = await Book.findByPk(bookId)

    if(book){
        res.json({ book })
    }

    next( noBookFoundErrorHandler(bookId) )
}))




module.exports = router