import {dropDownBookInfo} from './drop-down-book-info.js'
import { shelfDelete } from "./delete-shelf.js";

const getBookList = async(bookshelfId) => {

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
  
    return shelf;
};

const createBookDiv = (book, bookshelfId) => {

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
    bookshelfTitle.innerHTML = shelf.name;
    const deleteShelfButton = document.createElement("Button");
    deleteShelfButton.className = "delete-button";
    deleteShelfButton.innerHTML = 'x'
    bookshelfTitle.appendChild(deleteShelfButton);
    deleteShelfButton.addEventListener("click", shelfDelete(bookshelfId));

    for (let book in books) {
        const bookDiv = createBookDiv(books[book], bookshelfId);
        shelfBooks.appendChild(bookDiv)
    };
};
