const express = require('express');

const router = express.Router()

//when user goes to /user/shelves
router.get('/shelves', async(req, res) => {
    //can pull out user from db using the req because the side effect of requireAuth,
    //besides checking user is loggeg in, it sets the req.user to the queried user from db
    const { user } = req
    console.log('coming from /user/shelves', req)
    res.render('my-books', {
        user
    }, 
    )
});

module.exports = router;
