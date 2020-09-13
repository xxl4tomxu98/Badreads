import {dropDownBookInfo} from './drop-down-book-info.js'
import { shelfDelete } from "./delete-shelf.js";

const getBookList = async(bookshelfId) => {
    //console.log('in getBookList')

    const res = await fetch(`http://localhost:8080/api-user/shelves/${bookshelfId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "BADREADS_ACCESS_TOKEN"
          )}`,
        },
      });

      //redirect user to login page if not logged in which is on the landing page path('/')
      if (res.status === 401) {
        window.location.href = "/";
        return;
      }


    const shelf = await res.json();
    //console.log('bookshelf =', bookshelf)
    //console.log('data', data)
    return shelf;
};

const createBookDiv = (book, bookshelfId) => {
    console.log('in createBookDiv book.title=', book.title)
    // const bookDiv =  `<div class='book-on-shelf'>
    //             <div class='book-on-shelf__book-cover'></div>
    //             <div class='book-on-shelf__book-title'>${book.title}</div>
    //         </div>`

    var bookDiv = document.createElement('div');
    bookDiv.className = 'book-on-shelf';

    var bookCoverImg = document.createElement('img');
    bookCoverImg.className = 'book-on-shelf__book-cover book-cover';
    bookCoverImg.src = `../images/${book.id}.jpg`
    var bookTitleH5 = document.createElement('h5');
    bookTitleH5.className = 'book-on-shelf__book-title';
    bookTitleH5.innerHTML = `${book.title}`;

    bookDiv.appendChild(bookCoverImg);
    bookDiv.appendChild(bookTitleH5);

    bookDiv.addEventListener('click', () => dropDownBookInfo(book, bookshelfId));
    return bookDiv;

};

export const populateBookshelfBookList = async (bookshelfId) => {
    document.querySelector('.welcome-header').innerHTML = '';
    const shelfBooks = document.querySelector('.book-list');
    const bookshelfTitle = document.querySelector('.bookshelf-title');

    const { shelf } = await getBookList(bookshelfId);
    shelfBooks.innerHTML = ''
    const books = shelf.Books
    //console.log('books', books)
    bookshelfTitle.innerHTML = shelf.name;
    const deleteShelfButton = document.createElement("Button");
    deleteShelfButton.className = "delete-button";
    bookshelfTitle.appendChild(deleteShelfButton);
    deleteShelfButton.addEventListener("click", shelfDelete(bookshelfId));

    console.log('bookshelf', shelf)
    console.log('title = ', shelf.name)

    for (let book in books) {
        //console.log('in for loop, book =', books[book])
        const bookDiv = createBookDiv(books[book], bookshelfId);
        //console.log('bookDiv', bookDiv)
        shelfBooks.appendChild(bookDiv)
    };
};
