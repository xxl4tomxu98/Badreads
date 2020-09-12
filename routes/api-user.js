const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { asyncHandler, handleValidationErrors } = require("../utils");

const { getUserToken, requireAuth } = require("../auth");
const router = express.Router()
const { User, Shelf, Book, Genre, Books_Shelf, User_Genre } = require('../db/models');
const bcrypt = require('bcryptjs')



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

const userNotFoundError = (id) => {
  const err = Error("user not found");
  err.errors = [`User with the id of ${id} could not be found.`];
  err.title = "User not found.";
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
    try{
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

    }catch(err){
      console.log(err)
    }
  })
);






const validatebookShelf = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Bookshelf can't be empty."),
  //  bookshelf name cannot be longer than 80 characters:
  check("name")
    .isLength({ max: 80 })
    .withMessage("Bookshelf name can't be longer than 80 characters."),
  handleValidationErrors,
];

// create the bookshelves list
router.get("/", requireAuth,
  asyncHandler(async (req, res) => {
    try{

    const shelves = await Shelf.findAll({
      where: {
        user_id : req.user.id
      },
      order: [["createdAt", "DESC"]],
    });
    res.json({ shelves });
  }catch(e){
    console.log(e)
  }
}));

// add the bookshelf to database
router.post("/",
  validatebookShelf,
  asyncHandler(async (req, res) => {
    console.log('in post request')
    const { name } = req.body;
    const bookshelf = await Shelf.create({ name, user_id: userId});
    // const bookshelf = await bookShelf.create({ name, user_id: req.user.id });
    res.json({ bookshelf });
  })
);


// get specific bookshelf books --user id

router.get("/shelves/:bookshelfid",
  asyncHandler(async (req, res, next) => {
    const bookshelf = await Shelf.findOne({
      where: {
        id: req.params.bookshelfid,
      },
      include: Book
    });
    if (bookshelf) {
      res.json({ bookshelf });
    } else {
      next(bookshelfNotFoundError(req.params.bookshelfid));
    }
  })
);

// delete bookshelf
router.delete(
  "/shelves/:bookshelfid",
  asyncHandler(async (req, res, next) => {
    const bookshelf = await Shelf.findOne({
      where: {
        id: req.params.bookshelfid,
      },
    });
    if (userId !== bookshelf.user_id) {
    // if (req.user.id !== bookshelf.user_id) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this tweet.";
      err.title = "Unauthorized";
      throw err;
    }
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
router.get("/:bookshelfid/:bookid",
  asyncHandler(async (req, res) => {

    const bookId = req.params.bookid;
    const shelves = await Shelf.findAll({
      where: {
        user_id : userId,
      },
      include: {
        model: Book, where: {id: bookId}
      }
    });
    const allShelves = await Shelf.findAll();
    let includedShelf = [];
    for (let shelf of shelves) {
      includedShelf.push(shelf.id);
    };

    let allShelvesArray = [];
    for (let shelf of allShelves) {
      allShelvesArray.push(shelf);
    };

    const allShelvesWithoutBook = allShelvesArray.filter(function(shelf) {
      if (!includedShelf.includes(shelf.id)) {
        return shelf;
      }
    });

    res.json({ allShelvesWithoutBook });
}));


// Add the book to selected shelf in the database

router.post("/shelves/:shelfid/books/:bookid",
  asyncHandler(async (req, res, next) => {
  const bookId = req.params.bookid;
  const bookshelfId = req.params.bookshelfid;
  const bookshelf = await Shelf.findByPk(bookshelfId);
  const book = await Book.findByPk(bookId)
  if (bookshelf) {
    await bookshelf.addBook(book);
    res.json(bookshelf);
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

// delete book from a bookshelf
router.delete("/shelves/:bookshelfid/books/:bookid",
  asyncHandler(async(req, res) => {
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


// routes for api-user/profile
let userId = 2;
router.get('/profile', asyncHandler( async(req, res, next) => {

    const user = await User.findByPk(userId);
    if(user){
      const genres = await Genre.findAll( {
        include: {model: User, where: {id: userId}}
      });
      res.json({ genres });
    } else {
      next( userNotFoundError(userId) );
    }
}));

// Add a genre to the user's favorites in the user-profile page
router.post("/profile/:genreid",
  asyncHandler(async (req, res, next) => {
    const genreId = req.params.genreid;
    const user = await User.findByPk(userId);
    const genre = await Genre.findByPk(genreId);
    if (user) {
      await user.addGenre(genre);
      res.json(user);
    } else {
      next(userNotFoundError(userId));
    };
}));



// disconnect a genre from the user profile
router.delete(
  "/profile/:genreid",
  asyncHandler(async (req, res, next) => {
    const genreId = req.params.genreid;
    const user = await User.findByPk(userId);
    if (user) {
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
    } else {
      next(userNotFoundError(userId));
    }
  })
);



router.use(requireAuth)


module.exports = router;
