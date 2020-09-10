const express = require('express');
const { asyncHandler } = require('../utils');
const { Book , Genre, Review } = require('../db/models')

const router = express.Router()

// router.get('/:id(\\d+)', asyncHandler( async(req, res) => {
//     const bookId = parseInt(req.params.id, 10)
//     const review = await Review.findAll({
//         where: {
//             book_id: bookId
//         }
//     })
//     res.json({ review })
// }))

router.post('/:id(\\d+)', asyncHandler( async(req, res) => {
    const description = req.body.description
    const userId = req.body.user_id
    const bookId = req.body.book_id
    const review = await Review.create({ description, user_id: userId, book_id: bookId  })

    res.status(201).json({ review })
}))

module.exports = router