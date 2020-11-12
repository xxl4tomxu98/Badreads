/* Changes:
    add shelf POST request
      line 148 Changed Route Name form /new-shelf to /shelves
      line 155  fixed 'Shelf' from 'bookshelf'
      line 152 fixed from { name } to { newBookshelfName } and correlating line 153 variable
*/

const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { asyncHandler, handleValidationErrors } = require("../utils");
const { requireAuth } = require("../auth");

const jwt = require('jsonwebtoken');
const router = express.Router()
const { User, Shelf, Book, Genre, Books_Shelf, User_Genre } = require('../db/models');
const bcrypt = require('bcryptjs')

router.use(requireAuth);

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];




const bookshelfNotFoundError = (id) => {
  const err = Error("Bookshelf not found");
  err.errors = [`Bookshelf with id of ${id} could not be found.`];
  err.title = "Bookshelf not found.";
  err.status = 404;
  return err;
};



//user authorization

//create a user in database after logging in (post req from form) and returns a user and their token
router.post(
  "/",
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

//login in route to get a new token for existing user
router.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      // console.log(user, password)
      if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
      }
      const token = getUserToken(user);
      res.json({ token, user: { id: user.id } });

    } catch (err) {
      console.log(err)
    }
  })
);






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


router.get('/username', asyncHandler(async (req, res) => {
  try {
    const { token } = req
    const { id } = jwt.decode(token).data
    const user = await User.findByPk(id);
    res.json({ user });
  } catch (e) {
    console.log(e)
  }
}));


// create the bookshelves list (grab the shelves)
//api-user/shelves
router.get("/shelves",
  asyncHandler(async (req, res) => {
    try {
      const shelves = await Shelf.findAll({
        where: {
          //user_id : 2
          user_id: req.user.id
        },
        order: [["createdAt", "DESC"]],
      });
      const user = await User.findByPk(req.user.id);
      const username = user.username;
      if (shelves) {
        res.json({ shelves, username });
      } else {
        res.json('no shelves')
      }
    } catch (e) {
      console.log(e)
    }
  }));

/*
line 148 Changed Route Name form /new-shelf to /shelves
line 155  fixed 'Shelf' from 'bookshelf'
line 152 fixed from { name } to { newBookshelfName } and correlating line 153 variable
*/
// add the bookshelf to database
//post req to /api-user/shelves
router.post("/shelves",
  validatebookShelf,
  asyncHandler(async (req, res) => {
    const { newBookshelfName } = req.body;
    const bookshelf = await Shelf.create({ name: newBookshelfName, user_id: req.user.id });
    // const bookshelf = await bookShelf.create({ name, user_id: req.user.id });
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

    // if (req.user.id !== bookshelf.user_id) {
    //   const err = new Error("Unauthorized");
    //   err .status = 401;
    //   err.message = "You are not authorized to delete this bookshelf.";
    //   err.title = "Unauthorized";
    //   throw err;
    //}
    if (bookshelf) {
      const bookAndShelfConnections = await Books_Shelf.findAll({
        where: {
          shelf_id: req.params.bookshelfid
        }
      });

      for (let connection of bookAndShelfConnections) {
        await connection.destroy()
      };

      await bookshelf.destroy();
      res.json({ message: `Deleted bookshelf with id of ${req.params.bookshelfid}.` });
      res.redirect('/');
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
        user_id: req.user.id,
      },
      include: {
        model: Book, where: {
          id: bookId
        }
      }
    });

    //all shelves in db for the user
    const allShelves = await Shelf.findAll({
      where: {
        user_id: req.user.id
      }
    });
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
    const allShelvesWithoutBook = allShelvesArray.filter(function (shelf) {
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
      include: {
        model: Shelf,
        where: {
          id: bookshelfId
        }
      },
    });
    res.json({ book });
  }));


// Add the book to selected shelf in the database

router.post("/:bookid/add-book-to-shelf",
  asyncHandler(async (req, res, next) => {
    const bookId = req.params.bookid;
    const { bookshelfId } = req.body;
    const bookshelf = await Shelf.findByPk(bookshelfId);
    const book = await Book.findByPk(bookId)
    if (bookshelf) {
      await bookshelf.addBook(book);
      res.json({ bookshelf, book });
    } else {
      next(bookshelfNotFoundError(req.params.bookshelfId));
    };
  }));

// Get books on a specific shelf
router.get('/shelves/:id/books',
  asyncHandler(async (req, res) => {
    // console.log('req.params.id', req.params.id);
    const books = await Book.findAll({
      include: {
        model: Shelf,
        where: {
          id: req.params.id,
        },
      },
    });
    res.json({ books });
  }));


// delete book from a bookshelf
//should be /api-user/shelves/:bookshelfid/books/:bookid
router.delete("/shelves/:bookshelfid/books/:bookid",
  asyncHandler(async (req, res) => {
    const bookId = req.params.bookid;
    const bookshelfId = req.params.bookshelfid;

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
      include: {
        model: Shelf,
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


// routes for api-user/profile
router.get('/profile', asyncHandler(async (req, res) => {

  const genres = await Genre.findAll({
    //need req.user.id
    include: { model: User, where: { id: req.user.id } }
  });
  res.json({ genres });

}));

// Add genres to the user's favorites in the user-profile page
// route /api-user/profile/genres
router.post("/profile/genres",
  asyncHandler(async (req, res) => {
    try {
      const { genreArray } = req.body
      const user = await User.findByPk(req.user.id);

      genreArray.forEach(async genreName => {
        const genre = await Genre.findOne({
          where: {
            name: genreName
          }
        })
        console.log(genre)
        await user.addGenre(genre)
      });
      return res.json({ successMessage: 'Genre(s) added to profile' });
    } catch (e) {
      console.log(e)
    }

  }));



// disconnect a genre from the user profile
router.delete(
  "/profile/:genreid",
  asyncHandler(async (req, res) => {
    const genreId = req.params.genreid;
    const genreAndUserConnections = await User_Genre.findAll({
      where: {
        genre_id: genreId
      }
    });
    for (let connection of genreAndUserConnections) {
      await connection.destroy();
    };
    res.json({ message: `Disconnect genre with id of ${genreId} from the user.` });
    res.redirect('/');
  })
);



module.exports = router;
