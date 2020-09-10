const express = require('express');
const { asyncHandler } = require('../utils');
const { Book, Genre, Review } = require('../db/models');
const router = express.Router()
const sequelize = require('sequelize');
const Op = sequelize.Op



//   /books
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10)

    //weird querying for ordering join tables, only works with double square brackets for some reason
    const book = await Book.findByPk(bookId, {
        include: [{ model: Genre }, { model: Review }],
        order: [[Review, 'createdAt', 'DESC']]
    })
    res.render('book', {
        book
    }
    )
}))

//   /books/search
// how to use a search field
// router.get('/search', asyncHandler(async (req, res) => {
//     const { term } = req.query
//     console.log(term)

//     const books = await Book.findAll({
//         where: {

//             [Op.or]: [
//                 {
//                     author: {
//                         [Op.iLike]: `%${term}%`,
//                     }
//                 },
//                 {
//                     title: {
//                         [Op.iLike]: `%${term}%`,
//                     }
//                 }
//             ]

//         },
//         order: [['title', 'ASC']]
//     })
//     res.render('search-results', {
//         books
//     }
//     )

// }))

module.exports = router