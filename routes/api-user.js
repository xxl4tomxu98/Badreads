const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { asyncHandler, handleValidationErrors } = require("../utils");
const { requireAuth } = require("../auth");
const {Shelf, Book, Books_Shelf} = require('../db/models');

const router = express.Router()
router.use(requireAuth)

const bookshelfNotFoundError = (id) => {
  const err = Error("Bookshelf not found");
  err.errors = [`Bookshelf with id of ${id} could not be found.`];
  err.title = "Bookshelf not found.";
  err.status = 404;
  return err;
};

const validatebookShelf = [
  check("newBookshelfName")
    .exists({ checkFalsy: true })
    .withMessage("Bookshelf can't be empty."),
  //  bookshelf name cannot be longer than 80 characters:
  check("newBookshelfName")
    .isLength({ max: 80 })
    .withMessage("Bookshelf name can't be longer than 80 characters."),
  handleValidationErrors,
];

// create the bookshelves list (grab the shelves)
//api-user/shelves
router.get("/shelves",
  asyncHandler(async (req, res) => {
    try{

    const shelves = await Shelf.findAll({
      where: {
        user_id : 2
        // user_id: 2
      },
      order: [["createdAt", "DESC"]],
    });
    res.json({ shelves });
  }catch(e){
    console.log(e)
  }
}));

// add the bookshelf to database
/* router.post("/new-shelf", */
//post req to /api-user/shelves
router.post("/new-shelf",
  validatebookShelf,
  asyncHandler(async (req, res) => {
    console.log('in post request')
    const { newBookshelfName } = req.body;
    console.log('newBookshelfName', newBookshelfName)
    const bookshelf = await Shelf.create({ name: newBookshelfName, user_id: 2});
    // const bookshelf = await bookShelf.create({ name, user_id: 2 });
    return res.json({ bookshelf });
  })
);


// get specific bookshelf books

//api-user/shelves/:bookshelfid
router.get("/shelves/:bookshelfid",
  asyncHandler(async (req, res, next) => {
    const shelf = await Shelf.findOne({
      where: {
        id: req.params.bookshelfid,
      },
      include: Book
    });
    if (shelf) {
      res.json({ shelf });
    } else {
      next(bookshelfNotFoundError(req.params.bookshelfid));
    }
  })
);

// delete bookshelf

//api-user/shelves/:bookshelfid
router.delete(
  "/shelves/:bookshelfid",
  asyncHandler(async (req, res, next) => {
    const bookshelf = await Shelf.findOne({
      where: {
        id: req.params.bookshelfid,
      },
    });
    if (userId !== bookshelf.user_id) {
    // if (2 !== bookshelf.user_id) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this tweet.";
      err.title = "Unauthorized";
      throw err;
    }
    if (bookshelf) {
      await bookshelf.destroy();
      res.json({ message: `Deleted bookshelf with id of ${req.params.bookshelfid}.` });
    } else {
      next(bookshelfNotFoundError(req.params.bookshelfid));
    }
  })
);

// Get the bookshelves except the shelves that have that book
// Except the current bookshelf

//api-user/shelves/:bookshelfid/books/:bookid
router.get("/excluded-shelves/books/:bookid",
  asyncHandler(async (req, res) => {
//code grabs all shelves for user with book and all shelves in db then filters out all shelves by excluding
//the shelves found for the user with the book
    const bookId = req.params.bookid;
    //all shelves for the user that have the specified book
    const shelves = await Shelf.findAll({
      where: {
        user_id : 2,
      },
      include: {
        model: Book, where: {id: bookId}
      }
    });
    //all shelves in db
    const allShelves = await Shelf.findAll();
    //shelf id's for all user shelves with specific book
    let includedShelf = [];
    for (let shelf of shelves) {
      includedShelf.push(shelf.id);
    };
    //array of all shelves in db
    let allShelvesArray = [];
    for (let shelf of allShelves) {
      allShelvesArray.push(shelf);
    };

    //filters array for all shelves in db to have all shelves that don't contain the book already
    const allShelvesWithoutBook = allShelvesArray.filter(function(shelf) {
      if (!includedShelf.includes(shelf.id)) {
        return shelf;
      }
    });
      //return as an obj containing the filtered array of objects
    res.json({ allShelvesWithoutBook });
}));

// GET request for the description, author, title, findByPk
router.get("/shelves/:bookshelfid/books/:bookid",
  asyncHandler(async (req, res) => {
    const bookId = req.params.bookid;
    const bookshelfId = req.params.bookshelfid;
    const book = await Book.findByPk(bookId, {
      include: { model: Shelf,
        where: {
          id: bookshelfId
        }
      },
    });
    res.json({ book });
}));


// Add the book to selected shelf in the database

router.post("/:bookid/add-book-to-shelf",
/* // post to /api-user/shelves/:shelfid/books/:bookid
router.post("/shelves/:bookshelfid/books/:bookid", */
  asyncHandler(async (req, res, next) => {
  const bookId = req.params.bookid;
  const { bookshelfId } = req.body ;
  const bookshelf = await Shelf.findByPk(bookshelfId);
  const book = await Book.findByPk(bookId)
  if (bookshelf) {
    await bookshelf.addBook(book);
    res.json({bookshelf});
  } else {
    next(bookshelfNotFoundError(req.params.bookshelfId));
  };
}));

// Get books on a specific shelf
router.get('/:id/books',
  asyncHandler(async (req, res) => {
    console.log('req.params.id', req.params.id);
    const books = await Book.findAll({
      include: { model: Shelf,
        where: {
          id: req.params.id,
        },
      },
    });
    res.json({ books });
}));


// delete book from a bookshelf
//should be /api-use/shelves/:bookshelfid/books/:bookid
router.delete("/:bookshelfid/books/:bookid",
  asyncHandler(async(req, res) => {
    const bookId = req.params.bookid;
    // const { bookshelf } = req.body.bookshelf;

    const book = await Book.findByPk(bookId);
    const bookshelf = await Shelf.findByPk(bookshelfId, {
      include: Book
    });

    const updatedBooks = await Book.findAll({
      where: {
        [Op.not]: {
          id: bookId
        }
      },
      include: { model: Shelf,
        where: {
          id: bookshelfId,
        }
      },
    });

    const bookOnShelf = await Books_Shelf.findOne({
      where: {
        book_id: bookId,
        shelf_id: bookshelfId
      }
    });

    await bookOnShelf.destroy();

    res.json({ message: `Removed ${book.title} by ${book.author} from your bookshelf, ${bookshelf.name}`, updatedBooks });
  }));





module.exports = router;
