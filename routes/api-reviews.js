const express = require('express');
const { asyncHandler } = require('../utils');
const { Review } = require('../db/models')
const { requireAuth } = require("../auth");
const jwt = require('jsonwebtoken');

const router = express.Router()

router.use(requireAuth)

//api-reviews/books/:bookid
router.post('/books/:bookid(\\d+)', asyncHandler( async(req, res) => {
    //to get current user id from token
    const { token } = req
    const { id } = jwt.decode(token).data

    const bookId = parseInt(req.params.bookid, 10)
    const description = req.body.description
    const review = await Review.create({ description, user_id: id, book_id: bookId  })

    const reviews = await Review.findAll({
        where: {
            book_id: bookId
        }
    })

    res.status(201).json({ review, reviews })
}))

module.exports = router