import {dropDownBookInfo} from './drop-down-book-info.js'

const getBookList = async(bookshelfId) => {
    //console.log('in getBookList')

    const res = await fetch(`/api-user/${bookshelfId}`, {
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
      

    const bookshelf = await res.json();
    //console.log('data', data)
    return bookshelf;
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
    bookCoverImg.className = 'book-on-shelf__book-cover';
    bookCoverImg.src = '../images/2.jpg'
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
    const bookshelfBooks = document.querySelector('.book-list');
    const bookshelfTitle = document.querySelector('.bookshelf-title');
    const { bookshelf } = await getBookList(bookshelfId);
    bookshelfBooks.innerHTML = ''
    const books = bookshelf.Books
    //console.log('books', books)
    bookshelfTitle.innerHTML = bookshelf.name;
    console.log('bookshelf', bookshelf)
    console.log('title = ', bookshelf.name)
    for (let book in books) {
        //console.log('in for loop, book =', books[book])
        const bookDiv = createBookDiv(books[book], bookshelfId);
        //console.log('bookDiv', bookDiv)
        bookshelfBooks.appendChild(bookDiv)
    };
};
