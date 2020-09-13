const express = require('express');

const router = express.Router()

//when user goes to /user/shelves
router.get('/shelves', async(req, res) => {
    // const { user } = req
    // console.log('user----', user)
    // console.log('coming from /user/shelves', req)
    res.render('my-books')
});

module.exports = router;
