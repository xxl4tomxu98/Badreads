const express = require('express');
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken } = require("../auth");
const { User } = require('../db/models');
const bcrypt = require('bcryptjs')

const router = express.Router()

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

//sign up
//create a user in database after logging in (post req from form) and returns a user and their token 

//auth-user/
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

//auth-user/token
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


module.exports = router