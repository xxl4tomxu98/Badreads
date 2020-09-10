const express = require('express');
const { asyncHandler } = require('../utils');
const { Book , Genre , Review} = require('../db/models')

const router = express.Router()
const noBookFoundErrorHandler = (id) => {
    const err = new Error(`No Book found with id ${id}`)

    err.title = 'Book Not Found'
    err.status = 404

    return err
}

router.get('/:id(\\d+)', asyncHandler( async(req, res, next) => {
    const bookId = parseInt(req.params.id, 10)
    const book = await Book.findByPk(bookId, {
        include: {model: Genre}
    })
    // const read = 
    // console.log(read)
    if(book){
        res.json({ book })
    } else {
        next( noBookFoundErrorHandler(bookId) )

    }
   
}))






module.exports = router