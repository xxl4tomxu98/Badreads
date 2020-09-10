const express = require('express');
const moment = require('moment');

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

// let bookqueries = require('../api/book-queries.js');
let { Book } = require('../db/models')
// const { asyncHandler } = require('../utils.js');

router.get('/', async (req, res) => {
  const books = await Book.findAll({
    limit: 10,
    order: [['title', 'ASC']]
  });
  //res.json(books)
  res.render('books.pug', {
    books
  })
  //res.end();
});




//   const { title,
//     author,
//     description,
//     publicationYear} = req.body

//   const books = { title, author, description, publicationYear};
//   res.json({books})
// })

// router.get('/', asyncHandler(async (req, res) => {
//     const { title, author, description, publicationYear } = req.body;

//     res.render('books') {
//       title,
//       author,
//       publicationYear
//     }
//     }
//
// router.get('/', async (req, res) => {
//   const books = await req.query.navsearch
//   if (!books) {
//     console.log('Not found')
//   }

//   res.render('books', {
//     books
//   })

// }

// )

// async function findBooksByTerm(term) {
//   return await Book.findAll({
//     where: {
//       [Op.or]: [
//         { title: { [Op.ilike]: term }},
//         { author: { [Op.ilike]: term }}
//       ]
//     },
//     order: [['title', 'DESC']]
//   });
// }

//   const { title,
//     author,
//     description,
//     publicationYear} = req.body

//   const books = { title, author, description, publicationYear};
//   res.json({books})
// })

// router.get('/', asyncHandler(async (req, res) => {
//     const { title, author, description, publicationYear } = req.body;

//     res.render('books') {
//       title,
//       author,
//       publicationYear
//     }
//     }



// body
// main(role = 'main')
//   .jumbotron
//   .col - sm - 8.mx - auto
// h1 Stand In Text
// p
//   | This example is a quick exercise to illustrate how the navbar and its contents work.Some navbars extend the width of the viewport, others are confined within a
// code.container
//   | .For positioning of navbars, checkout the
// a(href = '../navbar-top/') top
//   | and
// a(href = '../navbar-top-fixed/') fixed top
//   | examples.
//     p
//   | At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.
//     p
// a.btn.btn - primary(href = '../../components/navbar/', role = 'button') View navbar docs »
//     .container
// header.header.clearfix
// nav
// ul.nav.nav - pills.float - right
// li.nav - item
// a.nav - link.active(href = '#')
//   | Home
// span.sr - only(current)
// li.nav - item
// a.nav - link(href = '#') About
// li.nav - item
// a.nav - link(href = '#') Contact
// h3.text - muted Project name

// main(role = 'main')
//   .jumbotron
// h1.display - 3 Jumbotron heading
// p.lead
//   | Cras justo odio, dapibus ac facilisis in, egestas eget quam.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
//     p
// a.btn.btn - lg.btn - success(href = '#', role = 'button') Sign up today
//   .row.marketing
//   .col - lg - 6
// h4 Subheading
// p
//   | Donec id elit non mi porta gravida at eget metus.Maecenas faucibus mollis interdum.
// h4 Subheading
// p
//   | Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum.
// h4 Subheading
// p Maecenas sed diam eget risus varius blandit sit amet non magna.
//           .col - lg - 6
// h4 Subheading
// p
//   | Donec id elit non mi porta gravida at eget metus.Maecenas faucibus mollis interdum.
// h4 Subheading
// p
//   | Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum.
// h4 Subheading
// p Maecenas sed diam eget risus varius blandit sit amet non magna.


//     .container
// h1 Bootstrap grid examples
// p.lead
//   | Basic grid layouts to get you familiar with building within the Bootstrap grid system.
// h3 Five grid tiers
// p
//   | There are five tiers to the Bootstrap grid system, one for each range of devices we support.Each tier starts at a minimum viewport size and automatically applies to the larger devices unless overridden.
//       .row
//     .col - 4.col - 4
//       .col - 4.col - 4
//       .col - 4.col - 4
//         .row
//       .col - sm - 4.col - sm - 4
//       .col - sm - 4.col - sm - 4
//       .col - sm - 4.col - sm - 4
//         .row
//       .col - md - 4.col - md - 4
//       .col - md - 4.col - md - 4
//       .col - md - 4.col - md - 4
//         .row
//       .col - lg - 4.col - lg - 4
//       .col - lg - 4.col - lg - 4
//       .col - lg - 4.col - lg - 4
//         .row
//       .col - xl - 4.col - xl - 4
//       .col - xl - 4.col - xl - 4
//       .col - xl - 4.col - xl - 4
// h3 Three equal columns
// p
//   | Get three equal - width columns
// strong starting at desktops and scaling to large desktops
//   | .On mobile devices, tablets and below, the columns will automatically stack.
//       .row
//     .col - md - 4.col - md - 4
//       .col - md - 4.col - md - 4
//       .col - md - 4.col - md - 4
// h3 Three unequal columns
// p
//   | Get three columns
// strong starting at desktops and scaling to large desktops
//   | of various widths.Remember, grid columns should add up to twelve for a single horizontal block.More than that, and columns start stacking no matter the viewport.
//       .row
//     .col - md - 3.col - md - 3
//       .col - md - 6.col - md - 6
//       .col - md - 3.col - md - 3
// h3 Two columns
// p
//   | Get two columns
// strong starting at desktops and scaling to large desktops
//   | .
//       .row
//     .col - md - 8.col - md - 8
//     .col - md - 4.col - md - 4
// h3 Full width, single column
// p.text - warning No grid classes are necessary for full - width elements.
//   hr
//       h3 Two columns with two nested columns
// p
//   | Per the documentation, nesting is easy—just put a row of columns within an existing column.This gives you two columns
// strong starting at desktops and scaling to large desktops
//   | , with another two(equal widths) within the larger column.
//     p
//     | At mobile device sizes, tablets and down, these columns and their nested columns will stack.
//       .row
//       .col - md - 8
//       | .col - md - 8
//         .row
//         .col - md - 6.col - md - 6
//         .col - md - 6.col - md - 6
//         .col - md - 4.col - md - 4
// hr
// h3 Mixed: mobile and desktop
// p
//   | The Bootstrap v4 grid system has five tiers of classes: xs(extra small), sm(small), md(medium), lg(large), and xl(extra large).You can use nearly any combination of these classes to create more dynamic and flexible layouts.
//     p
//     | Each tier of classes scales up, meaning if you plan on setting the same widths for xs and sm, you only need to specify xs.
//       .row
//       .col - 12.col - md - 8.col - 12.col - md - 8
//         .col - 6.col - md - 4.col - 6.col - md - 4
//           .row
//           .col - 6.col - md - 4.col - 6.col - md - 4
//             .col - 6.col - md - 4.col - 6.col - md - 4
//               .col - 6.col - md - 4.col - 6.col - md - 4
//                 .row
//                 .col - 6.col - 6
//                   .col - 6.col - 6
// hr
// h3 Mixed: mobile, tablet, and desktop
// p
//   .row
//   .col - 12.col - sm - 6.col - lg - 8.col - 12.col - sm - 6.col - lg - 8
//     .col - 6.col - lg - 4.col - 6.col - lg - 4
//       .row
//       .col - 6.col - sm - 4.col - 6.col - sm - 4
//         .col - 6.col - sm - 4.col - 6.col - sm - 4
//           .col - 6.col - sm - 4.col - 6.col - sm - 4

// footer.footer

module.exports = router;
