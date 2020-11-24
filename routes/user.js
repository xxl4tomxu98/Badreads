const express = require('express');

const router = express.Router()

//when user goes to /user/shelves
router.get('/shelves', async(req, res) => {
    //can pull out user from db using the req because the side effect of requireAuth,
    //besides checking user is loggeg in, it sets the req.user to the queried user from db
    const { user } = req
    res.render('my-books', {
        user
    },
    )
});

router.get('/', async(req, res) => {
    res.render('profile');
});


module.exports = router;
