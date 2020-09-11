const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { asyncHandler, handleValidationErrors } = require("../utils");

const router = express.Router()
const { User, Genre, User_Genre } = require('../db/models');


const userNotFoundError = (id) => {
  const err = Error("user not found");
  err.errors = [`User with the id of ${id} could not be found.`];
  err.title = "User not found.";
  err.status = 404;
  return err;
};



let userId = 2;


router.get('/', asyncHandler( async(req, res, next) => {
  //const userId = parseInt(req.params.id, 10);
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
router.post("/:genreid",
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



// delete a genre from the user profile
router.delete(
  "/:genreid",
  asyncHandler(async (req, res, next) => {
    const genreId = req.params.genreid;
    const user = await User.findByPk(userId);
    const genre = await Genre.findByPk(genreId, {
      include: {model : User, where: {id: userId}}
    });

    if (user) {
      const genreAndUserConnections = await User_Genre.findAll({
        where: {
          genre_id: genreId
        }
      });

      for (let connection of genreAndUserConnections) {
        await connection.destroy();
      };

      await genre.destroy();
      res.json({ message: `Deleted genre with id of ${genreId} from user profile.` });
      res.redirect('/');
    } else {
      next(bookshelfNotFoundError(userId));
    }
  })
);



module.exports = router;
