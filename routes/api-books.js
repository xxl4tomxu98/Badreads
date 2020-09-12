const express = require('express');
const { asyncHandler } = require('../utils');
const { Book , Genre} = require('../db/models')
const { requireAuth } = require("../auth");
   

const router = express.Router()

router.use(requireAuth)

const noBookFoundErrorHandler = (id) => {
    const err = new Error(`No Book found with id ${id}`)

    err.title = 'Book Not Found'
    err.status = 404

    return err
}


//grab a specific book
//api-books/bookid
router.get('/:bookid(\\d+)', asyncHandler( async(req, res, next) => {
    const bookId = parseInt(req.params.bookid, 10)
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